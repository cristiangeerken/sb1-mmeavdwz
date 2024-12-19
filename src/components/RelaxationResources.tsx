import React from 'react';
import { Smile } from 'lucide-react';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import { LoadingSpinner } from './LoadingSpinner';

interface Resource {
  title: string;
  content: string;
  type: string;
}

export function RelaxationResources() {
  const { data: resources = [], isLoading } = useSupabaseQuery<Resource>('relaxation_resources');

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Smile className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">Recursos de Relajación</h2>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-6">
          {resources.map((resource) => (
            <div
              key={resource.title}
              className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-lg mb-2 text-blue-800">{resource.title}</h3>
              <p className="text-gray-700">{resource.content}</p>
            </div>
          ))}
          {resources.length === 0 && (
            <p className="text-center text-gray-500">
              No hay recursos disponibles en este momento
            </p>
          )}
        </div>
      )}
    </div>
  );
}