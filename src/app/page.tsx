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
        <div className="flex items-start w-full gap-4 mt-4 h-[calc(100vh-120px)]">
          <KinematicCanvas />
          <KinematicControl />
        </div>
      </div>
    </div>
  );
}
