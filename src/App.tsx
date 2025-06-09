import React, { useState } from 'react';
import BellyDrQuestionnaire from './components/BellyDrQuestionnaire';
import ReportsMenu from './components/ReportsMenu';
import SpecificDiseaseQuestionnaires from './components/SpecificDiseaseQuestionnaires';

type PageType = 'home' | 'vragenlijst' | 'stappenplan' | 'agenda' | 'fodmap' | 'informatie' | 'shop' | 'login' | 'reports' | 'specific-questionnaires';
const DigesticaApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  // Digestica Logo - Simple interlocked D's
  const DigesticaLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="w-full h-full bg-blue-900 rounded-full flex items-center justify-center">
        <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M6 2C3.79 2 2 3.79 2 6v4c0 2.21 1.79 4 4 4h2c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H6z"/>
          <path d="M18 10c2.21 0 4 1.79 4 4v4c0 2.21-1.79 4-4 4h-2c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h2z"/>
          <path d="M12 8c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2z"/>
        </svg>
      </div>
    </div>
  );

  // Welcome Popup Component
  const WelcomePopup = () => {
    if (!showWelcomePopup) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative">
          <button
            onClick={() => setShowWelcomePopup(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/TheBellyDrLogo.png" 
              alt="The Belly Dr." 
              className="h-32 w-auto"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-blue-900 mb-6 leading-tight">
            🔍 Ontdek eindelijk de<br />oorzaak van uw buikklachten
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Beantwoord enkele vragen en krijg een gepersonaliseerd inzicht in mogelijke oorzaken van uw klachten.
          </p>
          
          <button
            onClick={() => {
              setShowWelcomePopup(false);
              setCurrentPage('vragenlijst');
            }}
            className="w-full bg-blue-900 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:bg-blue-800 transition-colors mb-8"
          >
            🎯 Start Analyse
          </button>
          
          <div className="flex items-center justify-center space-x-2">
            <img 
              src="/digestica-logo.png" 
              alt="Digestica" 
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    );
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* The Belly Dr Logo */}
          <div className="flex items-center">
            <img 
              src="/TheBellyDrLogo.png" 
              alt="The Belly Dr." 
              className="h-24 w-auto cursor-pointer"
              onClick={() => setCurrentPage('home')}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
{(['home', 'vragenlijst', 'specific-questionnaires', 'stappenplan', 'agenda', 'fodmap', 'informatie', 'shop'] as PageType[]).map(page => (              <button 
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
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/TheBellyDrLogo.png" 
              alt="The Belly Dr." 
              className="h-32 w-auto"
            />
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
              desc: 'Start met een uitgebreide vragenlijst voor diagnose-inzichten',
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
            },
            { 
  page: 'specific-questionnaires', 
  title: 'Specifieke Tests', 
  desc: 'Evidence-based vragenlijsten per aandoening',
  icon: '🔬',
  bgColor: 'bg-purple-50',
  textColor: 'text-purple-700'
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

        {/* Professional Disclaimer */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Belangrijke Disclaimer</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p className="font-medium text-gray-800">
              <strong>CentepedeX neemt geen enkele verantwoordelijkheid in de waarde van de resultaten.</strong>
            </p>
            <p>
              De inhoud van deze applicatie is uitsluitend bedoeld als hulpmiddel bij het begrijpen en opvolgen van mogelijke buik- of darmklachten. De weergegeven scores en interpretaties zijn gebaseerd op zelfrapportering en indicatieve vragenlijsten, en kunnen geen medische diagnose vervangen.
            </p>
            <p>
              Gebruik deze informatie enkel als voorbereiding op een gesprek met een arts of diëtist. De app is géén vervanging voor professioneel medisch advies, onderzoek of behandeling.
            </p>
            <p>
              Raadpleeg steeds een erkende zorgverlener bij twijfel, aanhoudende klachten of voor het nemen van beslissingen over je gezondheid.
            </p>
          </div>
        </div>

        {/* Company Footer - Digestica Branding */}
        <div className="text-center pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <img 
              src="/digestica-logo.png" 
              alt="Digestica" 
              className="h-8 w-auto"
            />
          </div>
          <p className="text-xs text-gray-500">
            Een medische app van CentepedeX
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
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
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
        return <BellyDrQuestionnaire onNavigateToReports={() => setCurrentPage('reports')} />;
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
     case 'reports':
        return <ReportsMenu 
          onBack={() => setCurrentPage('home')} 
          currentReport={(() => {
            const saved = localStorage.getItem('current_report');
            return saved ? JSON.parse(saved) : null;
          })()} 
        />;
     case 'specific-questionnaires':
  return <SpecificDiseaseQuestionnaires 
    onNavigateToReports={() => setCurrentPage('reports')}
    onBack={() => setCurrentPage('home')} 
  />;
        case 'login':
    
        return <PlaceholderPage title="Login" />;
      default:
        
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <WelcomePopup />
      {renderPage()}
    </div>
  );
};

export default DigesticaApp;