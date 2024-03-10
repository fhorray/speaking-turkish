"use client";

import { useGemini } from "@/contexts/GeminiContext";

import React, { useEffect, useRef, useState } from "react";
// AUDIOS
import useSound from "use-sound";

// ZOD IMPORTS
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const prompt = `Create a random number in Turkish, show only the number in text format. and return a text like this: "[numeral: numeric number, verbal: verbal number], format the text to be a valid number, example: if the number generated as: [numeral: 023, verbal: "sıfır iki üç"], you can convert it to  [numeral: 23, verbal: "yirm üç"] and not [numeral: 023, verbal: "sıfır iki üç"] because 023 its not sıfır iki üç instead it is yirmi üç`;

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
  const [random, setRandom] = useState<NumberObject>({
    numeral: 0,
    verbal: "",
  });
  const [answer, setAnswer] = useState<number>(0);
  const numberInput = useRef<HTMLInputElement>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // useAudio
  const [playCorrect] = useSound("/sounds/correct.mp3");

  // TOASTER
  const { toast } = useToast();

  // useEffect to create a random Number with Gemini
  const { generateContent } = useGemini();
  useEffect(() => {
    generateContent(prompt).then((number) => {
      // REGEX
      const regex = /\[numeral: (\d+), verbal: "(.*?)"]/;

      // Valores usando REGEX
      const match = number.match(regex);

      // Array de objetos
      const obj: NumberObject = match
        ? { numeral: Number(match[1]), verbal: match[2] }
        : { numeral: 0, verbal: "" };

      console.log(obj);

      setRandom(obj);
    });
  }, [formSubmitted]);

  const handleVerifyNumber = () => {
    if (random.numeral === answer) {
      if (numberInput.current) {
        numberInput.current.value = "";
        numberInput.current.focus();
      }
      setFormSubmitted(!formSubmitted);
      setShowDialog(true);
      setAnswer(0);

      // Play Correct Sound
      // const audio = new Audio(correctAnswer);
      // audio.play();
      playCorrect();
    } else {
      setAnswer(0);
    }
  };

  const handleNumberClick = (num: number) => {
    if (answer === random.numeral) {
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
    let words = phrase.split(" ");

    // Capitalize a primeira letra de cada palavra
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    // Junte as words novamente para formar a nova Phrase
    let newPhrase = words.join(" ");
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
      <span className="text-xl font-medium">
        {capitalizeWords(random.verbal)}
      </span>

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
                    disabled={answer === random.numeral}
                    type="number"
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                      setAnswer(isNaN(value) ? 0 : value);
                    }}
                    value={answer === 0 ? "" : answer}
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
            disabled={answer === random.numeral}
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleDeleteNumber}
          className="bg-gray-200 p-2 rounded-md text-black font-bold"
        >
          &#9003; {/* DELETE */}
        </button>
        <button
          onClick={() => {
            handleVerifyNumber();

            answer === random.numeral
              ? toast({
                  title: "Certo",
                  description: "Voce acertooou",
                  action: (
                    <ToastAction altText="Try again">Continuar</ToastAction>
                  ),
                })
              : toast({
                  variant: "destructive",
                  title: "Oops!",
                  description: "Acho que você errou algum número...",
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
