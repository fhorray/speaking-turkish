'use client';
import 'regenerator-runtime/runtime';
import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const SpeechComp = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <p>
        O seu navegador não suporta reconhecimento de fala. Por favor, use um
        navegador compatível.
      </p>
    );
  }

  return (
    <section>
      <p>Transcrição: {transcript}</p>
      <br />
      <br />
      <br />
      <button onClick={SpeechRecognition.startListening}>
        Iniciar Reconhecimento
      </button>
      <br />
      <br />
      <button onClick={SpeechRecognition.stopListening}>
        Parar Reconhecimento
      </button>
      <br />
      <br />
      <button onClick={resetTranscript}>Limpar</button>
    </section>
  );
};

export default SpeechComp;
