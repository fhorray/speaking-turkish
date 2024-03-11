'use client';

import { createContext, useContext, ReactNode } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

interface GeminiContextType {
  generateContent: (prompt: Array<{ text: string }>) => Promise<string>;
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
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API; // Replace with your API key
  const MODEL_NAME = 'gemini-1.0-pro';

  const genAI = new GoogleGenerativeAI(API_KEY!);

  const generateContent = async (
    prompt: Array<{ text: string }>,
  ): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: prompt }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    return response.text();
  };

  const value: GeminiContextType = {
    generateContent,
  };

  return (
    <GeminiContext.Provider value={value}>{children}</GeminiContext.Provider>
  );
}
