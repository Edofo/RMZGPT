import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const loadingMessages = [
  "Preparing the fun...",
  "Warming up the chat bubbles...",
  "Tuning the laughter frequency...",
  "Polishing the emojis...",
  "Inflating the joy balloons...",
  "Sprinkling magic dust...",
  "Charging the happy batteries...",
  "Unleashing the giggles...",
  "Calibrating the smile-o-meter...",
  "Fueling the excitement rockets...",
];

const uniqueKeys = ["key-1", "key-2", "key-3", "key-4", "key-5"];

const LoadingPage = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="mb-8">
          <Loader2 className="mx-auto h-16 w-16 animate-spin text-white" />
        </div>
        <h1 className="mb-4 font-bold text-4xl text-white">Loading FunChat</h1>
        <p className="animate-pulse text-white text-xl">
          {loadingMessages[messageIndex]}
        </p>
      </div>
      <div className="mt-16 flex space-x-4">
        {uniqueKeys.map((key, index) => (
          <div
            key={key}
            className="h-4 w-4 animate-bounce rounded-full bg-white"
            style={{ animationDelay: `${index * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
