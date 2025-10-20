import { useState, useEffect } from 'react';

interface UseTypingEffectProps {
  text: string;
  speed?: number;
  startDelay?: number;
}

export const useTypingEffect = ({ 
  text, 
  speed = 50, 
  startDelay = 0 
}: UseTypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay]);

  return { displayedText, isTyping };
};
