import Chatbot from "@/components/chatbot";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[#1E293B]">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-[#475569] mt-2">
          Your gateway to the best services and features.
        </p>
      </header>
      
      <div className="flex flex-col gap-4">
        <Link href="/sign-up">
          <Button className="bg-[#1E293B] text-white hover:bg-[#1E293B]/80">
            Register
          </Button>
        </Link>
        <Link href="/sign-in">
          <Button className="bg-[#1E293B] text-white hover:bg-[#1E293B]/80">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
