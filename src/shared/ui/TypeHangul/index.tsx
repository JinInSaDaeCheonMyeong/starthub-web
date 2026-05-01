import { TypeAnimation } from 'react-type-animation';
import { useEffect } from 'react';

interface TypeAnimationProps {
  text: string;
  speed?: number;
  targetId?: string;
  onComplete?: () => void;
  onStart?: () => void;
}

const TypeHangul = ({ text, onComplete, onStart }: TypeAnimationProps) => {
  useEffect(() => {
    // 타이핑 시작 콜백
    if (onStart) {
      onStart();
    }
  }, [onStart]);

  return (
    <TypeAnimation
      sequence={[
        text,
        () => {
          // 타이핑 완료 콜백
          if (onComplete) {
            onComplete();
          }
        }
      ]}
      speed={50} // speed는 words per minute (1-99)
      style={{ display: 'inline-block', minHeight: '1.2em' }}
      cursor={true}
      repeat={0}
    />
  );
};

export default TypeHangul;
