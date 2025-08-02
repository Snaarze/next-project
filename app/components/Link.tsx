import React from "react";
import NextLink from "next/link";
import { Link } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
}

const RadixLink = ({ href, children }: Props) => {
  return (
    <Link asChild>
      <NextLink href={href} passHref>
        {children}
      </NextLink>
    </Link>
  );
};

export default RadixLink;
