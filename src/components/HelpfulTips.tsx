import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import { LoadingSpinner } from './LoadingSpinner';

interface Tip {
  title: string;
  content: string;
}

export function HelpfulTips() {
  const { data: tips = [], isLoading } = useSupabaseQuery<Tip>('helpful_tips');

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">Sugerencias Útiles</h2>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-6">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-lg mb-2 text-yellow-800">{tip.title}</h3>
              <p className="text-gray-700">{tip.content}</p>
            </div>
          ))}
          {tips.length === 0 && (
            <p className="text-center text-gray-500">
              No hay sugerencias disponibles en este momento
            </p>
          )}
        </div>
      )}
    </div>
  );
}