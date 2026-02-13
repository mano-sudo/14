"use client";

import { useState } from "react";
import Image from "next/image";

const noButtonMessages: string[] = [
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
];

export default function ValentinePage(): React.JSX.Element {
  const [noButtonIndex, setNoButtonIndex] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [yesButtonSize, setYesButtonSize] = useState<number>(1);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleNoClick = (): void => {
    if (noButtonIndex < noButtonMessages.length - 1) {
      setNoButtonIndex(noButtonIndex + 1);
      setYesButtonSize(yesButtonSize + 0.1);
      // Make the button move randomly after a few clicks
      if (noButtonIndex >= 2) {
        setNoButtonPosition({
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
        });
      }
    }
  };

  const handleYesClick = (): void => {
    setShowSuccess(true);
  };

  const showNoButton: boolean = noButtonIndex < noButtonMessages.length - 1;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-red-50 to-rose-100 dark:from-pink-950 dark:via-red-950 dark:to-rose-900">
      <main className="flex flex-col items-center justify-center px-8 py-16 text-center">
        {!showSuccess ? (
          <>
            <div className="mb-8 animate-fade-in">
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-pink-300 shadow-2xl dark:border-pink-600">
                <Image
                  src="/valentine-heart.jpg"
                  alt="Valentine's Day"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-400 to-red-400 text-white text-6xl">❤️</div>';
                    }
                  }}
                />
              </div>
            </div>

            <div className="mb-12 space-y-4 animate-fade-in">
              <h1 className="text-5xl font-bold text-pink-600 dark:text-pink-400 md:text-6xl">
                Will you be my Valentine?
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 md:text-2xl">
                You mean the world to me 💕
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <button
                onClick={handleYesClick}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-12 py-4 text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
                style={{
                  transform: `scale(${yesButtonSize})`,
                }}
              >
                <span className="relative z-10">Yes! 💖</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </button>

              {showNoButton && (
                <button
                  onClick={handleNoClick}
                  className="rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-lg font-medium text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 active:scale-95 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  style={{
                    transform: noButtonIndex > 2 ? `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)` : "none",
                  }}
                >
                  {noButtonMessages[noButtonIndex]}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="animate-fade-in space-y-8">
            <div className="text-8xl animate-bounce">🎉</div>
            <h2 className="text-5xl font-bold text-pink-600 dark:text-pink-400 md:text-6xl">
              Yay! You said yes! 💕
            </h2>
            <p className="text-2xl text-gray-700 dark:text-gray-300">
              You just made my day! I love you! ❤️
            </p>
            <div className="mt-8 flex justify-center gap-4 text-4xl">
              <span className="animate-pulse">💖</span>
              <span className="animate-pulse delay-75">💕</span>
              <span className="animate-pulse delay-150">💗</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

