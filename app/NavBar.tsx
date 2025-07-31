import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
const NavBar = () => {
  // approach no.1 is make the first letter capital or  make new object that has two properties which for label and the links
  const NavLinks = [
    {
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      label: "Issues",
      link: "/issues",
    },
  ];
  return (
    <nav className="h-14 w-full bg-white text-black flex items-center  gap-20 px-10 border-b border-slate-200 mb-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex  gap-5">
        {NavLinks.map((nav, index) => (
          <li key={index}>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href={nav.link}
            >
              {nav.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
