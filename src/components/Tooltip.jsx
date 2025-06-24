import React from 'react';
import { HelpCircle } from 'lucide-react';

export function Tooltip({ text }) {
  return (
    <div className="relative flex items-center group ml-2">
      <HelpCircle size={16} className="text-slate-500 cursor-help" />
      <div className="absolute left-full ml-3 p-2 w-max max-w-xs bg-slate-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        {text}
      </div>
    </div>
  );
}