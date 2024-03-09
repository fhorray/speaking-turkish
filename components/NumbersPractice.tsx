import React, { useEffect, useRef, useState } from "react";

function formNumber(number: number): {
  turkFormNumber: string;
  numeric: number;
} {
  const unity = [
    "",
    "bir",
    "iki",
    "üç",
    "dört",
    "beş",
    "altı",
    "yedi",
    "sekiz",
    "dokuz",
  ];
  const ten = [
    "",
    "on",
    "yirmi",
    "otuz",
    "kırk",
    "elli",
    "altmış",
    "yetmiş",
    "seksen",
    "doksan",
  ];

  let result: { turkFormNumber: string; numeric: number } = {
    turkFormNumber: "",
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
    if (result.turkFormNumber !== "") {
      result.turkFormNumber += " ";
    }
    if (number < 10) {
      result.turkFormNumber += unity[number];
    } else if (number < 20) {
      result.turkFormNumber += "on " + unity[number % 10];
    } else {
      result.turkFormNumber += ten[Math.floor(number / 10)];
      if (number % 10 !== 0) {
        result.turkFormNumber += " " + unity[number % 10];
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
  console.log(random);

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    const randomicNumber = Math.floor(Math.random() * 9999) + 1;
    setRandom(randomicNumber);
  };

  const handleVerifyNumber = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = Number((e.target as HTMLFormElement).value);
    setAnswer(inputValue);

    if (answer === random) {
      generateRandomNumber();
      if (numberInput.current) {
        numberInput.current.value = "";
        numberInput.current.focus();
      }
      alert("Correto!");
    } else {
      alert("Errado!");
      setAnswer(0); // Reset the answer to 0 when the input is wrong
    }
  };

  const handleNumberClick = (num: number) => {
    if (answer === random) {
      return; // Do not allow number input if the answer is already correct
    }
    setAnswer(answer * 10 + num); // Update the answer by adding the clicked number
    if (numberInput.current) {
      numberInput.current.focus();
    }
  };

  return (
    <div>
      <span>{formNumber(random).turkFormNumber}</span>

      <form onSubmit={handleVerifyNumber}>
        <input
          className="text-black"
          type="number"
          ref={numberInput}
          value={answer}
          onChange={(e) => setAnswer(Number(e.target.value))}
          disabled={answer === random} // Disable input if the answer is correct
        />
        <button type="submit">Verificar</button>
      </form>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="bg-gray-200 p-2 rounded-md text-black font-bold"
            disabled={answer === random} // Disable number buttons if the answer is correct
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumbersPractice;
