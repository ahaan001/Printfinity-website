import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-bold text-[#3B82F6]/20 font-[Outfit] mb-4">404</div>
      <h1 className="text-3xl font-bold text-white font-[Outfit] mb-3">Page Not Found</h1>
      <p className="text-[#C0C8D8] mb-8 max-w-sm">
        The page you're looking for doesn't exist. It may have been moved or deleted.
      </p>
      <Link href="/">
        <Button variant="primary" size="md">Back to Home</Button>
      </Link>
    </div>
  );
}
