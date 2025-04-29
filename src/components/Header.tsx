import React from 'react';
import { Bot } from 'lucide-react';
import ModuleSwitch from './ModuleSwitch';

interface HeaderProps {
  activeModule: 'db' | 'pdf';
  onModuleChange: (module: 'db' | 'pdf') => void;
}

const Header: React.FC<HeaderProps> = ({ activeModule, onModuleChange }) => {
  return (
    <div className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="bg-indigo-600 p-2 rounded-lg mr-3">
            <Bot size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Otomol AI</h1>
        </div>
        
        <ModuleSwitch 
          activeModule={activeModule} 
          onModuleChange={onModuleChange} 
        />
      </div>
    </div>
  );
};

export default Header;