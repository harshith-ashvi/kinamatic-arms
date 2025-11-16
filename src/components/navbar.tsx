import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-2 border-gray-200 border rounded-lg px-4 bg-white dark:bg-neutral-800 dark:border-neutral-600">
      <h1 className="font-bold text-2xl">KinaticArm</h1>
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
          className="dark:text-"
        />
      </Link>
    </div>
  );
};

export default Navbar;
