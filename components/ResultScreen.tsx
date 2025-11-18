import React from 'react';
import { User } from '../types';
import { Trophy, Clock, Share2, RefreshCw, Check, X, CloudUpload, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  user: User;
  elapsedTime: number; // seconds used
  onRestart: () => void;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  user,
  elapsedTime,
  onRestart,
  saveStatus
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleShare = () => {
    const text = `¡He completado la Evaluación de Matemáticas!\nAlumno: ${user.name}\nPuntaje: ${score}/${totalQuestions} (${percentage}%)\nTiempo: ${formatTime(elapsedTime)}`;
    if (navigator.share) {
      navigator.share({
        title: 'Resultado de Evaluación',
        text: text,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      alert('¡Resultado copiado al portapapeles!');
    }
  };

  let gradeColor = 'text-red-500';
  let gradeMessage = 'Necesitas reforzar conocimientos';
  if (percentage >= 80) {
    gradeColor = 'text-green-500';
    gradeMessage = '¡Excelente trabajo!';
  } else if (percentage >= 60) {
    gradeColor = 'text-yellow-600';
    gradeMessage = 'Buen trabajo, pero puedes mejorar';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-secondary p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-30"></div>
          <div className="relative z-10">
            <div className="mx-auto bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm ring-4 ring-white/20">
              <Trophy className="w-10 h-10 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Evaluación Finalizada</h2>
            <p className="text-slate-300">{user.name} - {user.idNumber}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <span className={`text-5xl font-black block mb-2 ${gradeColor}`}>
              {score}<span className="text-2xl text-slate-400 font-medium">/{totalQuestions}</span>
            </span>
            <p className="font-medium text-slate-600">{gradeMessage}</p>
          </div>

          {/* Status de Guardado */}
          <div className="mb-6 flex justify-center">
            {saveStatus === 'saving' && (
              <div className="flex items-center text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1.5 rounded-full animate-pulse">
                <CloudUpload className="w-4 h-4 mr-2" />
                Guardando resultado en la nube...
              </div>
            )}
            {saveStatus === 'success' && (
              <div className="flex items-center text-green-600 text-sm font-medium bg-green-50 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Resultado guardado correctamente
              </div>
            )}
            {saveStatus === 'error' && (
              <div className="flex items-center text-red-600 text-sm font-medium bg-red-50 px-3 py-1.5 rounded-full">
                <AlertCircle className="w-4 h-4 mr-2" />
                No se pudo guardar en la nube
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="flex items-center justify-center text-green-600 mb-1">
                <Check className="w-5 h-5 mr-1" /> Correctas
              </div>
              <span className="text-xl font-bold text-slate-800">{score}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="flex items-center justify-center text-red-500 mb-1">
                <X className="w-5 h-5 mr-1" /> Incorrectas
              </div>
              <span className="text-xl font-bold text-slate-800">{totalQuestions - score}</span>
            </div>
          </div>

          <div className="flex items-center justify-center text-slate-500 mb-8 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            Tiempo utilizado: {formatTime(elapsedTime)}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleShare}
              className="w-full bg-primary hover:bg-sky-600 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-sky-200"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartir Resultado
            </button>
            <button
              onClick={onRestart}
              className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;