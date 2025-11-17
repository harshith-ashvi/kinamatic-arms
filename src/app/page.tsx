import Link from "next/link";

import Navbar from "@/components/navbar";
import KinematicCanvas from "@/components/kinamatic-canvas";
import KinematicControl from "@/components/kinamatic-control";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        "h-screen",
        "bg-[radial-gradient(var(--color-neutral-500)_1px,transparent_1px)] bg-size-[20px_20px]",
        "dark:bg-[radial-gradient(var(--color-neutral-600)_1px,transparent_1px)]"
      )}
    >
      <div className="max-w-7xl w-full mx-auto z-10 p-4">
        <Navbar />
        <div className="flex items-start w-full gap-4 mt-4 h-[calc(100vh-130px)]">
          <KinematicCanvas />
          <KinematicControl />
        </div>
        <p className="font-bold text-md text-neutral-800 dark:text-neutral-300 text-center mt-2">
          Built by{" "}
          <Link
            href="https://x.com/HarshithAshvi"
            target="_blank"
            className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-violet-500 to-blue-500"
          >
            Harshith
          </Link>
        </p>
      </div>
    </div>
  );
}
