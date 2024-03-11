import { useScore } from "@/contexts/ScoreContext";
import { FireIcon } from "@heroicons/react/16/solid";
import React from "react";

const ScoreFlame = () => {
  const { score, setScore } = useScore();
  return (
    <>
      {/* SCORE */}
      <div className="relative flex flex-col items-center">
        <FireIcon className="text-amber-600 flex gap-2 w-10 h-10" />
        <span>{score}</span>
      </div>
    </>
  );
};

export default ScoreFlame;
