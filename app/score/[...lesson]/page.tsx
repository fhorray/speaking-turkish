'use client';

import React from 'react';

interface ParamsInterface {
  params: {
    lesson: string[];
  };
}
const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

const LessonFinishedPage = ({ params }: ParamsInterface) => {
  console.log(params);

  // Add

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-slate-900 text-lg font-bold">Lesson Finished!</h1>

      <div>
        <p>You earned: {params.lesson[0]} points!</p>
        <span>Time:</span>
        <h2>{formatTime(Number(params.lesson[1]))}</h2>
      </div>
    </div>
  );
};

export default LessonFinishedPage;
