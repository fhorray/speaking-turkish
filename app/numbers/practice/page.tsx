'use client';

import { useGemini } from '@/contexts/GeminiContext';

import React, { useEffect, useRef, useState } from 'react';

// ZOD IMPORTS
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useScore } from '@/contexts/ScoreContext';
import { FireIcon } from '@heroicons/react/16/solid';
import ScoreFlame from '@/components/ScoreFlame';
import { useRouter } from 'next/navigation';

const prompt = `Generate a turkish number list with 10 random numbers with a fixed pattern like this:[ { "verbal": "altı yüz yirmi iki", "numeral": 622 }, { "verbal": "dokuz yüz doksan dokuz", "numeral": 999 } ]. Use the JSON format given below.`;

interface NumberObject {
  numeral: number;
  verbal: string;
}

// ANSWER INPUT SCHEMA
const formSchema = z.object({
  answer: z.number(),
});

// APP INITIALIZE
const NumbersPractice = () => {
  const [random, setRandom] = useState<NumberObject[]>([
    {
      numeral: 0,
      verbal: '',
    },
  ]);
  const [answer, setAnswer] = useState<number>(0);
  const numberInput = useRef<HTMLInputElement>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const router = useRouter();

  // SCORE
  const { score, setScore } = useScore();

  // TOASTER
  const { toast } = useToast();

  // useEffect to create a random Number with Gemini
  const { generateContent } = useGemini();

  // GET NUMBER LIST
  useEffect(() => {
    generateContent(prompt).then((number) => {
      try {
        const cleanedJson = JSON.parse(
          number?.replace('```json', '').replace('```', ''),
        );
        console.log(cleanedJson);
        setRandom(cleanedJson);
      } catch (error) {
        console.error('Erro ao fazer o parse do JSON:', error);
      }
    });
  }, []);

  // REDIRECT TO SCORE PAGE AFTER FINISH LESSON
  useEffect(() => {
    if (currentIndex > 9) {
      router.push('/score');
    }
  }, [currentIndex]);

  console.log(random);

  const handleVerifyNumber = () => {
    if (random[currentIndex]?.numeral === answer) {
      if (numberInput.current) {
        numberInput.current.value = '';
        numberInput.current.focus();
      }
      setFormSubmitted(!formSubmitted);
      setShowDialog(true);
      setAnswer(0);
      setScore(score + 1);
      setCurrentIndex(currentIndex + 1); // Avança para o próximo número quando a resposta está correta
    } else {
      setAnswer(0);
    }
  };

  const handleNumberClick = (num: number) => {
    if (answer === random[currentIndex]?.numeral) {
      return;
    }
    setAnswer(answer * 10 + num);
    if (numberInput.current) {
      numberInput.current.focus();
    }
  };

  const handleDeleteNumber = () => {
    setAnswer(Math.floor(answer / 10));
  };

  // Captalize Verbal Number Function
  function capitalizeWords(phrase: string) {
    // Divida a Phrase em words individuais
    let words = phrase.split(' ');

    // Capitalize a primeira letra de cada palavra
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    // Junte as words novamente para formar a nova Phrase
    let newPhrase = words.join(' ');
    return newPhrase;
  }

  // FORM ANSWER WITH ZOD
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: answer,
    },
  });

  // onSubmit Function for the answer input form
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="m-auto flex flex-col gap-5 items-center justify-center h-screen w-full max-w-xs">
      <div>
        <div>
          {currentIndex < random.length
            ? capitalizeWords(random[currentIndex]?.verbal)
            : ''}
        </div>
      </div>
      <Form {...form}>
        <form
          className="w-full text-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sua resposta:</FormLabel>
                <FormControl>
                  <Input
                    className="max-w-xs"
                    ref={numberInput}
                    placeholder="2453..."
                    disabled={answer === random[currentIndex]?.numeral}
                    type="number"
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                      setAnswer(isNaN(value) ? 0 : value);
                    }}
                    value={answer === 0 ? '' : answer}
                  />
                </FormControl>
                <FormDescription>Escreva sua resposta acima</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="grid grid-cols-3 gap-2 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="bg-gray-200 p-2 rounded-md text-black font-bold"
            disabled={answer === random[currentIndex]?.numeral}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => {
            handleDeleteNumber();
          }}
          className="bg-gray-200 p-2 rounded-md text-black font-bold"
        >
          &#9003; {/* DELETE */}
        </button>
        <button
          onClick={() => {
            handleVerifyNumber();

            answer === random[currentIndex]?.numeral
              ? toast({
                  title: 'Certo',
                  description: 'Voce acertooou',
                  action: (
                    <ToastAction altText="Try again">Continuar</ToastAction>
                  ),
                })
              : toast({
                  variant: 'destructive',
                  title: 'Oops!',
                  description: 'Acho que você errou algum número...',
                  action: (
                    <ToastAction
                      altText="Try again"
                      className="border border-slate-50 p-2 rounded transition hover:bg-red-600"
                    >
                      Tentar Novamente
                    </ToastAction>
                  ),
                });
          }}
          className="bg-gray-200 p-2 rounded-md text-black font-bold"
        >
          &#128077; {/* SEND */}
        </button>
      </div>
    </div>
  );
};

export default NumbersPractice;
