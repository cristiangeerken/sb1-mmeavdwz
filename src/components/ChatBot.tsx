import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import { LoadingSpinner } from './LoadingSpinner';

interface FAQ {
  question: string;
  answer: string;
}

export function ChatBot() {
  const { data: faqs = [], isLoading } = useSupabaseQuery<FAQ>('faqs');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">Preguntas Frecuentes</h2>
      </div>
      
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-gray-100 pb-4">
              <button
                className="w-full text-left hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setSelectedQuestion(selectedQuestion === faq.question ? null : faq.question)}
                aria-expanded={selectedQuestion === faq.question}
                aria-controls={`answer-${faq.question}`}
              >
                <h3 className="font-medium">{faq.question}</h3>
              </button>
              {selectedQuestion === faq.question && (
                <div
                  id={`answer-${faq.question}`}
                  className="mt-2 text-gray-600 pl-4 border-l-2 border-blue-200 p-2"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          {faqs.length === 0 && (
            <p className="text-center text-gray-500">
              No hay preguntas frecuentes disponibles en este momento
            </p>
          )}
        </div>
      )}
    </div>
  );
}