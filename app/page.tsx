"use client";

import { useState } from "react";
import Image from "next/image";


const noButtonMessages: string[] = [
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
                <svg className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto text-amber-800 dark:text-amber-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-amber-900 dark:text-amber-200 font-medium px-4">
                Click to open your letter
              </p>
            </div>
          </div>
        ) : envelopeOpening ? (
          <div className="animate-fade-in w-full">
            <div className="relative">
              <div className="mb-3 sm:mb-4 animate-envelope-open">
                <svg className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto text-amber-800 dark:text-amber-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-amber-900 dark:text-amber-200 font-medium animate-pulse px-4">
                Opening...
              </p>
            </div>
          </div>
        ) : showLetter ? (
          <div className="animate-letter-appear max-w-2xl w-full px-2 sm:px-4">
            <div className="relative bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-2xl border border-amber-200 dark:border-amber-800 transform rotate-1">
              {/* Paper texture effect */}
              <div className="absolute inset-0 opacity-10 pointer-events-none z-0 rounded-lg" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 69, 19, 0.05) 2px, rgba(139, 69, 19, 0.05) 4px)',
              }}></div>
              
              {/* Elegant corner decoration */}
              <div className="absolute top-4 right-4 text-amber-800 dark:text-amber-300 opacity-20 text-2xl sm:text-3xl">❦</div>
              <div className="absolute bottom-4 left-4 text-amber-800 dark:text-amber-300 opacity-20 text-2xl sm:text-3xl">❦</div>
              
              <div className="relative z-10 space-y-4 sm:space-y-6 text-left">
                <div className="text-right text-amber-900 dark:text-amber-200 font-serif font-medium mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                  My Dearest Love
                </div>
                
                <div className="space-y-3 sm:space-y-4 text-amber-900 dark:text-amber-100 leading-relaxed text-sm sm:text-base md:text-lg font-serif">
                  <p className="indent-4 sm:indent-6 md:indent-8">
                    Hi Baby,
                  </p>
                  
                  <p className="indent-4 sm:indent-6 md:indent-8">
                  I just wanted to say I’m sorry for the times I’ve been hard to be around. Thank you so much for sticking by me, especially when I was at my lowest. I honestly can’t imagine my life without you, and I’m just so grateful you’re mine. I love you more than I can even put into words. Happy Valentine’s Day.
                  </p>
                  
                  <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-300 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 font-medium text-base sm:text-lg md:text-xl px-2">
                      Turn the page to see what's next...
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLetterContinue}
                className="relative z-20 mt-6 sm:mt-8 w-full py-3 sm:py-4 px-4 sm:px-6 bg-amber-800 hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-medium rounded-md shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer text-sm sm:text-base md:text-lg"
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
                <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 overflow-hidden rounded-full border-2 border-amber-300 dark:border-amber-700 shadow-xl animate-gentle-pulse bg-white dark:bg-stone-800">
                  {imageError ? (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-200 to-amber-100 dark:from-amber-900 dark:to-amber-800">
                      <svg className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
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
                  <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-amber-200 to-amber-100 dark:from-amber-800 dark:to-amber-700 rounded-full blur-xl opacity-40 -z-10 animate-glow"></div>
                </div>
              </div>
            </div>

            <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6 animate-fade-in w-full px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-medium text-amber-900 dark:text-amber-100 drop-shadow-sm animate-gentle-sway text-center px-2">
                Will you be my Valentine?
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-800 dark:text-amber-200 font-serif italic px-2 text-center">
                You mean absolutely everything to me
              </p>
              <p className="text-sm sm:text-base md:text-lg text-amber-700 dark:text-amber-300 font-serif px-2 text-center">
                My heart belongs to you, now and always
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:gap-6 w-full px-4 sm:px-0 max-w-md sm:max-w-none justify-center items-stretch sm:items-center">
              <button
                onClick={handleYesClick}
                className="group relative overflow-hidden rounded-md bg-amber-800 hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 px-6 sm:px-8 md:px-12 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 animate-gentle-bounce border border-amber-900 dark:border-amber-600 w-full sm:w-auto"
                style={{
                  transform: `scale(${yesButtonSize})`,
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {showNoButton ? "Yes" : "Oo naman, mahal na mahal kita"}
                </span>
              </button>

              {showNoButton && (
                <button
                  onClick={handleNoClick}
                  className="rounded-md border-2 border-amber-300 dark:border-amber-700 bg-white dark:bg-stone-800 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-medium text-amber-900 dark:text-amber-200 transition-all duration-300 hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-stone-700 active:scale-95 shadow-md w-full sm:w-auto whitespace-nowrap"
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
          <div className="animate-fade-in space-y-6 sm:space-y-8 w-full px-4">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-amber-600 dark:text-amber-400 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-medium text-amber-900 dark:text-amber-100 drop-shadow-sm text-center px-2">
               Sabi mo yes! BWAHAHAHAHA!
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-amber-800 dark:text-amber-200 font-serif px-2 text-center">
              I love you baby hihihi sorry sa lahat hehehehehe
            </p>
          </div>
        ) : null}
      </main>
    </div>
  );
}
