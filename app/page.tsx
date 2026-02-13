"use client";

import { useState } from "react";
import Image from "next/image";

// Cute Hello Kitty elements
const FloatingHeart = ({ delay, left, duration }: { delay: number; left: string; duration: number }): React.JSX.Element => (
  <div
    className="absolute text-2xl sm:text-3xl opacity-20 animate-heart-float hidden md:block"
    style={{
      left,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      bottom: "-50px",
    }}
  >
    💕
  </div>
);

const FloatingBow = ({ delay, left, duration }: { delay: number; left: string; duration: number }): React.JSX.Element => (
  <div
    className="absolute text-xl sm:text-2xl opacity-25 animate-heart-float hidden md:block"
    style={{
      left,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      top: "-50px",
    }}
  >
    🎀
  </div>
);

const Sparkle = ({ delay, left, top, duration }: { delay: number; left: string; top: string; duration: number }): React.JSX.Element => (
  <div
    className="absolute text-lg sm:text-xl opacity-30 animate-sparkle hidden md:block"
    style={{
      left,
      top,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    ✨
  </div>
);


const noButtonMessages: string[] = [
  "No",
  "Whatttt",
  "Sigurado ka?",
  "Talaga?",
  "Sige na, wag mo i-no",
  "Pakiusap naman",
  "Teka, isipin mo ulit",
  "Last chance na",
  "Wag naman",
  "Baka magsisi ka",
  "Pwede ba, isipin mo muna?",
  "Sigurado ka talaga?",
  "Nakakaawa naman",
  "Wag ka naman maging cold",
  "Nagbago na ba isip mo?",
  "Di ka ba magbabago ng isip?",
  "Yan na ba final answer mo?",
];

export default function Home(): React.JSX.Element {
  const [envelopeClosed, setEnvelopeClosed] = useState<boolean>(true);
  const [envelopeOpening, setEnvelopeOpening] = useState<boolean>(false);
  const [showLetter, setShowLetter] = useState<boolean>(false);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [noButtonIndex, setNoButtonIndex] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [yesButtonSize, setYesButtonSize] = useState<number>(1);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [imageError, setImageError] = useState<boolean>(false);

  const handleEnvelopeClick = (): void => {
    if (envelopeClosed) {
      setEnvelopeClosed(false);
      setEnvelopeOpening(true);
      setTimeout(() => {
        setEnvelopeOpening(false);
        setShowLetter(true);
      }, 1500);
    }
  };

  const handleLetterContinue = (): void => {
    setShowLetter(false);
    setShowQuestion(true);
  };

  const handleNoClick = (): void => {
    if (noButtonIndex < noButtonMessages.length - 1) {
      setNoButtonIndex(noButtonIndex + 1);
      setYesButtonSize(yesButtonSize + 0.1);
      // Make the button move randomly after a few clicks (smaller movement on mobile)
      if (noButtonIndex >= 2) {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
        const maxMovement = isMobile ? 80 : 200;
        setNoButtonPosition({
          x: Math.random() * maxMovement - maxMovement / 2,
          y: Math.random() * maxMovement - maxMovement / 2,
        });
      }
    }
  };

  const handleYesClick = (): void => {
    setShowSuccess(true);
  };

  const showNoButton: boolean = noButtonIndex < noButtonMessages.length - 1;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 dark:from-stone-900 dark:via-stone-800 dark:to-amber-950">
      {/* Subtle texture background */}
      <div className="pointer-events-none absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139, 69, 19, 0.03) 10px, rgba(139, 69, 19, 0.03) 20px)',
      }}></div>
      
      
      <main className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 text-center w-full max-w-7xl mx-auto">
        {envelopeClosed ? (
          <div className="animate-fade-in cursor-pointer w-full" onClick={handleEnvelopeClick}>
            <div className="relative">
              <div className="mb-3 sm:mb-4 animate-gentle-bounce">
                <div className="text-7xl sm:text-8xl md:text-9xl">💌</div>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-pink-700 dark:text-pink-200 font-medium px-4">
                Click to open your letter
              </p>
            </div>
          </div>
        ) : envelopeOpening ? (
          <div className="animate-fade-in w-full">
            <div className="relative">
              <div className="mb-3 sm:mb-4 animate-envelope-open">
                <div className="text-7xl sm:text-8xl md:text-9xl">💌</div>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-pink-700 dark:text-pink-200 font-medium animate-pulse px-4">
                Opening...
              </p>
            </div>
          </div>
        ) : showLetter ? (
          <div className="animate-letter-appear max-w-2xl w-full px-2 sm:px-4">
            <div className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl shadow-2xl border-4 border-pink-300 dark:border-pink-600 transform rotate-1">
              {/* Cute paper texture */}
              <div className="absolute inset-0 opacity-10 pointer-events-none z-0 rounded-2xl" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 105, 180, 0.1) 2px, rgba(255, 105, 180, 0.1) 4px)',
              }}></div>
              
              {/* Cute corner decorations */}
              <div className="absolute top-4 right-4 text-pink-400 dark:text-pink-500 opacity-40 text-2xl sm:text-3xl animate-pulse">💕</div>
              <div className="absolute bottom-4 left-4 text-pink-400 dark:text-pink-500 opacity-40 text-2xl sm:text-3xl animate-pulse delay-75">🎀</div>
              
              <div className="relative z-10 space-y-4 sm:space-y-6 text-left">
                <div className="text-right text-pink-700 dark:text-pink-200 font-medium mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                  My Dearest Love
                </div>
                
                <div className="space-y-3 sm:space-y-4 text-pink-800 dark:text-pink-100 leading-relaxed text-sm sm:text-base md:text-lg">
                  <p className="indent-4 sm:indent-6 md:indent-8">
                    Hi Baby,
                  </p>
                  
                  <p className="indent-4 sm:indent-6 md:indent-8">
                  I just wanted to say I'm sorry for the times I've been hard to be around. Thank you so much for sticking by me, especially when I was at my lowest. I honestly can't imagine my life without you, and I'm just so grateful you're mine. I love you more than I can even put into words. Happy Valentine's Day.
                  </p>
                  
                  <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-pink-300 dark:border-pink-600 border-dashed">
                    <p className="text-pink-700 dark:text-pink-200 font-medium text-base sm:text-lg md:text-xl px-2">
                      Turn the page to see what's next...
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLetterContinue}
                className="relative z-20 mt-6 sm:mt-8 w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base md:text-lg"
                type="button"
              >
                Continue Reading
              </button>
            </div>
          </div>
        ) : showQuestion && !showSuccess ? (
          <>
            <div className="mb-6 sm:mb-8 animate-fade-in w-full px-2">
              <div className="relative flex justify-center">
                <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 overflow-hidden rounded-full border-4 border-pink-300 dark:border-pink-600 shadow-2xl animate-gentle-pulse bg-white dark:bg-pink-900">
                  {imageError ? (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-200 to-pink-100 dark:from-pink-800 dark:to-pink-700">
                      <svg className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 text-pink-500 dark:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                  ) : (
                    <Image
                      src="/valentine-heart.jpg"
                      alt="Valentine's Day"
                      fill
                      className="object-cover"
                      priority
                      onError={() => {
                        setImageError(true);
                      }}
                    />
                  )}
                  <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-pink-300 to-pink-200 dark:from-pink-600 dark:to-pink-500 rounded-full blur-xl opacity-50 -z-10 animate-glow"></div>
                </div>
              </div>
            </div>

            <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6 animate-fade-in w-full px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-pink-700 dark:text-pink-200 drop-shadow-sm animate-gentle-sway text-center px-2">
                Will you be my Valentine?
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-pink-600 dark:text-pink-300 italic px-2 text-center">
                You mean absolutely everything to me
              </p>
              <p className="text-sm sm:text-base md:text-lg text-pink-500 dark:text-pink-400 px-2 text-center">
                My heart belongs to you, now and always
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:gap-6 w-full px-4 sm:px-0 max-w-md sm:max-w-none justify-center items-stretch sm:items-center">
              <button
                onClick={handleYesClick}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 hover:from-pink-600 hover:to-pink-500 px-6 sm:px-8 md:px-12 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 animate-gentle-bounce border-4 border-pink-300 dark:border-pink-500 w-full sm:w-auto"
                style={{
                  transform: `scale(${yesButtonSize})`,
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {showNoButton ? "Yes!" : "Oo naman, mahal na mahal kita"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </button>

              {showNoButton && (
                <button
                  onClick={handleNoClick}
                  className="rounded-full border-4 border-pink-300 dark:border-pink-600 bg-white dark:bg-pink-900 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-pink-700 dark:text-pink-200 transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-800 active:scale-95 shadow-md w-full sm:w-auto whitespace-nowrap"
                  style={{
                    transform: noButtonIndex > 2 ? `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)` : "none",
                  }}
                >
                  {noButtonMessages[noButtonIndex]}
                </button>
              )}
            </div>
          </>
        ) : showSuccess ? (
          <div className="animate-fade-in space-y-6 sm:space-y-8 w-full px-4 max-w-2xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-pink-300 dark:border-pink-600">
                <Image
                  src="/images/IMG_20251020_203416.jpg"
                  alt="Valentine's Day"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-pink-200 dark:from-pink-600 dark:to-pink-500 rounded-2xl blur-xl opacity-40 -z-10"></div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-pink-700 dark:text-pink-200 drop-shadow-sm text-center px-2">
              Sabi mo yes! BWAHAHAHAHA!
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-pink-600 dark:text-pink-300 px-2 text-center">
              I love you baby hihihi sorry sa lahat hehehehehe
            </p>
          </div>
        ) : null}
      </main>
    </div>
  );
}
