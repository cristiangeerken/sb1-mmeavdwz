import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Send } from 'lucide-react';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import { LoadingSpinner } from './LoadingSpinner';

interface Experience {
  id: string;
  content: string;
  created_at: string;
}

export function CommunityWall() {
  const { data: experiences = [], isLoading } = useSupabaseQuery<Experience>('experiences', {
    orderBy: { column: 'created_at', ascending: false }
  });
  const [newExperience, setNewExperience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newExperience.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('experiences')
        .insert([{ content: newExperience }]);

      if (!error) {
        setNewExperience('');
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error al enviar experiencia:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">Muro de la Comunidad</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <textarea
            value={newExperience}
            onChange={(e) => setNewExperience(e.target.value)}
            placeholder="Comparte tu experiencia..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            disabled={isSubmitting}
            aria-label="Comparte tu experiencia"
          />
          <button
            type="submit"
            disabled={isSubmitting || !newExperience.trim()}
            className="self-end px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Enviar experiencia"
          >
            <Send size={20} />
          </button>
        </div>
        {submitSuccess && (
          <p className="mt-2 text-green-600">¡Gracias por compartir tu experiencia!</p>
        )}
      </form>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100"
            >
              <p className="text-gray-700">{exp.content}</p>
              <time className="text-sm text-gray-500 mt-2 block">
                {new Date(exp.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          ))}
          {experiences.length === 0 && (
            <p className="text-center text-gray-500">
              Sé el primero en compartir tu experiencia
            </p>
          )}
        </div>
      )}
    </div>
  );
}