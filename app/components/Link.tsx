import React from "react";
import NextLink from "next/link";
import { Link } from "@radix-ui/themes";

interface Props {
  href: string;
  label: string;
}

const RadixLink = ({ href, label }: Props) => {
  return (
    <Link asChild>
      <NextLink href={href} passHref>
        {label}
      </NextLink>
    </Link>
  );
};

export default RadixLink;
