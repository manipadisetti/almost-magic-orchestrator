import { Button } from "@thinair/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Create software out of <span className="text-[#3b82f6]">Thin Air</span>
        </h1>
        <p className="text-xl text-gray-300 mt-6">
          From napkin sketch to deployed application in minutes via a "Zero-Spec" pipeline.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="glow" size="lg">
            <Link href="/vapor">Start Creating</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/docs">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
