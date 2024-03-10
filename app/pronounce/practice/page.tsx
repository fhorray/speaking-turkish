"use client";

// IMPORTS
import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// ICONS
import {
  ArrowPathIcon,
  PlayIcon,
  StopIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

import { useGemini } from "@/contexts/GeminiContext";
import { Button } from "@/components/ui/button";

const PronouncePracticePage = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [transcription, setTranscription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [phrase, setPhrase] = useState("");
  const { generateContent } = useGemini();

  const generatePhrase = async () => {
    const prompt = generateContent(
      "Escreva uma frase em turco contendo a regra gramatical: -dığı, sem mmostrar a tradução"
    ).then((content) => {
      setPhrase(content);
    });
  };

  const correctPhrase = async () => {
    const prompt = generateContent(
      `Verifique se a frase: ${transcript} se parece com: ${phrase}, se sim escreva a frase: ${transcript}, não precisa ser igual, se as frases coincidirem apenas um pouco. Talvez o usuario fale as vezes uma palavra ou outra que não era pra ser gravada, releve essas palavras na hora de fazer a verificação.. Se a frase se assemelhar retorne apenas a frase: CERTO: ${phrase}, se não se assemelhrem retorne apenas: Tente novamente!`
    ).then((content) => {
      setTranscription(content);
    });
  };

  useEffect(() => {
    setTranscription("");
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true, language: "tr-TR" });
    } else {
      SpeechRecognition.stopListening();
    }

    return () => {
      SpeechRecognition.abortListening();
    };
  }, [isListening]);

  return (
    <section className="flex flex-col gap-14 items-center justify-center h-screen w-full">
      <div className="flex flex-col gap-5 items-center text-md font-nomral">
        <p>{phrase}</p>
        <Button
          className="text-white flex gap-2"
          onClick={() => generatePhrase()}
        >
          <ArrowPathIcon className="h-4 w-4" />
          Nova Frase
        </Button>
      </div>

      <div className="flex flex-col gap-7 w-[590px] items-center">
        <div className="flex flex-col gap-5">
          {transcription ? (
            <p className="text-xl font-medium">{transcription}</p>
          ) : (
            <p className="text-xl font-medium">{transcript}</p>
          )}
        </div>

        <div className="flex gap-2">
          {!isListening ? (
            <Button
              className="text-white flex gap-2"
              onClick={() => {
                setIsListening(true);
                resetTranscript();
                setTranscription("");
              }}
            >
              <PlayIcon className="h-4 w-4" /> Record
            </Button>
          ) : (
            <Button
              className="text-white flex gap-2"
              onClick={() => {
                setIsListening(false);
                correctPhrase();
              }}
            >
              <StopIcon className="h-4 w-4" /> Stop
            </Button>
          )}

          <Button
            className="text-white flex gap-2"
            onClick={() => {
              resetTranscript();
              setTranscription("");
            }}
          >
            <XMarkIcon className="h-4 w-4 font-black" /> Clear
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PronouncePracticePage;
