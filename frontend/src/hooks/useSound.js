import { useCallback } from 'react';
import complete from '../assets/audio/complete.mp3';
import correct from '../assets/audio/correct.mp3';
import wrongans from '../assets/audio/wrongans.mp3';

export const useSound = () => {
  const playAudio = useCallback((audioFile) => {
    const audio = new Audio(audioFile);
    audio.play().catch(error => console.error('Audio playback failed:', error));
  }, []);

  const playCorrect = useCallback(() => {
    playAudio(correct);
  }, [playAudio]);

  const playIncorrect = useCallback(() => {
    playAudio(wrongans);
  }, [playAudio]);

  const playComplete = useCallback(() => {
    playAudio(complete);
  }, [playAudio]);

  return { playCorrect, playIncorrect, playComplete };
};