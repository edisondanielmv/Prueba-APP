import React, { useEffect, useState } from 'react';
import { QuizResult } from '../types';
import { Download, Trash2, ArrowLeft, Users, FileSpreadsheet, ExternalLink } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
  sheetUrl?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, sheetUrl }) => {
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('quiz_results');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Sort by date descending
        setResults(parsed.sort((a: QuizResult, b: QuizResult) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ));
      } catch (e) {
        console.error("Error parsing results", e);
      }
    }
  }, []);

  const handleClear = () => {
    if (confirm('¿Estás seguro de que deseas borrar todos los registros? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('quiz_results');
      setResults([]);
    }
  };

  const handleExport = () => {
    if (results.length === 0) return;

    const headers = ['Fecha', 'Nombre', 'Cédula', 'Puntaje', 'Total', 'Porcentaje', 'Tiempo (seg)'];
    const csvContent = [
      headers.join(','),
      ...results.map(r => {
        const date = new Date(r.date).toLocaleString();
        const percentage = Math.round((r.score / r.totalQuestions) * 100);
        return `"${date}","${r.user.name}","${r.user.idNumber}",${r.score},${r.totalQuestions},${percentage}%,${r.timeSpent}`;
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `resultados_matematicas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const averageScore = results.length 
    ? (results.reduce((acc, curr) => acc + curr.score, 0) / results.length).toFixed(1) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <button 
              onClick={onBack}
              className="text-slate-500 hover:text-primary flex items-center mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Volver al Inicio
            </button>
            <h1 className="text-3xl font-bold text-slate-800">Panel de Resultados</h1>
            <p className="text-slate-500">Registro de evaluaciones realizadas en este dispositivo</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {sheetUrl && (
              <a
                href={sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-700 border border-green-200 hover:bg-green-50 px-4 py-2 rounded-lg flex items-center transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir Google Sheets
              </a>
            )}
            <button
              onClick={handleExport}
              disabled={results.length === 0}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Exportar Excel/CSV
            </button>
            <button
              onClick={handleClear}
              disabled={results.length === 0}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg flex items-center border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Borrar Todo
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Evaluados</p>
                <p className="text-2xl font-bold text-slate-800">{results.length}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Promedio de Aciertos</p>
                <p className="text-2xl font-bold text-slate-800">{averageScore} / 20</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-full">
                <Download className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-700">Fecha</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">Estudiante</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">Cédula</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">Puntaje</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">Tiempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No hay resultados registrados todavía.
                    </td>
                  </tr>
                ) : (
                  results.map((result) => (
                    <tr key={result.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {new Date(result.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {result.user.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-mono">
                        {result.user.idNumber}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          result.score >= 16 ? 'bg-green-100 text-green-800' :
                          result.score >= 12 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {result.score} / {result.totalQuestions}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-center">
                        {Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;