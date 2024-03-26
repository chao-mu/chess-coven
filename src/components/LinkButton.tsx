"use client";

// NextJS
import Link from "next/link";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
};

export const LinkButton = ({ children, href }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className="rounded-full bg-gray-800/50 px-4 py-2 text-center  text-white hover:bg-amber-800/100"
    >
      {children}
    </Link>
  );
};
