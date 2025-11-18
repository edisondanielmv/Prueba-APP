import React, { useState, useCallback, useEffect } from 'react';
import { QuizState, User, QUIZ_DURATION, QuizResult } from './types';
import { questions } from './data/questions';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import AdminDashboard from './components/AdminDashboard';

// ----------------------------------------------------------------------
// CONFIGURACIÓN GOOGLE SHEETS
// ----------------------------------------------------------------------
// URL de la Aplicación Web de Google Apps Script (Backend)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwi9wHOZwQiKWwIA3ELauNyTXOEQI6g8Hhr4i3LKJuoN_wUAMoRbdevalG6MYKB1K2H/exec";

// URL de la Hoja de Cálculo para el Docente (Para botón de acceso rápido)
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1XCgss9YX3_OcLGnf1LADVouwb_0UKOViUHqk9h-sfWE/edit?usp=sharing";
// ----------------------------------------------------------------------

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    status: 'welcome',
    user: null,
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    timeRemaining: QUIZ_DURATION,
  });

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const saveToGoogleSheets = async (result: QuizResult, details: string) => {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn("URL de Google Script no configurada en App.tsx");
      setSaveStatus('error');
      return;
    }
    
    try {
      setSaveStatus('saving');
      // Enviamos el objeto result extendido con el campo details
      const payload = { ...result, details };
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      console.log('Resultado enviado a Google Sheets correctamente');
      setSaveStatus('success');
    } catch (e) {
      console.error('Error enviando a Google Sheets', e);
      setSaveStatus('error');
    }
  };

  const saveResult = useCallback((user: User, score: number, timeSpent: number, answers: (number | null)[]) => {
    const newResult: QuizResult = {
      id: Date.now().toString(),
      user,
      score,
      totalQuestions: questions.length,
      date: new Date().toISOString(),
      timeSpent
    };

    // Generar string de detalles
    const correctIds = questions
      .filter((q, i) => answers[i] === q.correctAnswer)
      .map(q => q.id);
      
    const incorrectIds = questions
      .filter((q, i) => answers[i] !== q.correctAnswer)
      .map(q => q.id);
      
    const details = `Correctas (${correctIds.length}): ${correctIds.join(', ')} | Incorrectas (${incorrectIds.length}): ${incorrectIds.join(', ')}`;

    // 1. Guardar en almacenamiento local (Copia de seguridad en el dispositivo)
    const existingResultsStr = localStorage.getItem('quiz_results');
    const existingResults: QuizResult[] = existingResultsStr ? JSON.parse(existingResultsStr) : [];
    const updatedResults = [...existingResults, newResult];
    localStorage.setItem('quiz_results', JSON.stringify(updatedResults));

    // 2. Enviar a Google Sheets (Nube) con detalles
    saveToGoogleSheets(newResult, details);
  }, []);

  // Effect to trigger save when quiz finishes
  useEffect(() => {
    if (quizState.status === 'finished' && quizState.user && saveStatus === 'idle') {
      const timeSpent = QUIZ_DURATION - quizState.timeRemaining;
      saveResult(quizState.user, quizState.score, timeSpent, quizState.answers);
    }
  }, [quizState.status, quizState.user, quizState.score, quizState.timeRemaining, quizState.answers, saveStatus, saveResult]);

  const startQuiz = (user: User) => {
    setQuizState({
      status: 'playing',
      user,
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      timeRemaining: QUIZ_DURATION,
    });
    setSaveStatus('idle');
  };

  const handleAnswer = (isCorrect: boolean) => {
    setQuizState((prev) => {
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const nextIndex = prev.currentQuestionIndex + 1;
      
      // Store the answer index (re-calculated based on correct logic is a bit circular here since we passed boolean)
      // Since handleAnswer only gets boolean, we need to find what the user likely clicked or change logic.
      // However, to avoid big refactors, we can infer if we want, BUT:
      // The cleanest way without changing QuizScreen too much is to assume we capture the answer index in QuizScreen.
      // Wait, QuizScreen calls onAnswer(isCorrect). 
      // To properly log which questions were wrong, we strictly need the index chosen or just knowing if it was correct/incorrect is enough for "Correctas/Incorrectas" lists?
      // Yes, knowing isCorrect is enough to know IF it was correct. But we don't know WHICH wrong option was picked.
      // The current requirement is just "which are correct and which are incorrect". 
      // So boolean is enough to separate IDs into two lists.
      
      // To reconstruct the 'answers' array in state properly for the report:
      // If isCorrect is true -> we can store the correctAnswer index.
      // If isCorrect is false -> we store -1 (or null) or just track boolean?
      // The 'answers' state in QuizState is (number | null)[].
      // Let's actually just store the result of the check for simplicity in reporting, 
      // OR we need to update QuizScreen to pass the selected index.
      // Given the constraints, I will assume we just need to know pass/fail per question.
      // But wait, saveResult logic uses `answers[i] === q.correctAnswer`.
      // If I only get `isCorrect`, I can't fill `answers` with the user's specific choice easily without changing the interface.
      
      // Let's update `answers` to store the correct answer index if correct, and -1 if incorrect.
      // This satisfies the logic `answers[i] === q.correctAnswer` (if correct) and `answers[i] !== q.correctAnswer` (if -1).
      const simulatedAnswer = isCorrect ? questions[prev.currentQuestionIndex].correctAnswer : -1;

      if (nextIndex >= questions.length) {
        return {
          ...prev,
          score: newScore,
          status: 'finished',
          answers: [...prev.answers, simulatedAnswer]
        };
      }

      return {
        ...prev,
        score: newScore,
        currentQuestionIndex: nextIndex,
        answers: [...prev.answers, simulatedAnswer]
      };
    });
  };

  const handleTick = useCallback(() => {
    setQuizState((prev) => {
      if (prev.status !== 'playing') return prev;
      return {
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1)
      };
    });
  }, []);

  const handleTimeUp = () => {
    setQuizState((prev) => {
      // Fill remaining answers with null/-1
      const remaining = questions.length - prev.answers.length;
      const filledAnswers = [...prev.answers, ...Array(remaining).fill(-1)];
      
      return {
        ...prev,
        status: 'finished',
        answers: filledAnswers
      };
    });
  };

  const handleRestart = () => {
    setQuizState({
      status: 'welcome',
      user: null,
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      timeRemaining: QUIZ_DURATION,
    });
    setSaveStatus('idle');
  };

  const handleAdminAccess = () => {
    setQuizState(prev => ({ ...prev, status: 'admin' }));
  };

  return (
    <div className="font-sans text-slate-900">
      {quizState.status === 'welcome' && (
        <WelcomeScreen onStart={startQuiz} onAdminAccess={handleAdminAccess} />
      )}

      {quizState.status === 'admin' && (
        <AdminDashboard onBack={handleRestart} sheetUrl={GOOGLE_SHEET_URL} />
      )}

      {quizState.status === 'playing' && quizState.user && (
        <QuizScreen
          questions={questions}
          user={quizState.user}
          currentQuestionIndex={quizState.currentQuestionIndex}
          timeRemaining={quizState.timeRemaining}
          onAnswer={handleAnswer}
          onTimeTick={handleTick}
          onTimeUp={handleTimeUp}
        />
      )}

      {quizState.status === 'finished' && quizState.user && (
        <ResultScreen
          score={quizState.score}
          totalQuestions={questions.length}
          user={quizState.user}
          elapsedTime={QUIZ_DURATION - quizState.timeRemaining}
          onRestart={handleRestart}
          saveStatus={saveStatus}
        />
      )}
    </div>
  );
};

export default App;