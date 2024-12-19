import React, { useState } from 'react';
import { MessageCircle, Smile, Users, Lightbulb } from 'lucide-react';
import { MainButton } from './components/MainButton';
import { ChatBot } from './components/ChatBot';
import { RelaxationResources } from './components/RelaxationResources';
import { CommunityWall } from './components/CommunityWall';
import { HelpfulTips } from './components/HelpfulTips';

type View = 'main' | 'chat' | 'relax' | 'community' | 'tips';

function App() {
  const [currentView, setCurrentView] = useState<View>('main');

  const renderContent = () => {
    switch (currentView) {
      case 'chat':
        return <ChatBot />;
      case 'relax':
        return <RelaxationResources />;
      case 'community':
        return <CommunityWall />;
      case 'tips':
        return <HelpfulTips />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6">
            <MainButton
              icon={MessageCircle}
              label="Chatbot de Ayuda"
              onClick={() => setCurrentView('chat')}
            />
            <MainButton
              icon={Smile}
              label="Recursos de Relajación"
              onClick={() => setCurrentView('relax')}
            />
            <MainButton
              icon={Users}
              label="Muro de la Comunidad"
              onClick={() => setCurrentView('community')}
            />
            <MainButton
              icon={Lightbulb}
              label="Sugerencias Útiles"
              onClick={() => setCurrentView('tips')}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 to-navy-800">
      <header className="bg-orange-100/10 backdrop-blur-sm shadow-lg border-b border-orange-200/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => setCurrentView('main')}
            className="text-2xl font-bold text-orange-300 hover:text-orange-200 transition-colors"
          >
            Valencia Unida
          </button>
          <p className="text-orange-200/80 mt-1">Apoyo Comunitario en Emergencias</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView !== 'main' && (
          <button
            onClick={() => setCurrentView('main')}
            className="mb-6 text-orange-300 hover:text-orange-200 transition-colors flex items-center gap-2"
          >
            ← Volver
          </button>
        )}
        {renderContent()}
      </main>
    </div>
  );
}

export default App;