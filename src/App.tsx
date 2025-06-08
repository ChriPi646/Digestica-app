import React, { useState } from 'react';

type PageType = 'home' | 'vragenlijst' | 'stappenplan' | 'agenda' | 'fodmap' | 'informatie' | 'shop' | 'login';

const DigesticaApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // The Belly Dr. Logo (Darm icon)
  const BellyDrLogo: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7 2C5.9 2 5 2.9 5 4v2c0 1.1.9 2 2 2h1v2c0 1.1.9 2 2 2h0c1.1 0 2-.9 2-2V8h1c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H7z"/>
      <path d="M6 10v3c0 2.2 1.8 4 4 4s4-1.8 4-4v-3h-2v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3H6z"/>
      <path d="M8 18v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-.6-.4-1-1-1s-1 .4-1 1z"/>
      <circle cx="4" cy="12" r="1"/>
      <circle cx="20" cy="12" r="1"/>
      <circle cx="12" cy="21" r="1"/>
    </svg>
  );

  // Digestica Logo (2 D's interlocked)
  const DigesticaLogo: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6 2C3.79 2 2 3.79 2 6v4c0 2.21 1.79 4 4 4h2c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H6z"/>
      <path d="M18 10c2.21 0 4 1.79 4 4v4c0 2.21-1.79 4-4 4h-2c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h2z"/>
      <path d="M12 8c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2z"/>
    </svg>
  );

  // Updated Navigation with correct branding
  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* The Belly Dr. - Main App Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <BellyDrLogo size={24} className="text-white" />
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

  // Updated Homepage with correct branding
  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-900 rounded-full flex items-center justify-center">
              <BellyDrLogo size={40} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900">The Belly Dr.</h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Analyse van Buikklachten</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
            Beantwoord enkele vragen en ontvang een gepersonaliseerd stappenplan 
            voor het analyseren en behandelen van je buikklachten.
          </p>
        </div>

        {/* Mobile-First Action Buttons */}
        <div className="space-y-4 mb-8 md:hidden">
          <button
            onClick={() => setCurrentPage('vragenlijst')}
            className="w-full bg-blue-900 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Complete vragenlijst
          </button>
          <button
            onClick={() => setCurrentPage('vragenlijst')}
            className="w-full bg-blue-700 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Gerichte vragenlijst
          </button>
          <button
            onClick={() => setCurrentPage('shop')}
            className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-blue-400 transition-colors"
          >
            Zelftest
          </button>
        </div>

        {/* Desktop Feature Cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

        {/* Mobile Feature List */}
        <div className="md:hidden space-y-3 mb-8">
          <div className="text-sm text-gray-600 mb-3">Andere opties:</div>
          {[
            { page: 'agenda', title: 'Klachten-dagboek', icon: '📅' },
            { page: 'fodmap', title: 'Dieet informatie', icon: '🍎' },
            { page: 'informatie', title: 'Medische info', icon: 'ℹ️' }
          ].map(({ page, title, icon }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page as PageType)}
              className="w-full flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-xl">{icon}</span>
              <span className="text-gray-700">{title}</span>
            </button>
          ))}
        </div>

        {/* Company Footer - Digestica Branding */}
        <div className="text-center mt-12 md:mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
              <DigesticaLogo size={12} className="text-white" />
            </div>
            <span className="text-blue-900 font-medium text-sm">Digestica</span>
          </div>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Digestica neemt geen verantwoordelijkheid voor de waarde van resultaten.
            Resultaten dienen als voorbereiding voor overleg met arts of diëtist.
          </p>
        </div>
      </div>
    </div>
  );

  // Updated Placeholder with mobile-first design
  const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">Deze pagina wordt nog gebouwd...</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full md:w-auto bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
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