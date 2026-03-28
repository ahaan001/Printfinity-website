import { NextRequest, NextResponse } from "next/server";
import { insertOrder, getAllOrders } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, city, print_type } = body;

    if (!full_name?.trim() || !email?.trim() || !phone?.trim() || !city?.trim() || !print_type?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const orderId = insertOrder({
      full_name: full_name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      print_type: print_type.trim(),
      selected_model: body.selected_model || null,
      uploaded_file_name: body.uploaded_file_name || null,
      custom_description: body.custom_description || null,
      material: body.material || "PLA",
      selected_product: body.selected_product || null,
      quantity: Number(body.quantity) || 1,
      color_preference: body.color_preference || null,
      desired_size: body.desired_size || null,
      additional_notes: body.additional_notes || null,
    });

    return NextResponse.json({ success: true, orderId }, { status: 201 });
  } catch (err) {
    console.error("Order submission error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = getAllOrders();
    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Get orders error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
