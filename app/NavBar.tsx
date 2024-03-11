import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

interface Link {
  label: string;
  href: string;
}

const NavBar = () => {
  const links: Link[] = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b px-5 mb-5 items-center h-14">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-8">
        {links.map((link) => (
          <Link
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
