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
    if (onStart) {
      onStart();
    }
  }, [onStart]);

  return (
    <TypeAnimation
      sequence={[
        text,
        () => {
          if (onComplete) {
            onComplete();
          }
        }
      ]}
      speed={50} 
      style={{ display: 'inline-block', minHeight: '1.2em' }}
      cursor={true}
      repeat={0}
    />
  );
};

export default TypeHangul;
