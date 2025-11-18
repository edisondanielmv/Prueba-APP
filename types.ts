export interface User {
  name: string;
  idNumber: string; // Cédula
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer
  explanation: string;
}

export interface QuizResult {
  id: string;
  user: User;
  score: number;
  totalQuestions: number;
  date: string;
  timeSpent: number;
}

export interface QuizState {
  status: 'welcome' | 'playing' | 'finished' | 'admin';
  user: User | null;
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[]; // Stores user answers index
  timeRemaining: number; // in seconds
}

export const QUIZ_DURATION = 20 * 60; // 20 minutes
