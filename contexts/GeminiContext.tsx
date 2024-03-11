'use client';

import { createContext, useContext, ReactNode } from 'react';
import {
  GoogleGenerativeAI,
  GenerativeModel,
  GenerateContentResult,
} from '@google/generative-ai';

interface GeminiContextType {
  generateContent: (prompt: string) => Promise<string>; // Updated return type to Promise<string>
}

const GeminiContext = createContext<GeminiContextType | undefined>(undefined);

export function useGemini(): GeminiContextType {
  const context = useContext(GeminiContext);
  if (!context) {
    throw new Error('useGemini must be used within a GeminiProvider');
  }
  return context;
}

export function GeminiProvider({ children }: { children: ReactNode }) {
  if (!process.env.NEXT_PUBLIC_GEMINI_API) {
    throw new Error(
      'NEXT_PUBLIC_GEMINI_API environment variable is not defined',
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);

  const generateContent = async (prompt: string): Promise<string> => {
    const model: GenerativeModel = genAI.getGenerativeModel({
      model: 'gemini-1.0-pro-001',
    });
    const result: GenerateContentResult = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = await response.text();
    return generatedText; // Removed unnecessary .then() block
  };

  const value: GeminiContextType = {
    generateContent,
  };

  return (
    <GeminiContext.Provider value={value}>{children}</GeminiContext.Provider>
  );
}
