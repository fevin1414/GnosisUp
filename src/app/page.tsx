import FontDemo from "@/UI/FontDemo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 font-sans">Welcome to GnosisUp</h1>

      <div className="space-y-6">
        <FontDemo />
      </div>
    </div>
  );
}
