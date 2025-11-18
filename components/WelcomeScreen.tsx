import React, { useState } from 'react';
import { User } from '../types';
import { BookOpen, ChevronRight, AlertCircle, ShieldCheck, Lock, X } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (user: User) => void;
  onAdminAccess: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onAdminAccess }) => {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  
  // Admin Login States
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !idNumber.trim()) {
      setError('Por favor complete todos los campos requeridos.');
      return;
    }
    onStart({ name, idNumber });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      onAdminAccess();
      setShowLoginModal(false);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta.');
    }
  };

  const closeAdminModal = () => {
    setShowLoginModal(false);
    setPassword('');
    setLoginError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-200 p-4 relative">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="bg-primary p-8 text-center">
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Evaluación Matemática</h1>
          <p className="text-blue-100 mt-2">Álgebra, Funciones y Ecuaciones</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border-2 border-blue-100 bg-blue-50/50 text-slate-800 focus:bg-white focus:border-primary focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder-slate-400"
                placeholder="Ej. Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="idNumber" className="block text-sm font-bold text-slate-700 mb-1">
                Cédula de Identidad / ID
              </label>
              <input
                type="text"
                id="idNumber"
                className="w-full px-4 py-3 rounded-lg border-2 border-blue-100 bg-blue-50/50 text-slate-800 focus:bg-white focus:border-primary focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder-slate-400"
                placeholder="Ej. 0912345678"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-primary mb-2">Instrucciones:</h3>
              <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                <li>La prueba consta de 20 preguntas.</li>
                <li>Cada respuesta correcta vale 1 punto.</li>
                <li>Tiempo límite: 20 minutos.</li>
                <li>No podrás volver a preguntas anteriores.</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Comenzar Evaluación
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
      
      {/* Admin Button */}
      <button 
        onClick={() => setShowLoginModal(true)}
        className="absolute bottom-4 right-4 text-slate-500 hover:text-slate-800 text-xs flex items-center opacity-70 hover:opacity-100 transition-opacity"
      >
        <ShieldCheck className="w-4 h-4 mr-1" />
        Soy Docente
      </button>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-slate-800 p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Acceso Docente
              </h3>
              <button 
                onClick={closeAdminModal}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAdminLogin} className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                Ingresa la contraseña para acceder al panel de control y ver la hoja de resultados.
              </p>
              
              {loginError && (
                <div className="mb-4 bg-red-50 text-red-600 text-xs p-3 rounded-lg flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  {loginError}
                </div>
              )}

              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Contraseña"
                  autoFocus
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={closeAdminModal}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;