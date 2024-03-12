"use client";

import { useGemini } from "@/contexts/GeminiContext";
import React, { useEffect, useState } from "react";

const prompt = [
  { text: "input: create a random JSON of turkish phrases with 8 phrases" },
  {
    text: 'output: [\n    {\n        "turkish": "Bugün hava çok güzel olduğu için dışarıda pikniğe gitmeyi düşünüyoruz.",\n         "translations": ["Hoje, como o tempo está muito bom, estamos pensando em ir para um piquenique ao ar livre."]\n    },\n    {\n         "turkish": "Geçen hafta sonu arkadaşlarımla şehir dışında kamp yapmaya gittim.",\n         "translations": ["No fim de semana passado, fui acampar fora da cidade com meus amigos."]\n    },\n    {\n          "turkish": "Yarın sabah erken kalkmalıyım çünkü önemli bir toplantım var.",\n        translations: ["Devo acordar cedo amanhã de manhã porque tenho uma reunião importante."]\n    },\n    {\n          "turkish": "Bu kitabı bitirdikten sonra, bir sonraki kitaba başlamayı planlıyorum.",\n         "translations": ["Depois de terminar este livro, estou planejando começar o próximo."]\n    },\n    {\n          "turkish": "Dün gece çok geç yattığım için bugün çok yorgunum.",\n         "translations": ["Estou muito cansado hoje porque fui dormir muito tarde ontem à noite."]\n    },\n    {\n          "turkish": "Kış mevsiminde kar yağışı bekliyoruz.",\n         "translations": ["No inverno, estamos esperando por neve.", "Esperamos neve durante o inverno."]\n    },\n    {\n          "turkish": "Yaz aylarında denize gitmek çok keyiflidir.",\n         "translations": ["Ir para o mar durante os meses de verão é muito agradável.", "É muito agradável ir à praia durante os meses de verão."]\n    },\n    {\n          "turkish": "Kahvaltıda peynir ve zeytin yemeyi severim.",\n        "translations": ["Gosto de comer queijo e azeitonas no café da manhã.", "No café da manhã, gosto de comer queijo e azeitonas."]\n    }\n]',
  },
  { text: "input: create a random JSON of turkish phrases with 10 phrases" },
  { text: "output: " },
];

const PracticeTranslatePage = () => {
  const [randomPhrases, setRandomPhrases] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");

  // useEffect to create a random array of phrase with Gemini
  const { generateContent } = useGemini();
  useEffect(() => {
    generateContent(prompt).then((numbers) => {
      console.log(numbers);
      try {
        const cleanedJson = JSON.parse(
          numbers
            .replace("```json", "")
            .replace("```JSON", "")
            .replace("```", "")
        );
        setRandomPhrases(cleanedJson);
        console.log(cleanedJson);
      } catch (error) {
        console.log("Erro: ", error);
      }
    });
  }, [generateContent]);

  return <div>PracticeTranslatePage</div>;
};

export default PracticeTranslatePage;
