"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
const NavBar = () => {
  // thsi function is a method for getting the current route of the selected user
  const pathName = usePathname();

  // approach no.1 is make the first letter capital or  make new object that has two properties which for label and the links
  const NavLinks = [
    {
      label: "Dashboard",
      link: "/",
    },
    {
      label: "Issues",
      link: "/issues/list",
    },
  ];
  //   remove this we can use usePathName which are built in for nextjs tracking which path is the current user
  //   const [active, setActive] = useState("");
  return (
    <nav className="h-14 w-full flex items-center  gap-10 pl-5 border-b border-slate-200 mb-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex  gap-5">
        {NavLinks.map((nav, index) => (
          <li key={index}>
            <Link
              // no need for this as usePathName already do the job of getting the route path
              //   onClick={() => setActive(nav.label)}
              //   className={` hover:text-zinc-800 transition-colors ${
              //     pathName === nav.link
              //       ? "text-zinc-800 font-bold"
              //       : "text-zinc-500"
              //   }`}
              //   this npm packages helps us to create cleaner code when there are a lot of conditionals classes to render
              className={classNames({
                "hover:text-zinc-800 transition-colors": true,
                "text-zinc-500": nav.link !== pathName,
                "text-shadow-zinc-800": nav.link === pathName,
              })}
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
