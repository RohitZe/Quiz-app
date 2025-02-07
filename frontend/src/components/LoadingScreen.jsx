import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [tips] = useState([
    "Get ready for an epic quiz!",
    "Sharpening the questions...",
    "Loading brain power...",
    "Almost there!"
  ]);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 1 : prev);
    }, 50);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    };
  }, [tips.length]);

  // Add keyframes animation using CSS
  const keyframesStyle = `
    @keyframes bounce {
      from { transform: translateY(0); }
      to { transform: translateY(-12px); }
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-8">
      <style>{keyframesStyle}</style>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-center mb-8">
          <p className="text-xl font-bold text-gray-800 mb-2">
            Loading: {progress}%
          </p>
          <p className="text-gray-600 animate-pulse">
            {tips[currentTip]}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-indigo-500 rounded-full"
              style={{
                animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite alternate`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;