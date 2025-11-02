import { useEffect, useRef } from 'react';
import '@lottiefiles/dotlottie-wc';

interface LottieCharacterProps {
  state: 'idle' | 'correct' | 'wrong';
  onAnimationComplete?: () => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': any;
    }
  }
}

export const LottieCharacter = ({ state, onAnimationComplete }: LottieCharacterProps) => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    const element = lottieRef.current;
    if (!element) return;

    // Trigger animation based on state
    if (state === 'correct' || state === 'wrong') {
      element.play();
      
      // Reset to idle after animation
      const timer = setTimeout(() => {
        onAnimationComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state, onAnimationComplete]);

  return (
    <div className="fixed bottom-24 left-4 z-40 pointer-events-none">
      <div className={`transition-all duration-300 ${
        state === 'correct' ? 'animate-bounce' : 
        state === 'wrong' ? 'animate-shake' : 
        'opacity-80'
      }`}>
        <dotlottie-wc
          ref={lottieRef}
          src="https://lottie.host/a855b7f0-1952-4745-a513-869ffc2e1cd3/4werlp5GkM.lottie"
          style={{ width: '200px', height: '200px' }}
          loop={state === 'idle'}
          autoplay={state === 'idle'}
        />
      </div>
    </div>
  );
};
