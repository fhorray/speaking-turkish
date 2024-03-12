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

// IMPORTS DIALOG
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowPathIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

// INTERFACES
interface IRandomPhrases {
  phrase: string;
  translations: string[];
  words: string[];
}

const proficiency = 'C1';
const prompt = [
  {
    text: 'phrase create a list of JSON turkish phrases with all possibles translations into portuguese',
  },
  {
    text: 'translation [\n  {\n    "phrase": "Kitabı okuduğumu biliyordu, ancak doğru değildi.",\n    "translations": [\n      "Ele sabia que eu tinha lido o livro, mas não estava correto.",\n      "Ele estava ciente de que eu tinha lido o livro, porém não estava certo.",\n      "Ele tinha conhecimento de que eu tinha lido o livro, no entanto não estava correto.",\n      "Ele estava consciente de que eu tinha lido o livro, contudo não estava certo."\n    ],\n    "words": [\n      { "Kitabı": "o livro" },\n      { "okuduğumu": "eu tinha lido" },\n      { "biliyordu": "ele sabia" },\n      { "ancak": "mas" },\n      { "doğru": "correto" },\n      { "değildi": "não era" }\n    ]\n  },\n  {\n    "phrase": "Benim için ödeme yapmazsan, sorun yaşayabiliriz.",\n    "translations": [\n      "Se você não me pagar, podemos ter problemas.",\n      "Caso você não faça o pagamento para mim, podemos enfrentar dificuldades.",\n      "Se você não realizar o pagamento em meu nome, podemos ter complicações."\n    ],\n    "words": [\n      { "Benim": "Para mim" },\n      { "için": "Por" },\n      { "ödeme": "Pagamento" },\n      { "yapmazsan": "Não fizer" },\n      { "sorun": "Problema" },\n      { "yaşayabiliriz": "Podemos ter" }\n    ]\n  }\n]',
  },
  {
    text: 'phrase create a list of JSON turkish phrase with all possibles translations into portuguese with the verb "öğrenmek"',
  },
  {
    text: 'translation [\n  {\n    "phrase": "Türkçe öğrenmek zor ama mümkün.",\n    "translations": [\n      "Aprender turco é difícil mas possível.",\n      "É difícil, mas possível, aprender turco.",\n      "Turco é difícil de aprender, mas possível."\n    ],\n    "words": [\n      { "Türkçe": "turco" },\n      { "öğrenmek": "aprender" },\n      { "zor": "difícil" },\n      { "ama": "mas" },\n      { "mümkün": "possível" }\n    ]\n  },\n  {\n    "phrase": "Yeni bir dil öğrenmek büyük bir başarıdır.",\n    "translations": [\n      "Aprender uma nova língua é uma grande conquista.",\n      "É um grande sucesso aprender uma nova língua.",\n      "Aprender uma nova língua é uma grande realização."\n    ],\n    "words": [\n      { "Yeni": "Nova" },\n      { "bir": "Uma" },\n      { "dil": "Língua" },\n      { "öğrenmek": "Aprender" },\n      { "büyük": "Grande" },\n      { "bir": "Um" },\n      { "başarıdır": "Conquista" }\n    ]\n  },\n  {\n    "phrase": "Yabancı bir dil öğrenmek, beyin için harika bir egzersizdir.",\n    "translations": [\n      "Aprender uma língua estrangeira é um excelente exercício para o cérebro.",\n      "Aprender um idioma estrangeiro é um ótimo treino para o cérebro.",\n      "Aprender uma língua estrangeira é um excelente exercício mental."\n    ],\n    "words": [\n      { "Yabancı": "estrangeira" },\n      { "bir": "um" },\n      { "dil": "idioma" },\n      { "öğrenmek": "aprender" },\n      { "beyin": "cérebro" },\n      { "için": "para" },\n      { "harika": "excelente" },\n      { "bir": "um" },\n      { "egzersizdir": "exercício" }\n    ]\n  },\n  {\n    "phrase": "Her yaşta yeni bir şeyler öğrenmek mümkündür.",\n    "translations": [\n      "É possível aprender coisas novas em qualquer idade.",\n      "Em qualquer idade, é possível aprender algo novo.",\n      "É possível aprender algo novo em todas as idades."\n    ],\n    "words": [\n      { "Her": "Todo" },\n      { "yaşta": "Idade" },\n      { "yeni": "Coisas novas" },\n      { "bir": "Algo" },\n      { "şeyler": "Aprender" },\n      { "öğrenmek": "aprender" },\n      { "mümkündür": "é possível" }\n    ]\n  }\n]',
  },
  {
    text: 'phrase create a JSON list turkish phrase with 10 phrases and all possibles translations into portuguese with the verb "öğrenmek"',
  },
  {
    text: 'translation [\n  {\n    "phrase": "Bu yıl çok fazla kitap okudum.",\n    "translations": [\n      "Li muitos livros este ano.",\n      "Este ano, li muitos livros.",\n      "Leio muitos livros este ano."\n    ],\n    "words": [\n      { "Bu": "este" },\n      { "yıl": "ano" },\n      { "çok": "muito" },\n      { "fazla": "muitos" },\n      { "kitap": "livros" },\n      { "okudum": "li" }\n    ]\n  },\n  {\n    "phrase": "Onu ne kadar süredir tanıyorsunuz?",\n    "translations": [\n      "Há quanto tempo você o conhece?",\n      "Há quanto tempo vocês se conhecem?",\n      "Há quanto tempo vocês o conhecem?"\n    ],\n    "words": [\n      { "Onu": "ele" },\n      { "ne": "quanto" },\n      { "kadar": "tempo" },\n      { "süredir": "há" }\n    ]\n  },\n  {\n    "phrase": "Yarın bu konuda daha fazla bilgi alacağım.",\n    "translations": [\n      "Amanhã, obterei mais informações sobre este assunto.",\n      "Vou conseguir mais informações sobre este assunto amanhã.",\n      "Vou receber mais informações sobre isso amanhã."\n    ],\n    "words": [\n      { "Yarın": "Amanhã" },\n      { "Bu": "Este" },\n      { "Konuda": "sobre isso" },\n      { "Daha": "mais" },\n      { "fazla": "Mais" },\n      { "bilgi": "Informações" },\n      { "alacağım": "Obterei" }\n    ]\n  }\n]',
  },
  {
    text: `phrase Create a JSON list with 10 phrases in ${proficiency} level turkish and all the possibilities of translations into Portuguese (pt-Br).`,
  },
  { text: 'translation ' },
];

const PracticeTranslatePage = () => {
  const router = useRouter();
  const { generateContent } = useGemini();
  const [randomPhrases, setRandomPhrases] = useState<IRandomPhrases[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [currentIndex, setCurretIndex] = useState(0);
  const [translationCard, setTranslationCard] = useState<boolean>(false);
  const [translate, setTranslate] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');
  const [wordToExplain, setWordToExplain] = useState<string>('');
  const [details, setDetails] = useState([]);

  // useEffect to explain the word onClick
  const promptExplainWord = [
    { text: 'word fazla' },
    {
      text: 'details {\n  "word": "Fazla",\n  "meaning": ["Muito", "Demais", "Excessivo"],\n  "grammatical_rule": "O advérbio \\"Fazla\\" é utilizado para modificar adjetivos, verbos e outros advérbios, indicando uma quantidade ou grau que excede o necessário ou esperado.",\n  "usage": "O advérbio \\"Fazla\\" é usado para indicar uma quantidade ou grau que excede o necessário ou esperado.",\n  "examples": [\n    "Hava çok fazla soğuk. (O tempo está muito frio.)",\n    "Yemekte fazla yedim. (Eu comi demais na refeição.)",\n    "Bu iş için fazla zaman harcadık. (Gastamos muito tempo nessa tarefa.)",\n    "Bugün fazla yoruldum. (Estou muito cansado hoje.)",\n    "Arabada fazla eşya var. (Há muitas coisas extras no carro.)",\n    "Bu elbise bana fazla büyük. (Este vestido é grande demais para mim.)",\n    "Fiyat fazla yüksek. (O preço está mais alto do que o esperado.)",\n    "Sınav fazla zordu. (O exame foi muito difícil.)"\n  ],\n  "idiomatic_expressions": [\n    "Fazla abartmak: Exagerar",\n    "Fazla konuşmak: Falar demais",\n    "Fazla düşünmek: Pensar demais",\n    "Fazla içmek: Beber demais",\n    "Fazla yemek: Comer demais"\n  ]\n}',
    },
    { text: 'word okudum' },
    {
      text: 'details {\n  "word": "Okudum",\n  "meaning": "Eu li",\n  "grammatical_rule": "O verbo \\"Okudum\\" é a primeira pessoa do singular do passado simples do verbo \\"Okumak\\", que significa \\"ler\\" em turco.",\n  "usage": "O verbo \\"Okudum\\" é usado para indicar que a ação de ler ocorreu no passado, na primeira pessoa do singular.",\n  "examples": [  \n      "Dün gece bir kitap okudum. (Eu li um livro ontem à noite.)",\n      "Okuduğunuz dergiyi okudum. (Eu li a revista que você leu.)",\n      "Kütüphaneden aldığım kitabı okudum. (Eu li o livro que peguei na biblioteca.)",\n      "Okuduğum romanı çok beğendim. (Eu adorei o romance que li.)",\n      "Dersler için birçok makale okudum. (Eu li muitos artigos para as aulas.)"\n  ],\n  "idiomatic_expressions": [\n    "Okumak zorunda kalmak: Ter que ler",\n    "Okuma yazma bilmek: Saber ler e escrever",\n    "Okuyucu: Leitor",\n    "Okuma parçası: Texto de leitura"\n  ]\n}',
    },
    { text: `word ${wordToExplain}` },
    { text: 'details ' },
  ];
  useEffect(() => {
    generateContent(promptExplainWord).then((wordDetails) => {
      try {
        const convertedExplanation = JSON.parse(wordDetails);
        setDetails(convertedExplanation);
      } catch (error) {
        console.log('Erro: ', error);
      }
    });
  }, [wordToExplain]);

  // useEffect to create a random array of phrases with Gemini
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

  const timer = 10;
  // REDIRECT TO SCORE PAGE AFTER FINISH LESSON
  useEffect(() => {
    if (currentIndex > 9) {
      router.push(`/score/${currentIndex}/${timer}`);
    }
  }, [currentIndex]);

  const splitWords = (phrase: string) => {
    const words = phrase?.split(' ');

    return words;
  };

  const handleHoverWord = (word: string) => {
    const currentPhraseWords = randomPhrases[currentIndex]?.words;
    if (currentPhraseWords) {
      const cleanedWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''); // Remove caracteres especiais, como pontos
      const translationObj = currentPhraseWords.find((obj) => obj[cleanedWord]);

      if (translationObj) {
        const translation =
          translationObj[cleanedWord as keyof typeof translationObj]; // Adicionando 'as keyof typeof translationObj'
        setTranslation(translation);
        setTranslationCard(true);
      }
    }
  };

  const handleOnClickWord = (word: string) => {
    setWordToExplain(word);
  };

  console.log(details);

  return (
    <section className="w-full flex flex-col items-center justify-center h-screen gap-5">
      {randomPhrases.length > 0 ? (
        <div className="flex w-[570px] items-center justify-center ">
          {splitWords(randomPhrases[currentIndex]?.phrase)?.map((word, i) => (
            <HoverCard key={i}>
              <HoverCardTrigger
                onMouseOut={() => {
                  setTranslationCard(false);
                }}
                onMouseOver={() => handleHoverWord(word)}
                className="cursor-pointer px-1"
              >
                <Dialog onOpenChange={() => setDetails(null)}>
                  <DialogTrigger onClick={() => handleOnClickWord(word)}>
                    {word}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-red-800">
                        Palavra: {word}
                      </DialogTitle>
                      <DialogDescription>
                        Tradução:
                        {details?.meaning?.map((means, i) => (
                          <span key={i} className="text-sm">
                            {' '}
                            {means},
                          </span>
                        ))}
                      </DialogDescription>
                      {details ? (
                        <div>
                          <h3 className="font-bold text-lg">Uso</h3>
                          <p>{details?.usage}</p>
                          <br />
                          <hr />
                          <br />
                          <h3 className="font-bold text-lg">Exemplos de Uso</h3>
                          <ol>
                            {details?.examples?.map((example, i) => (
                              <li key={i} className="text-sm">
                                - {example}
                              </li>
                            ))}
                          </ol>
                          <br />
                          <hr />
                          <br />
                          <h3 className="font-bold text-lg">
                            Regras Gramaticais
                          </h3>
                          <p className="text-sm">{details?.grammatical_rule}</p>
                          <br />
                          <hr />
                          <br />
                          <h3 className="font-bold text-lg">
                            Expressões idiomáticas
                          </h3>
                          <ol>
                            {details?.idiomatic_expressions?.map(
                              (expression, i) => (
                                <li key={i} className="text-sm">
                                  - {expression}
                                </li>
                              ),
                            )}
                          </ol>
                          <br />
                          <hr />
                          <br />
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
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </HoverCardTrigger>
              <HoverCardContent
                onMouseOut={() =>
                  translation ? translation : setTranslation('')
                }
                className="flex flex-col items-center justify-center"
              >
                {translation}
                <span className="text-[12px] text-slate-500">Detalhes</span>
              </HoverCardContent>
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
      {/* GENERATE ANOTHER PHRASE BUTTON */}
      <Button
        className="text-white"
        onClick={() => setCurretIndex(currentIndex + 1)}
      >
        <ArrowPathIcon className='className="h-4 w-4"' />
        Nova Frase
      </Button>
    </section>
  );
};

export default PracticeTranslatePage;
