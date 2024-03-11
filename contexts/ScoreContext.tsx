'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

interface ScoreContextType {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
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
  const [score, setScoreState] = useState<number>(0);

  useEffect(() => {
    const storedScore = localStorage.getItem('score');
    if (storedScore) {
      setScoreState(parseInt(storedScore, 10));
    }
  }, []);

  const setScore: ScoreContextType['setScore'] = (newScore) => {
    setScoreState(newScore);
    localStorage.setItem('score', newScore.toString());
  };

  const value: ScoreContextType = {
    score,
    setScore,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

export { useScore, ScoreProvider };
