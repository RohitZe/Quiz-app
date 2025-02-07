import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import { ChevronRight, Award, BookOpen, Check, X } from 'lucide-react';

const QuizCard = forwardRef((props, ref) => {
  const {
    question,
    options = [],
    onAnswer,
    currentIndex,
    totalQuestions,
    isLast,
    solution,
    theme
  } = props;

  const [showSolution, setShowSolution] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  const bind = useGesture({
    onDrag: ({ movement: [x], down }) => {
      if (down) {
        setDragProgress(Math.min(Math.abs(x) / 100, 1));
      }
    },
    onDragEnd: ({ movement: [x] }) => {
      setDragProgress(0);
      if (Math.abs(x) > 100) {
        if (x > 0 && options.length > 0) handleOptionSelect(options[0]);
        if (x < 0 && options.length > 0) handleOptionSelect(options[options.length - 1]);
      }
    },
  });

  const handleOptionSelect = (option) => {
    if (!option) return;
    setSelectedOption(option);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      onAnswer?.(option);
    }, 1000);
  };

  return (
    <motion.div
      ref={ref}
      {...bind()}
      className={`relative w-full max-w-lg rounded-xl shadow-lg p-6 mx-auto cursor-grab active:cursor-grabbing
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      initial={{ opacity: 0, rotateX: -20, y: 50 }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      exit={{ opacity: 0, rotateX: 20, y: -50 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{
        perspective: "1000px",
        transform: `rotate(${dragProgress * (dragProgress > 0 ? 5 : -5)}deg)`
      }}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-t-xl overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4 mt-3">
          <motion.span 
            className="text-sm text-primary font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Question {currentIndex + 1} of {totalQuestions}
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-sm flex items-center gap-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            onClick={() => setShowSolution(!showSolution)}
          >
            <BookOpen className="w-4 h-4" />
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </motion.button>
        </div>
        <motion.h2 
          className="text-xl font-bold mt-2"
          animate={{ scale: dragProgress > 0 ? 1 - dragProgress * 0.05 : 1 }}
        >
          {question}
        </motion.h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {showSolution ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-6 p-4 rounded-lg text-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
          >
            <h3 className="font-semibold mb-2">Solution:</h3>
            <div className="prose prose-sm">{solution}</div>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 rounded-lg border transition-all 
                  ${theme === 'dark'
                    ? 'border-gray-700 hover:border-primary hover:bg-gray-700'
                    : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                  }`}
                onClick={() => handleOptionSelect(option)}
                disabled={showFeedback}
              >
                <div className="flex items-center justify-between">
                  <span>{option.description}</span>
                  <ChevronRight className={`w-5 h-5 transform transition-transform duration-200
                    ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFeedback && selectedOption && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              p-4 rounded-lg shadow-lg ${selectedOption.is_correct ? 'bg-green-500' : 'bg-red-500'} 
              text-white`}
          >
            {selectedOption.is_correct ? (
              <motion.div 
                className="flex items-center gap-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Check className="w-5 h-5" />
                <span>Correct!</span>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center gap-2"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <X className="w-5 h-5" />
                <span>Incorrect</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isLast && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute -top-4 -right-4"
        >
          <Award className="w-8 h-8 text-primary" />
        </motion.div>
      )}
    </motion.div>
  );
});

QuizCard.displayName = 'QuizCard';

export default QuizCard;