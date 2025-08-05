"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Box,
  Container,
  Flex,
  DropdownMenu,
  Text,
  Avatar,
} from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";
const NavBar = () => {
  // thsi function is a method for getting the current route of the selected user

  // approach no.1 is make the first letter capital or  make new object that has two properties which for label and the links

  //   remove this we can use usePathName which are built in for nextjs tracking which path is the current user
  //   const [active, setActive] = useState("");
  return (
    <nav className=" w-full gap-10 pl-5 py-3 border-b border-slate-200 mb-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthSatatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const pathName = usePathname();
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
  return (
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
              "nav-link": true,
              "selected-path": nav.link === pathName,
            })}
            href={nav.link}
          >
            {nav.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthSatatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box ml="3">
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy=""
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2" color="gray">
                {session.user!.email!}
              </Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
