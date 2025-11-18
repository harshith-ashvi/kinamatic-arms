import Image from "next/image";
import Link from "next/link";
import ModeToggle from "./mode-toggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-2 border-gray-200 border rounded-lg px-4 bg-white dark:bg-neutral-800 dark:border-neutral-600 z-10">
      <h1 className="font-bold text-2xl">KinamaticArm</h1>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Link
          href="https://www.buymeacoffee.com/harshith_ashvi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            width={120}
            height={40}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
