'use client';

import React from 'react';
import { useScore } from '../contexts/ScoreContext';
import { FireIcon } from '@heroicons/react/16/solid';

const ScoreFlame = () => {
  const { score, setScore } = useScore();
  return (
    <>
      {/* SCORE */}
      <div className="relative flex items-center justify-center">
        <span className="z-10 text-center top-[18px]">{score}</span>
        <FireIcon className="text-amber-600 flex gap-2 w-10 h-10" />
      </div>
    </>
  );
};

export default ScoreFlame;
