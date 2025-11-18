import React, { useState, useEffect } from 'react';
import { Question, User } from '../types';
import { Clock, CheckCircle, XCircle, ArrowRight, User as UserIcon } from 'lucide-react';

interface QuizScreenProps {
  questions: Question[];
  user: User;
  timeRemaining: number;
  onAnswer: (isCorrect: boolean) => void;
  onTimeTick: () => void;
  onTimeUp: () => void;
  currentQuestionIndex: number;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  user,
  timeRemaining,
  onAnswer,
  onTimeTick,
  onTimeUp,
  currentQuestionIndex
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Reset local state when question changes
    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      onTimeTick();
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeTick, onTimeUp]);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    onAnswer(isCorrect);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-slate-600 text-sm font-medium">
              <UserIcon className="w-4 h-4 mr-2 text-primary" />
              <span className="hidden sm:inline">{user.name}</span>
              <span className="sm:hidden">{user.name.split(' ')[0]}</span>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center text-slate-600 font-mono font-bold">
              <Clock className={`w-4 h-4 mr-2 ${timeRemaining < 60 ? 'text-red-500 animate-pulse' : 'text-primary'}`} />
              <span className={timeRemaining < 60 ? 'text-red-500' : ''}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
          <div className="text-sm font-semibold text-slate-500">
            Pregunta {currentQuestionIndex + 1} <span className="font-normal text-slate-400">/ {questions.length}</span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col justify-center">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
          <div className="p-6 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonStyle = "border-slate-200 hover:border-primary hover:bg-blue-50/50 text-slate-700";
                
                if (isAnswered) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonStyle = "border-green-500 bg-green-50 text-green-800 ring-1 ring-green-500";
                  } else if (index === selectedOption) {
                    buttonStyle = "border-red-500 bg-red-50 text-red-800 ring-1 ring-red-500";
                  } else {
                    buttonStyle = "border-slate-100 text-slate-400 opacity-50 cursor-not-allowed";
                  }
                } else if (selectedOption === index) {
                    buttonStyle = "border-primary bg-blue-50 text-primary ring-1 ring-primary";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 font-medium flex justify-between items-center group ${buttonStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                    {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Section */}
          {isAnswered && (
            <div className={`px-6 py-4 md:px-10 border-t ${selectedOption === currentQuestion.correctAnswer ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className={`font-bold mb-1 ${selectedOption === currentQuestion.correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
                    {selectedOption === currentQuestion.correctAnswer ? '¡Correcto!' : 'Incorrecto'}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="bg-secondary hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center shrink-0"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizScreen;