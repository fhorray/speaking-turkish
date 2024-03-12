"use client";

import React from "react";

import Link from "next/link";
import ScoreFlame from "./ScoreFlame";

const Header = () => {
  return (
    <div className="w-screen flex gap-5 py-5 px-14 border-b-stone-200 border justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-normal">
          Turkish<span className="text-red-600 font-black">HUB</span>
        </h1>
      </Link>

      <div className="flex gap-14 items-center">
        <Menu />
        <ScoreFlame />
      </div>
    </div>
  );
};

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// MENU
const Menu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/numbers/practice" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Numbers
            </NavigationMenuLink>
          </Link>
          <Link href="/pronounce/practice" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pronounciation
            </NavigationMenuLink>
          </Link>
          <Link href="/translate/practice" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Translate
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
