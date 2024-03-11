import React from 'react';

import { Button } from './ui/button';
import Link from 'next/link';
import ScoreFlame from './ScoreFlame';

const Header = () => {
  return (
    <div className="w-screen flex gap-5 py-5 px-14 border-b-stone-200 border justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-normal">
          Next<span className="text-red-600 font-black">APP</span>
        </h1>
      </Link>

      <div>
        <ScoreFlame />
      </div>
    </div>
  );
};

export default Header;
