import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MainButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function MainButton({ icon: Icon, label, onClick }: MainButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-orange-100/10 backdrop-blur-sm rounded-xl 
                 shadow-lg hover:shadow-xl transition-all duration-200 w-full max-w-xs space-y-4 
                 border border-orange-200/20 hover:border-orange-300/30 hover:bg-orange-200/20
                 group"
    >
      <Icon size={48} className="text-orange-300 group-hover:text-orange-200 transition-colors" />
      <span className="text-lg font-medium text-orange-100">{label}</span>
    </button>
  );
}