import React from "react";
import ScoreFlame from "./ScoreFlame";
import { useScore } from "@/contexts/ScoreContext";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-screen flex gap-5 py-5 px-14 border-b-stone-200 border justify-between items-center">
      {/* <ScoreFlame /> */}
      <h1 className="text-xl font-normal">
        Turkish<span className="text-red-600 font-black">HUB</span>
      </h1>

      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default Header;
