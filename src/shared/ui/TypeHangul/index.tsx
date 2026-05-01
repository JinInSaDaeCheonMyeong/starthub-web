import { useEffect, useRef, useState } from 'react';

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
    typeHangulLoaded?: boolean;
  }
}

interface TypeHangulProps {
  text: string;
  speed?: number;
  targetId: string;
  onComplete?: () => void;
  onStart?: () => void;
}

const TypeHangul = ({ text, speed = 50, targetId, onComplete, onStart }: TypeHangulProps) => {
  const hasTyped = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    hasTyped.current = false;
    setIsReady(false);
  }, [targetId, text]);

  useEffect(() => {
    if (hasTyped.current || isReady) return;

    const element = document.getElementById(targetId);
    if (!element) {
      console.warn(`Element with id ${targetId} not found`);
      return;
    }

    let retryCount = 0;
    const maxRetries = 100; // 10초 동안 재시도

    const tryInitializeTyping = () => {
      // TypeHangul 라이브러리와 필요한 메서드가 모두 존재하는지 확인
      const isLibraryReady = window.TypeHangul &&
                            typeof window.TypeHangul.type === 'function';


      if (!isLibraryReady && retryCount < maxRetries) {
        retryCount++;
        setTimeout(tryInitializeTyping, 100);
        return;
      }

      if (!isLibraryReady) {
        // 라이브러리 로드에 실패한 경우 텍스트를 바로 표시
        console.warn('TypeHangul library not loaded or invalid, showing text directly');
        element.textContent = text;
        hasTyped.current = true;
        setIsReady(true);
        onComplete?.();
        return;
      }

      console.log(`TypeHangul library loaded, starting animation for: ${text.substring(0, 20)}...`);

      // onStart 콜백 호출
      onStart?.();

      // 기존 텍스트 제거
      element.textContent = '';
      hasTyped.current = true;
      setIsReady(true);

      try {
        // TypeHangul 라이브러리의 올바른 옵션을 사용
        window.TypeHangul.type(element, {
          text: text,
          intervalType: Math.max(speed, 50),  // 최소 50ms 보장
          useBlink: true,
          useBlinkWith: '|',
          useBlinkSpeed: 500,
          delay: 100,
        });

        console.log(`Started typing animation: "${text}" with speed ${speed}ms`);

        // 타이핑 완료 체크 - 더 정확한 완료 감지
        let checkCount = 0;
        const maxChecks = Math.max(100, text.length * 2); // 충분한 시간 확보

        const checkComplete = () => {
          checkCount++;
          const currentText = element.textContent || '';

          // 텍스트가 완료되었거나 최대 체크 수에 도달했을 때
          if (currentText.includes(text) || checkCount >= maxChecks) {
            console.log(`Typing completed: "${currentText}"`);
            onComplete?.();
          } else {
            setTimeout(checkComplete, 100);
          }
        };

        // 최소 대기 시간 후 체크 시작
        setTimeout(checkComplete, Math.max(500, speed * text.length / 10));

      } catch (error) {
        console.warn('TypeHangul error, showing text directly:', error);
        element.textContent = text;
        onComplete?.();
      }
    };

    // DOM과 스크립트 로딩이 완료된 후 시도
    setTimeout(tryInitializeTyping, 500);
  }, [text, speed, targetId, isReady, onComplete, onStart]);

  return null;
};

export default TypeHangul;
