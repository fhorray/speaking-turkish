'use client';

import React from 'react';

interface ParamsInterface {
  params: {
    lesson: string[];
  };
}

const LessonFinishedPage = ({ params }: ParamsInterface) => {
  console.log(params);
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-slate-900 text-lg font-bold">Lesson Finished!</h1>

      <div>
        <p>You earned: {params.lesson[0]} points!</p>
      </div>
    </div>
  );
};

export default LessonFinishedPage;
