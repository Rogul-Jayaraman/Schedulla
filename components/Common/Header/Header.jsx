import Logo from "../../../assets/images/logo.png";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "../../ui/button";
import UserMenu from "./Layout/UserMenu";
import { PenBox } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

async function Header() {
  await checkUser();

  return (
    <nav className="mx-auto py-3 px-4 flex justify-between items-center shadow-md border-b-2">
      {/* Navbar left side - Logo*/}
      <Link href={"/"}>
        <Image src={Logo} alt="Logo" width={150} height={150} />
      </Link>

      {/* Navbar right side - Buttons {Login, Create_Event} */}
      <div className="flex gap-3 items-center">
        <Link href={"/events?create=true"}>
          <Button className="flex items-center gap-2" variant={"default_1"}>
            <PenBox size={10} />
            Create Event
          </Button>
        </Link>
        {/* Clerk component - render when user is logged out */}
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant={"outline"}>Login</Button>
          </SignInButton>
        </SignedOut>
        {/* Clerk component - render when user is logged in */}
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Header;
