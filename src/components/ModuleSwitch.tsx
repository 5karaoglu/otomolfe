import React from 'react';
import { Database, FileText } from 'lucide-react';

interface ModuleSwitchProps {
  activeModule: 'db' | 'pdf';
  onModuleChange: (module: 'db' | 'pdf') => void;
}

const ModuleSwitch: React.FC<ModuleSwitchProps> = ({ activeModule, onModuleChange }) => {
  return (
    <div className="flex bg-gray-800 p-1 rounded-lg">
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          activeModule === 'db'
            ? 'bg-indigo-600 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => onModuleChange('db')}
      >
        <Database size={16} />
        <span className="text-sm font-medium">Veritabanı</span>
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          activeModule === 'pdf'
            ? 'bg-indigo-600 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => onModuleChange('pdf')}
      >
        <FileText size={16} />
        <span className="text-sm font-medium">PDF</span>
      </button>
    </div>
  );
};

export default ModuleSwitch;