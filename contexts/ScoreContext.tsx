'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

interface ScoreContextType {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

function useScore(): ScoreContextType {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}

function ScoreProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const storedScore = localStorage.getItem('score');
      return storedScore ? parseInt(storedScore, 10) : 0;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('score', score.toString());
    }
  }, [score]);

  const value: ScoreContextType = {
    score,
    setScore,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

export { useScore, ScoreProvider };
