import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "orders.db");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initSchema(db);
  }
  return db;
}

function initSchema(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      city TEXT NOT NULL,
      print_type TEXT NOT NULL,
      selected_model TEXT,
      uploaded_file_name TEXT,
      custom_description TEXT,
      material TEXT,
      selected_product TEXT,
      quantity INTEGER DEFAULT 1,
      color_preference TEXT,
      desired_size TEXT,
      additional_notes TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migrate existing DBs
  try { database.exec("ALTER TABLE orders ADD COLUMN selected_product TEXT"); } catch { /* column already exists */ }
  try { database.exec("ALTER TABLE orders DROP COLUMN quality"); } catch { /* column may not exist */ }
  try { database.exec("ALTER TABLE orders DROP COLUMN pricing_tier"); } catch { /* column may not exist */ }
}

export interface Order {
  id?: number;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  print_type: string;
  selected_model?: string;
  uploaded_file_name?: string;
  custom_description?: string;
  material?: string;
  selected_product?: string;
  quantity?: number;
  color_preference?: string;
  desired_size?: string;
  additional_notes?: string;
  status?: string;
  created_at?: string;
}

export function insertOrder(data: Omit<Order, "id" | "created_at" | "status">): number {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO orders (
      full_name, email, phone, city, print_type,
      selected_model, uploaded_file_name, custom_description,
      material, selected_product, quantity, color_preference,
      desired_size, additional_notes
    ) VALUES (
      @full_name, @email, @phone, @city, @print_type,
      @selected_model, @uploaded_file_name, @custom_description,
      @material, @selected_product, @quantity, @color_preference,
      @desired_size, @additional_notes
    )
  `);
  const result = stmt.run(data);
  return result.lastInsertRowid as number;
}

export function getAllOrders(): Order[] {
  const database = getDb();
  return database.prepare("SELECT * FROM orders ORDER BY created_at DESC").all() as Order[];
}

export function getOrderById(id: number): Order | undefined {
  const database = getDb();
  return database.prepare("SELECT * FROM orders WHERE id = ?").get(id) as Order | undefined;
}

export function updateOrderStatus(id: number, status: string): void {
  const database = getDb();
  database.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
}
