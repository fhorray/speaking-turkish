'use client';

import { useGemini } from '@/contexts/GeminiContext';
import React, { useEffect, useState } from 'react';

// IMPORTS HOVER CARD
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';

// INTERFACES
interface IRandomPhrases {
  phrase: string;
  translations: string[];
}

const proficiency = 'C1';
const prompt = [
  {
    text: 'phrase create a list of JSON turkish phrases with all possibles translations into portuguese',
  },
  {
    text: 'translation [\n{\n  "phrase": "Kitabın kapağı çok güzel.",\n  "translations": [\n    "A capa do livro é muito bonita.",\n    "A capa do livro é muito atraente.",\n    "A capa do livro é muito ilustrativa.",\n    "A capa do livro é muito bem elaborada."\n    ]\n},\n{\n "phrase": "Bu konuyu daha önce hiç konuşmadık.",\n "translations": [\n   "Nós nunca conversamos sobre esse assunto antes.",\n   "Nós nunca discutimos esse tópico antes.",\n   "Nós nunca abordamos esse tema antes.",\n   "Nós nunca tocamos nesse assunto antes."\n   ]\n},\n{\n "phrase": "Geçenlerde çok ilginç bir kitap okudum.",\n "translations": [\n   "Eu li um livro muito interessante recentemente.",\n   "Eu terminei a leitura de um livro muito interessante recentemente.",\n   "Eu me dediquei à leitura de um livro muito interessante recentemente",\n   "Eu mergulhei na leitura de um livro muito interessante recentemente."\n   ]\n},\n{\n "phrase": "Bu filmi daha önce hiç izlememiştim.",\n "translations": [\n   "Eu nunca tinha assistido a esse filme antes.",\n   "Eu não tinha assistido a esse filme até então.",\n   "Eu não tinha conhecimento desse filme até então",\n   "Eu não estava familiarizado com esse filme até então."\n   ]\n},\n{\n "phrase": "Bu konuda uzman değilim.",\n "translations": [\n   "Eu não sou especialista nesse assunto.",\n   "Eu não tenho domínio nesse tema.",\n   "Eu não possuo conhecimento aprofundado sobre esse tema.",\n   "Eu não sou detentor de expertise nesse campo."\n   ]\n},\n{\n "phrase": "Bu konuyu daha sonra konuşalım.",\n "translations": [\n   "Vamos discutir esse assunto mais tarde.",\n   "Nós podemos abordar esse tema em outro momento.",\n   "Nós podemos retomar essa conversa futuramente.",\n   "Nós podemos nos debruçar sobre esse tópico posteriormente."\n   ]\n},\n{\n "phrase": "Bu konuda sana katılmıyorum.",\n "translations": [\n   "Eu discordo de você sobre esse assunto.",\n   "Eu não concordo com sua opinião sobre esse tema.",\n   "Eu tenho uma visão diferente sobre esse tópico.",\n   "Eu apresento uma perspectiva alternativa sobre essa questão."\n   ]\n},\n{\n "phrase": "Bu konuyla ilgili daha fazla bilgi edinmek istiyorum.",\n "translations": [\n   "Eu gostaria de saber mais sobre esse assunto.",\n   "Eu desejo adquirir mais conhecimento sobre esse tema.",\n   "Eu pretendo aprofundar meus conhecimentos sobre esse tópico.",\n   "Eu almejo ampliar minha compreensão sobre essa questão."\n   ]\n}\n]',
  },
  {
    text: 'phrase create a list of JSON turkish phrase with all possibles translations into portuguese with the verb "öğrenmek"',
  },
  {
    text: 'translation [\n  {\n    "phrase": "Türkçe öğrenmek istiyorum.",\n    "translations": [\n      "Eu quero aprender turco.",\n      "Eu desejo aprender turco.",\n      "Eu tenho o anseio de aprender turco.",\n      "Eu possuo a vontade de aprender turco."\n    ]\n  },\n  {\n    "phrase": "Türkçe öğrenmeye karar verdim.",\n    "translations": [\n      "Eu decidi aprender turco.",\n      "Eu tomei a decisão de aprender turco.",\n      "Eu formei a resolução de aprender turco.",\n      "Eu estabeleci o propósito de aprender turco."\n    ]\n  },\n  {\n    "phrase": "Türkçe öğrenmeye başladım.",\n    "translations": [\n      "Eu comecei a aprender turco.",\n      "Eu iniciei o meu aprendizado de turco.",\n      "Eu dei início ao meu estudo de turco.",\n      "Eu entrei no processo de aprendizado de turco."\n    ]\n  },\n  {\n    "phrase": "Türkçe öğrenmekteyim.",\n    "translations": [\n      "Eu estou aprendendo turco.",\n      "Eu encontro-me no processo de aprendizado de turco.",\n      "Eu dedico-me ao estudo de turco.",\n      "Eu esforço-me para adquirir conhecimento da língua turca."\n    ]\n  },\n  {\n    "phrase": "Türkçe öğrenmek için kursa gidiyorum.",\n    "translations": [\n      "Eu frequento um curso para aprender turco.",\n      "Eu participo de aulas para aprender turco.",\n      "Eu matriculei-me num curso para aprender turco.",\n      "Eu inscrevi-me num curso para aprender turco."\n    ]\n  },\n  {\n    "phrase": "Türkçe öğrenmek için özel ders alıyorum.",\n    "translations": [\n      "Eu tenho aulas particulares para aprender turco.",\n      "Eu recebo aulas individuais para aprender turco.",\n      "Eu conto com a orientação de um professor particular para aprender turco.",\n      "Eu disponho de um tutor para me auxiliar no aprendizado de turco."\n    ]\n  }\n]',
  },
  {
    text: 'phrase create a JSON list turkish phrase with 10 phrases and all possibles translations into portuguese with the verb "öğrenmek"',
  },
  {
    text: 'translation [\n{\n  "phrase": "Türkçe öğreniyorum.",\n  "translations": [\n    "Estou aprendendo turco.",\n    "Eu estou estudando turco.",\n    "Estou aprendendo a língua turca.",\n    "Estou me dedicando ao estudo do turco."\n  ]\n},\n\n{\n  "phrase": "Kitabı okuduğumu biliyordu.",\n  "translations": [\n    "Ele sabia que eu tinha lido o livro.",\n    "Ele estava ciente de que eu tinha lido o livro.",\n    "Ele tinha conhecimento de que eu tinha lido o livro.",\n    "Ele estava consciente de que eu tinha lido o livro.",\n    "Ele tinha conhecimento de que eu havia lido o livro"\n  ]\n}\n]\n]',
  },
  {
    text: `phrase Create a JSON list with 10 phrases in Turkish at ${proficiency} proficiency level, along with all possible translations into Portuguese (pt-BR).`,
  },
  { text: 'translation ' },
];

const PracticeTranslatePage = () => {
  const [randomPhrases, setRandomPhrases] = useState<IRandomPhrases[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [currentIndex, setCurretIndex] = useState(0);
  const [translationCard, setTranslationCard] = useState<boolean>(false);
  const [translate, setTranslate] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');

  // useEffect to create a random array of phrases with Gemini
  const { generateContent } = useGemini();
  useEffect(() => {
    generateContent(prompt).then((phrases) => {
      try {
        const cleanedJson = JSON.parse(
          phrases
            .replace('```json', '')
            .replace('```JSON', '')
            .replace('```', ''),
        );
        setRandomPhrases(cleanedJson);
      } catch (error) {
        console.log('Erro: ', error);
      }
    });
  }, [generateContent]);

  const promptTranslate = [
    { text: 'word: Translate the Turkish word to PT-BR: Araba to PT-BR' },
    { text: 'translation: Carro' },
    { text: 'word: Translate the Turkish word to PT-BR:\n Ev' },
    { text: 'translation: Casa' },
    { text: 'word: Translate the Turkish word to PT-BR: Çocuk' },
    { text: 'translation: Criança' },
    { text: `word: Translate the Turkish word to PT-BR: ${translate}` },
    { text: 'translation: ' },
  ];

  // Translate
  useEffect(() => {
    generateContent(promptTranslate).then((translation) => {
      try {
        setTranslation(translation);
        console.log('translate ', translation);
      } catch (error) {
        console.log('Erro: ', error);
      }
    });
  }, [translate]);

  const splitWords = (phrase: string) => {
    const words = phrase?.split(' ');

    return words;
  };

  const handleHoverWord = (word: string) => {
    // console.log(word);
    setTranslationCard(!translationCard);
    setTranslate(word);
  };

  return (
    <>
      {randomPhrases.length > 0 ? (
        <div>
          {splitWords(randomPhrases[currentIndex].phrase).map((word, i) => (
            <HoverCard key={i}>
              <HoverCardTrigger
                onMouseOut={() => {
                  setTranslationCard(false);
                  setTranslation('');
                }}
                onMouseOver={() => handleHoverWord(word)}
                className="cursor-pointer px-1"
              >
                {word}
              </HoverCardTrigger>
              <HoverCardContent>{translation}</HoverCardContent>
            </HoverCard>
          ))}
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}
    </>
  );
};

export default PracticeTranslatePage;
