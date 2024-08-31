"use client";

import { Play, Square, Sun, Moon, Disc } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [offset, setOffset] = useState(0);

  const audioRef = useRef(null);

  const toggleStream = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = "https://garnet-soapy-judo.glitch.me/stream"; // Replace with your Glitch project URL
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const animate = (time) => {
      setOffset((time / 50) % 1000);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen overflow-hidden transition-colors duration-300 ${
        isDarkTheme
          ? "bg-gradient-to-br from-gray-900 via-purple-900/60 to-blue-900/60 text-gray-100"
          : "bg-gradient-to-br from-white via-purple-100 to-blue-100 text-gray-800"
      }`}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="music-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M${25 + (offset % 100)},${25 + Math.sin(offset / 10) * 10} 
                      C${25 + (offset % 100)},${
                10 + Math.sin(offset / 15) * 5
              } ${40 + (offset % 100)},${10 + Math.cos(offset / 20) * 5} ${
                40 + (offset % 100)
              },${25 + Math.sin(offset / 25) * 10}
                      C${40 + (offset % 100)},${
                40 + Math.cos(offset / 30) * 5
              } ${25 + (offset % 100)},${40 + Math.sin(offset / 35) * 5} ${
                25 + (offset % 100)
              },${25 + Math.sin(offset / 40) * 10}
                      M${40 + (offset % 100)},${
                25 + Math.sin(offset / 45) * 10
              } L${40 + (offset % 100)},${75 + Math.cos(offset / 50) * 10}
                      M${35 + (offset % 100)},${
                75 + Math.sin(offset / 55) * 5
              } L${45 + (offset % 100)},${75 + Math.cos(offset / 60) * 5}`}
              fill="none"
              stroke={isDarkTheme ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth="2"
            />
          </pattern>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#music-pattern)"
        />
      </svg>

      <button
        onClick={toggleTheme}
        className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full transition-colors duration-300 z-10 ${
          isDarkTheme
            ? "bg-white text-gray-800 hover:bg-gray-200"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
        aria-label={
          isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
        }
      >
        {isDarkTheme ? (
          <Sun className="h-4 w-4 sm:h-6 sm:w-6" />
        ) : (
          <Moon className="h-4 w-4 sm:h-6 sm:w-6" />
        )}
      </button>
      <div className="z-10 flex flex-col items-center max-w-md w-full px-4 sm:px-0">
        <div className="relative">
          <button
            onClick={toggleStream}
            className={`relative inline-flex items-center justify-center rounded-full p-8 sm:p-12 md:p-16 lg:p-20 transition-all duration-300 ease-in-out hover:bg-opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 active:scale-95 ${
              isDarkTheme
                ? "bg-white bg-opacity-15 text-white focus-visible:ring-white"
                : "bg-gray-800 bg-opacity-15 text-gray-800 focus-visible:ring-gray-800"
            }`}
            aria-label={isPlaying ? "Stop" : "Play"}
          >
            {isPlaying ? (
              <Square className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
            ) : (
              <Play className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
            )}
          </button>
          <audio ref={audioRef} />
          {isPlaying && (
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 flex items-center bg-red-600 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full">
              <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full mr-1 animate-pulse"></span>
              LIVE
            </div>
          )}
        </div>
        <h2 className="mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl font-semibold flex items-center">
          <Disc className={`mr-2 ${isPlaying ? "animate-spin" : ""}`} />
          Under development :/
        </h2>
      </div>
      <div className="absolute bottom-2 sm:bottom-4 text-xs sm:text-sm text-opacity-80">
        © Sriram Mishra 2024
      </div>
    </div>
  );
}
