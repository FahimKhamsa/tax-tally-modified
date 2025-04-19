import { useState, useEffect } from "react";

interface TypingTextProps {
  words: string[];
  typeSpeed?: number; // ms per letter when typing
  deleteSpeed?: number; // ms per letter when deleting
  pause?: number; // ms to wait before deleting
}

export function TypingText({
  words,
  typeSpeed = 150,
  deleteSpeed = 75,
  pause = 1000,
}: TypingTextProps) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // typing
      timer = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          // done typing → pause then start deleting
          setTimeout(() => setIsDeleting(true), pause);
        }
      }, typeSpeed);
    } else {
      // deleting
      timer = setTimeout(() => {
        setText(currentWord.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((i) => i + 1); // next word
        }
      }, deleteSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className="text-green-600 dark:text-green-500 font-mono">
      {text}
      <span className="inline-block w-6 h-1.5 bg-[currentColor] animate-blink ml-3 mb-2 align-bottom" />
    </span>
  );
}
