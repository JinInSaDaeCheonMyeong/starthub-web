import { useEffect, useRef } from 'react';

interface TypeHangulOptions {
  text?: string;
  intervalType?: number;
  intervalRemove?: number;
  useBlink?: boolean;
  useBlinkWith?: string;
  useBlinkSpeed?: number;
  delay?: number;
  longPressSpeed?: number;
}

interface TypeHangulLibrary {
  type: (selector: string | HTMLElement, options?: TypeHangulOptions) => void;
  remove: (selector: string | HTMLElement, options?: TypeHangulOptions) => void;
  removeWrite: (selector: string | HTMLElement, options?: TypeHangulOptions) => void;
}

declare global {
  interface Window {
    TypeHangul: TypeHangulLibrary;
  }
}

interface TypeHangulProps {
  text: string;
  speed?: number;
  targetId: string;
}

const TypeHangul = ({ text, speed = 0.01, targetId }: TypeHangulProps) => {
  const hasTyped = useRef(false);

  useEffect(() => {
    hasTyped.current = false;
  }, [targetId]);

  useEffect(() => {
    if (hasTyped.current || !window.TypeHangul) return;
    
    const element = document.getElementById(targetId);
    if (!element) return;

    element.textContent = '';
    hasTyped.current = true;
    
    window.TypeHangul.type(`#${targetId}`, {
      text: text,
      intervalType: speed,
      useBlink: true,
      useBlinkWith: '|',
      useBlinkSpeed: 3,
    });
  }, [text, speed, targetId]);

  return null;
};

export default TypeHangul;
