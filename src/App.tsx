import React, { useState } from 'react';

type PageType = 'home' | 'vragenlijst' | 'stappenplan' | 'agenda' | 'fodmap' | 'informatie' | 'shop' | 'login';

const DigesticaApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.63 3.34 1.68 4.58L12 20l5.32-6.42C18.37 12.34 19 10.74 19 9c0-3.87-3.13-7-7-7z"/>
                <path d="M8 9c0-.55.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1H9c-.55 0-1-.45-1-1z"/>
              </svg>
            </div>
            <span 
              className="text-xl font-bold text-blue-900 cursor-pointer" 
              onClick={() => setCurrentPage('home')}
            >
              The Belly Dr.
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {(['home', 'vragenlijst', 'stappenplan', 'agenda', 'fodmap', 'informatie', 'shop'] as PageType[]).map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  currentPage === page ? 'text-blue-900 border-b-2 border-blue-900' : ''
                }`}
              >
                {page === 'fodmap' ? 'FODMAP' : page}
              </button>
            ))}
          </div>

          {/* Login Button */}
          <button
            onClick={() => setCurrentPage('login')}
            className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="text-sm">Login</span>
          </button>
        </div>
      </div>
    </nav>
  );

  // Homepage Component
  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.63 3.34 1.68 4.58L12 20l5.32-6.42C18.37 12.34 19 10.74 19 9c0-3.87-3.13-7-7-7z"/>
                <path d="M8 9c0-.55.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1H9c-.55 0-1-.45-1-1z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-blue-900">The Belly Dr.</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Analyse van Buikklachten</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Beantwoord enkele vragen en ontvang een gepersonaliseerd stappenplan 
            voor het analyseren en behandelen van je buikklachten.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { 
              page: 'vragenlijst', 
              title: 'Vragenlijst', 
              desc: 'Start met een korte vragenlijst voor diagnose-inzichten',
              icon: '📋',
              bgColor: 'bg-blue-50',
              textColor: 'text-blue-700'
            },
            { 
              page: 'fodmap', 
              title: 'FODMAP Gids', 
              desc: 'Complete eliminatie en herintroductie gids',
              icon: '⭐',
              bgColor: 'bg-green-50',
              textColor: 'text-green-700'
            },
            { 
              page: 'agenda', 
              title: 'Klachtenagenda', 
              desc: 'Houd je symptomen en voeding dagelijks bij',
              icon: '📅',
              bgColor: 'bg-purple-50',
              textColor: 'text-purple-700'
            },
            { 
              page: 'stappenplan', 
              title: 'Stappenplan', 
              desc: 'Volg een stappenplan per mogelijke diagnose',
              icon: '✅',
              bgColor: 'bg-orange-50',
              textColor: 'text-orange-700'
            },
            { 
              page: 'informatie', 
              title: 'Informatie', 
              desc: 'Lees meer over verschillende aandoeningen',
              icon: 'ℹ️',
              bgColor: 'bg-indigo-50',
              textColor: 'text-indigo-700'
            },
            { 
              page: 'shop', 
              title: 'Zelftesten', 
              desc: 'Vind geschikte thuistesten en hulpmiddelen',
              icon: '🛒',
              bgColor: 'bg-red-50',
              textColor: 'text-red-700'
            }
          ].map(({ page, title, desc, icon, bgColor, textColor }) => (
            <div 
              key={page}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
              onClick={() => setCurrentPage(page as PageType)}
            >
              <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <span className="text-2xl">{icon}</span>
              </div>
              <h3 className={`text-xl font-semibold ${textColor} mb-3`}>{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="text-blue-900 font-semibold text-lg">Digestica</span>
          </div>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Digestica neemt geen verantwoordelijkheid voor de waarde van resultaten.
            Resultaten dienen als voorbereiding voor overleg met arts of diëtist.
          </p>
        </div>
      </div>
    </div>
  );

  // Placeholder Page Component
  const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">Deze pagina wordt nog gebouwd...</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Terug naar Home
          </button>
        </div>
      </div>
    </div>
  );

  // Page Router
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'vragenlijst':
        return <PlaceholderPage title="Vragenlijst" />;
      case 'stappenplan':
        return <PlaceholderPage title="Stappenplan" />;
      case 'agenda':
        return <PlaceholderPage title="Klachtenagenda" />;
      case 'fodmap':
        return <PlaceholderPage title="FODMAP Gids" />;
      case 'informatie':
        return <PlaceholderPage title="Informatie" />;
      case 'shop':
        return <PlaceholderPage title="Shop" />;
      case 'login':
        return <PlaceholderPage title="Login" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderPage()}
    </div>
  );
};

export default DigesticaApp;