'use client';

import React, { useEffect, useRef, useState } from 'react';

function formNumber(number: number): {
  turkFormNumber: string;
  numeric: number;
} {
  const unity = [
    '',
    'bir',
    'iki',
    'üç',
    'dört',
    'beş',
    'altı',
    'yedi',
    'sekiz',
    'dokuz',
  ];
  const ten = [
    '',
    'on',
    'yirmi',
    'otuz',
    'kırk',
    'elli',
    'altmış',
    'yetmiş',
    'seksen',
    'doksan',
  ];

  let result: { turkFormNumber: string; numeric: number } = {
    turkFormNumber: '',
    numeric: number,
  };

  // Milhares
  const thousandDigits = Math.floor(number / 1000);
  if (thousandDigits > 0) {
    result.turkFormNumber += `${unity[thousandDigits]} bin `;
    number %= 1000;
  }

  // Centenas
  const hundredDigits = Math.floor(number / 100);
  if (hundredDigits > 0) {
    result.turkFormNumber += `${unity[hundredDigits]} yüz `;
    number %= 100;
  }

  // Dezenas e unidades
  if (number > 0) {
    if (result.turkFormNumber !== '') {
      result.turkFormNumber += ' ';
    }
    if (number < 10) {
      result.turkFormNumber += unity[number];
    } else if (number < 20) {
      result.turkFormNumber += 'on ' + unity[number % 10];
    } else {
      result.turkFormNumber += ten[Math.floor(number / 10)];
      if (number % 10 !== 0) {
        result.turkFormNumber += ' ' + unity[number % 10];
      }
    }
  }

  result.numeric = number;

  return result;
}

const NumbersPractice = () => {
  const [random, setRandom] = useState<number>(0);
  const [answer, setAnswer] = useState<number>(0);
  const numberInput = useRef<HTMLInputElement>(null);
  console.log(random, answer);

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    const randomicNumber = Math.floor(Math.random() * 9999) + 1;
    setRandom(randomicNumber);
  };

  const handleVerifyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const inputValue = Number(e.target.value);

    setAnswer(inputValue);

    if (answer === random) {
      generateRandomNumber();
      if (numberInput.current) {
        numberInput.current.value = '';
        numberInput.current.focus();
      }
      alert('Correto!');
    } else {
      alert('Errado!');
    }
  };

  return (
    <div>
      <span>{formNumber(random).turkFormNumber}</span>
      <form action="">
        <input
          className="text-black"
          type="number"
          ref={numberInput}
          onChange={(e) => setAnswer(Number(e.target.value))}
        />
        <button onClick={(e) => handleVerifyNumber(e)}>Verificar</button>
      </form>
    </div>
  );
};

export default NumbersPractice;
