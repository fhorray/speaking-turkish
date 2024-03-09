"use client";

import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechComp = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true, language: "pt-BR" });
    } else {
      SpeechRecognition.stopListening();
    }

    return () => {
      SpeechRecognition.abortListening();
    };
  }, [isListening]);

  return (
    <div>
      <p>Transcrição: {transcript}</p>

      <button onClick={() => setIsListening(true)}>
        Iniciar Reconhecimento
      </button>

      <button onClick={() => setIsListening(false)}>
        Parar Reconhecimento
      </button>

      <button onClick={resetTranscript}>Limpar</button>
    </div>
  );
};

export default SpeechComp;
