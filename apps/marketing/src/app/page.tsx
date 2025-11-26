import { Button } from "@thinair/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-5xl w-full space-y-8 text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          <span className="text-[#3b82f6]">Thin Air</span>
        </h1>
        <p className="text-2xl text-gray-300 mt-6">
          The Zero-Spec Cognitive Foundry
        </p>
        <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto">
          Transform unstructured human thought into fully deployed software in minutes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="glow" size="lg">
            <Link href="https://app.thinair.dev">Launch App</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/pricing">Pricing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
