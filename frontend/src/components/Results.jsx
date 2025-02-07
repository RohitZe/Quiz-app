import { motion } from 'framer-motion';
import { Award, Trophy, RefreshCw, Star } from 'lucide-react';

const Results = ({ score, totalQuestions, onRestart, maxScore, theme }) => {
  const percentage = (score / maxScore) * 100;

  const celebrationStars = Array(6).fill(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-full max-w-lg mx-auto rounded-xl shadow-lg p-8 text-center overflow-hidden
        ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm`}
    >
      {percentage >= 80 && celebrationStars.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -100],
            x: [0, (index - 2.5) * 30]
          }}
          transition={{
            duration: 2,
            delay: index * 0.2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="absolute top-1/2 left-1/2"
        >
          <Star className="w-6 h-6 text-yellow-400" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          damping: 10,
          stiffness: 100
        }}
        className="mb-6"
      >
        {percentage >= 80 ? (
          <Trophy className="w-20 h-20 mx-auto text-yellow-500 drop-shadow-lg" />
        ) : (
          <Award className="w-20 h-20 mx-auto text-primary drop-shadow-lg" />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.5,
            type: "spring",
            stiffness: 200
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl" />
          <div className="text-4xl font-bold text-primary mb-2 relative">
            {score}/{maxScore}
          </div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-2 bg-primary rounded-full mx-auto max-w-[200px] mb-6"
          />
        </motion.div>

        <div className={`mb-8 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>Total Questions: {totalQuestions}</p>
          <p className="text-lg font-semibold">
            Score: {percentage.toFixed(1)}%
          </p>
          <p className="text-sm">
            {percentage >= 80 ? "Outstanding performance! 🎉" : 
             percentage >= 60 ? "Good effort! Keep going! 💪" : 
             "Practice makes perfect! 📚"}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center justify-center gap-2 mx-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          onClick={onRestart}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCw className="w-5 h-5 transform group-hover:rotate-180 transition-transform" />
          </motion.span>
          Try Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Results;