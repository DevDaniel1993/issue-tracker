"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import Skeleton from "@/app/components/Sketeton";

interface Link {
  label: string;
  href: string;
}

const NavBar = () => {
  return (
    <nav className="border-b px-5 mb-5 items-center py-3">
      <Container>
        <Flex justify="space-between">
          <NavLinks />
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links: Link[] = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <Flex align="center" gap="3">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-8">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "!text-zinc-900": currentPath === link.href,
                "nav-link": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Flex>
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Log In
      </Link>
    );

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user?.image!}
              size="3"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <Text size="2">
              <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Log Out</Link>
              </DropdownMenu.Item>
            </Text>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
