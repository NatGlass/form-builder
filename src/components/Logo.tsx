import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex gap-x-2">
      <Image
        src="/logo.svg"
        alt="logo"
        width={50}
        height={50}
        className="cursor-pointer"
        priority={true}
      />
      <span className="font-bold text-2xl bg-gradient-to-r from-teal-400 to-orange-400 dark:from-cyan-400 dark:to-orange-400 text-transparent bg-clip-text hover:cursor-pointer">
        FormBuilder.io
      </span>
    </Link>
  );
}

export default Logo;
