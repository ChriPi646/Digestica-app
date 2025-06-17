import React, { useState, useEffect } from 'react';
import { Calendar, Plus, TrendingUp, Download, AlertTriangle, Utensils, Activity, Clock, ChevronLeft, Eye, Trash2 } from 'lucide-react';

interface SymptomEntry {
  id: string;
  date: string;
  timestamp: number;
  symptoms: {
    abdominalpain: number;
    bloating: number;
    gas: number;
    nausea: number;
    diarrhea: number;
    constipation: number;
    fatigue: number;
  };
  stoolType: number; // Bristol Stool Scale 1-7
  stoolFrequency: number;
  foods: string[];
  mood: number; // 1-5 scale
  stress: number; // 1-5 scale
  sleep: number; // hours
  notes: string;
}

interface SymptomTrackerProps {
  onBack?: () => void;
}

const SymptomTracker: React.FC<SymptomTrackerProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [currentView, setCurrentView] = useState<'calendar' | 'add' | 'trends' | 'export'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedEntry, setSelectedEntry] = useState<SymptomEntry | null>(null);
  const [formData, setFormData] = useState<Partial<SymptomEntry>>({
    symptoms: {
      abdominalpain: 0,
      bloating: 0,
      gas: 0,
      nausea: 0,
      diarrhea: 0,
      constipation: 0,
      fatigue: 0,
    },
    stoolType: 4,
    stoolFrequency: 1,
    foods: [],
    mood: 3,
    stress: 3,
    sleep: 8,
    notes: ''
  });

  // Load entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('belly_dr_symptoms');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save entries to localStorage
  const saveEntries = (newEntries: SymptomEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('belly_dr_symptoms', JSON.stringify(newEntries));
  };

  const symptomLabels = {
    abdominalpain: 'Buikpijn',
    bloating: 'Opgeblazen gevoel',
    gas: 'Winderigheid',
    nausea: 'Misselijkheid',
    diarrhea: 'Diarree',
    constipation: 'Constipatie',
    fatigue: 'Vermoeidheid'
  };

  const bristolScale = [
    { type: 1, description: 'Aparte harde keutels (ernstige constipatie)' },
    { type: 2, description: 'Worstvormig, klonterig (lichte constipatie)' },
    { type: 3, description: 'Worstyorm met barsten (normaal)' },
    { type: 4, description: 'Glad en zacht (ideaal)' },
    { type: 5, description: 'Zachte brokjes (diarree tendens)' },
    { type: 6, description: 'Vlockige stukjes (lichte diarree)' },
    { type: 7, description: 'Waterig (ernstige diarree)' }
  ];

  const saveEntry = () => {
    const entry: SymptomEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      timestamp: Date.now(),
      symptoms: formData.symptoms!,
      stoolType: formData.stoolType!,
      stoolFrequency: formData.stoolFrequency!,
      foods: formData.foods!,
      mood: formData.mood!,
      stress: formData.stress!,
      sleep: formData.sleep!,
      notes: formData.notes!
    };

    const filteredEntries = entries.filter(e => e.date !== selectedDate);
    const newEntries = [...filteredEntries, entry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    saveEntries(newEntries);
    setCurrentView('calendar');

    // Reset form
    setFormData({
      symptoms: {
        abdominalpain: 0,
        bloating: 0,
        gas: 0,
        nausea: 0,
        diarrhea: 0,
        constipation: 0,
        fatigue: 0,
      },
      stoolType: 4,
      stoolFrequency: 1,
      foods: [],
      mood: 3,
      stress: 3,
      sleep: 8,
      notes: ''
    });
  };

  const deleteEntry = (entryId: string) => {
    const newEntries = entries.filter(e => e.id !== entryId);
    saveEntries(newEntries);
  };

  const getDateEntries = (date: string) => {
    return entries.filter(entry => entry.date === date);
  };

  const getSymptomAverage = (symptom: keyof SymptomEntry['symptoms'], days: number = 7) => {
    const recentEntries = entries.slice(0, days);
    if (recentEntries.length === 0) return 0;
    const total = recentEntries.reduce((sum, entry) => sum + entry.symptoms[symptom], 0);
    return Math.round((total / recentEntries.length) * 10) / 10;
  };

  const addFood = (food: string) => {
    if (food.trim() && !formData.foods?.includes(food.trim())) {
      setFormData(prev => ({
        ...prev,
        foods: [...(prev.foods || []), food.trim()]
      }));
    }
  };

  const removeFood = (index: number) => {
    setFormData(prev => ({
      ...prev,
      foods: prev.foods?.filter((_, i) => i !== index) || []
    }));
  };

  // Navigatie Component
  const Navigation = () => (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft size={20} />
                <span>Terug</span>
              </button>
            )}
            <h1 className="text-2xl font-bold text-blue-900">📅 Symptoom Agenda</h1>
          </div>
          <div className="flex items-center space-x-4">
            {['calendar', 'add', 'trends', 'export'].map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === view
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-600 hover:text-blue-900 hover:bg-blue-50'
                }`}
              >
                {view === 'calendar' && '📅 Overzicht'}
                {view === 'add' && '➕ Toevoegen'}
                {view === 'trends' && '📊 Trends'}
                {view === 'export' && '📤 Exporteren'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Calendar View
  const CalendarView = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const dates = [];
    const currentDate = new Date(startDate);
    for (let i = 0; i < 42; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {today.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {dates.map((date, index) => {
              const dateStr = date.toISOString().split('T')[0];
              const dayEntries = getDateEntries(dateStr);
              const isCurrentMonth = date.getMonth() === currentMonth;
              const isToday = date.toDateString() === today.toDateString();
              const avgSymptoms = dayEntries.length > 0
                ? Object.values(dayEntries[0].symptoms).reduce((a, b) => a + b, 0) / 7
                : 0;

              const getIntensityColor = (avg: number) => {
                if (avg === 0) return 'bg-gray-100';
                if (avg <= 1) return 'bg-green-200';
                if (avg <= 2) return 'bg-yellow-200';
                if (avg <= 3) return 'bg-orange-200';
                return 'bg-red-200';
              };

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedDate(dateStr);
                    if (dayEntries.length > 0) {
                      setSelectedEntry(dayEntries[0]);
                    }
                  }}
                  className={`relative p-3 h-20 border rounded-lg cursor-pointer transition-colors ${
                    isCurrentMonth
                      ? `${getIntensityColor(avgSymptoms)} hover:ring-2 hover:ring-blue-300`
                      : 'bg-gray-50 text-gray-400'
                  } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <div className="text-sm font-medium">{date.getDate()}</div>
                  {dayEntries.length > 0 && (
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className="text-xs text-gray-600">
                        {dayEntries.length} invoer
                      </div>
                      <div className="flex space-x-1">
                        {Object.values(dayEntries[0].symptoms).slice(0, 3).map((symptom, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              symptom === 0 ? 'bg-gray-300' :
                              symptom <= 2 ? 'bg-yellow-400' :
                              symptom <= 4 ? 'bg-orange-400' : 'bg-red-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recente Invoer */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recente Invoer</h3>
          <div className="space-y-4">
            {entries.slice(0, 5).map((entry) => {
              const avgSymptoms = Object.values(entry.symptoms).reduce((a, b) => a + b, 0) / 7;
              return (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{new Date(entry.date).toLocaleDateString('nl-NL')}</div>
                      <div className="text-sm text-gray-600">
                        Gem. symptoom: {avgSymptoms.toFixed(1)}/5 • {entry.foods.length} voedingsmiddelen
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedEntry(entry)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Bekijken"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Verwijderen"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Invoer Detail Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  Invoer van {new Date(selectedEntry.date).toLocaleDateString('nl-NL')}
                </h3>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Symptomen (0-5)</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedEntry.symptoms).map(([symptom, value]) => (
                      <div key={symptom} className="flex justify-between">
                        <span>{symptomLabels[symptom as keyof typeof symptomLabels]}</span>
                        <span className={`font-bold ${
                          value === 0 ? 'text-green-600' :
                          value <= 2 ? 'text-yellow-600' :
                          value <= 4 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Overige Gegevens</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Ontlasting type:</strong> {selectedEntry.stoolType} ({bristolScale[selectedEntry.stoolType - 1]?.description})</p>
                    <p><strong>Frequentie:</strong> {selectedEntry.stoolFrequency}x</p>
                    <p><strong>Humeur:</strong> {selectedEntry.mood}/5</p>
                    <p><strong>Stress:</strong> {selectedEntry.stress}/5</p>
                    <p><strong>Slaap:</strong> {selectedEntry.sleep} uur</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Voedingsmiddelen</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.foods.map((food, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
              {selectedEntry.notes && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Notities</h4>
                  <p className="text-gray-700 text-sm">{selectedEntry.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Invoer Toevoegen View
  const AddEntryView = () => {
    const [newFood, setNewFood] = useState('');

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Invoer toevoegen voor {new Date(selectedDate).toLocaleDateString('nl-NL')}
          </h2>
          <div className="space-y-8">
            {/* Datum Selectie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Datum</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Symptomen */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Symptomen (0 = geen, 5 = ernstig)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(symptomLabels).map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <div className="flex items-center space-x-2">
                      {[0, 1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            symptoms: { ...prev.symptoms!, [key]: value }
                          }))}
                          className={`w-10 h-10 rounded-full font-semibold ${
                            formData.symptoms?.[key as keyof typeof formData.symptoms] === value
                              ? value === 0 ? 'bg-green-500 text-white' :
                                value <= 2 ? 'bg-yellow-500 text-white' :
                                value <= 4 ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ontlasting Informatie */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ontlasting</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bristol Stool Scale</label>
                  <select
                    value={formData.stoolType}
                    onChange={(e) => setFormData(prev => ({ ...prev, stoolType: parseInt(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {bristolScale.map((scale) => (
                      <option key={scale.type} value={scale.type}>
                        Type {scale.type}: {scale.description}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequentie (keer per dag)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.stoolFrequency}
                    onChange={(e) => setFormData(prev => ({ ...prev, stoolFrequency: parseInt(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Voedingsmiddelen */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Voedingsmiddelen</h3>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newFood}
                  onChange={(e) => setNewFood(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addFood(newFood);
                      setNewFood('');
                    }
                  }}
                  placeholder="Voedingsmiddel toevoegen..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    addFood(newFood);
                    setNewFood('');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.foods?.map((food, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {food}
                    <button
                      type="button"
                      onClick={() => removeFood(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Overige Factoren */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Overige Factoren</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Humeur (1-5)</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.mood}
                    onChange={(e) => setFormData(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{formData.mood}/5</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stress (1-5)</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.stress}
                    onChange={(e) => setFormData(prev => ({ ...prev, stress: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{formData.stress}/5</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slaap (uren)</label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={formData.sleep}
                    onChange={(e) => setFormData(prev => ({ ...prev, sleep: parseFloat(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Notities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notities (optioneel)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Aanvullende opmerkingen..."
              />
            </div>

            {/* Opslaan Knop */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setCurrentView('calendar')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Annuleren
              </button>
              <button
                type="button"
                onClick={saveEntry}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Invoer Opslaan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Trends View
  const TrendsView = () => {
    const last30Days = entries.slice(0, 30);

    // Debug: Check if we have data
    const hasData = entries.length > 0;
    
    // Create mock data for demonstration if no real data exists
    const getMockData = () => {
      const mockEntries = [];
      for (let i = 13; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        mockEntries.push({
          date: date.toISOString().split('T')[0],
          symptoms: {
            abdominalpain: Math.floor(Math.random() * 6),
            bloating: Math.floor(Math.random() * 6),
            gas: Math.floor(Math.random() * 6),
            nausea: Math.floor(Math.random() * 6),
            diarrhea: Math.floor(Math.random() * 6),
            constipation: Math.floor(Math.random() * 6),
            fatigue: Math.floor(Math.random() * 6),
          }
        });
      }
      return mockEntries;
    };

    return (
      <div className="max-w-6xl mx-auto p-6">
        {!hasData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 font-medium">Geen data beschikbaar</span>
            </div>
            <p className="text-yellow-700 text-sm mt-1">
              Voeg eerst enkele symptoom invoeren toe via "➕ Toevoegen" om trends te zien.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Snelle Statistieken */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 7-Dagen Gemiddelden</h3>
            <div className="space-y-3">
              {Object.entries(symptomLabels).map(([key, label]) => {
                const avg = getSymptomAverage(key as keyof SymptomEntry['symptoms']);
                return (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{label}</span>
                    <span className={`font-bold ${
                      avg === 0 ? 'text-green-600' :
                      avg <= 2 ? 'text-yellow-600' :
                      avg <= 3 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {avg.toFixed(1)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Meest Voorkomende Voeding</h3>
            <div className="space-y-2">
              {(() => {
                const foodCounts: { [food: string]: number } = {};
                last30Days.forEach(entry => {
                  entry.foods.forEach(food => {
                    foodCounts[food] = (foodCounts[food] || 0) + 1;
                  });
                });
                
                const foodEntries = Object.entries(foodCounts);
                if (foodEntries.length === 0) {
                  return (
                    <div className="text-sm text-gray-500 italic">
                      Nog geen voedingsgegevens beschikbaar
                    </div>
                  );
                }
                
                return foodEntries
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 8)
                  .map(([food, count]) => (
                    <div key={food} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{food}</span>
                      <span className="font-bold text-blue-600">{count}x</span>
                    </div>
                  ));
              })()}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Inzichten</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">Grootste Probleem</div>
                <div className="text-blue-600">
                  {(() => {
                    const avgSymptoms = Object.entries(symptomLabels).map(([key, label]) => ({
                      symptom: label,
                      avg: getSymptomAverage(key as keyof SymptomEntry['symptoms'])
                    }));
                    const highest = avgSymptoms.reduce((prev, current) => prev.avg > current.avg ? prev : current);
                    return highest.avg > 0 ? `${highest.symptom} (${highest.avg.toFixed(1)}/5)` : 'Geen data beschikbaar';
                  })()}
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800">Invoer deze maand</div>
                <div className="text-green-600">{entries.length} dagen geregistreerd</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wekelijkse Vergelijking Grafiek */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Symptoom Trends (Laatste 14 Dagen)</h3>
          {hasData ? (
            <div className="space-y-6">
              {Object.entries(symptomLabels).map(([key, label]) => {
                const last14Days = entries.slice(0, 14).reverse();
                const dataToShow = last14Days.length > 0 ? last14Days : [];
                
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-700">{label}</span>
                      <span className="text-sm text-gray-500">
                        Gem: {getSymptomAverage(key as keyof SymptomEntry['symptoms'], 14).toFixed(1)}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="flex items-end justify-between h-20 bg-gray-50 rounded-lg p-3 border">
                        {dataToShow.length > 0 ? dataToShow.map((entry, index) => {
                          const value = entry.symptoms[key as keyof SymptomEntry['symptoms']];
                          const height = Math.max((value / 5) * 100, 5); // Minimum height for visibility
                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center group"
                              style={{ width: `${100 / Math.max(dataToShow.length, 14)}%` }}
                            >
                              <div
                                className={`w-full max-w-6 rounded-t transition-all duration-200 group-hover:opacity-80 ${
                                  value === 0 ? 'bg-green-400' :
                                  value <= 2 ? 'bg-yellow-400' :
                                  value <= 4 ? 'bg-orange-400' : 'bg-red-400'
                                }`}
                                style={{ height: `${height}%`, minHeight: '8px' }}
                                title={`${new Date(entry.date).toLocaleDateString('nl-NL')}: ${value}/5`}
                              />
                              <div className="text-xs text-gray-500 mt-1 transform rotate-45 origin-bottom-left">
                                {new Date(entry.date).getDate()}
                              </div>
                            </div>
                          );
                        }) : (
                          // Show empty state
                          Array.from({ length: 14 }, (_, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center"
                              style={{ width: `${100 / 14}%` }}
                            >
                              <div className="w-full max-w-6 h-2 bg-gray-200 rounded-t" />
                              <div className="text-xs text-gray-400 mt-1">-</div>
                            </div>
                          ))
                        )}
                      </div>
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-20 flex flex-col justify-between text-xs text-gray-400 -ml-6">
                        <span>5</span>
                        <span>3</span>
                        <span>1</span>
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Demo data for when no real data exists
            <div className="space-y-6">
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <h4 className="text-lg font-medium text-gray-600 mb-2">Nog geen data beschikbaar</h4>
                <p className="text-gray-500 mb-4">Voeg symptoom invoeren toe om trends te bekijken</p>
                <button
                  onClick={() => setCurrentView('add')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ➕ Eerste Invoer Toevoegen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Export View
  const ExportView = () => {
    const exportData = () => {
      const csvContent = [
        ['Datum', 'Buikpijn', 'Opgeblazen', 'Gas', 'Misselijkheid', 'Diarree', 'Constipatie', 'Vermoeidheid', 'Bristol Type', 'Frequentie', 'Humeur', 'Stress', 'Slaap', 'Voedingsmiddelen', 'Notities'],
        ...entries.map(entry => [
          entry.date,
          entry.symptoms.abdominalpain,
          entry.symptoms.bloating,
          entry.symptoms.gas,
          entry.symptoms.nausea,
          entry.symptoms.diarrhea,
          entry.symptoms.constipation,
          entry.symptoms.fatigue,
          entry.stoolType,
          entry.stoolFrequency,
          entry.mood,
          entry.stress,
          entry.sleep,
          `"${entry.foods.join('; ')}"`,
          `"${entry.notes}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `belly-dr-symptomen-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    };

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📤 Gegevens Exporteren</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Overzicht</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Totaal invoer:</span> {entries.length}
                </div>
                <div>
                  <span className="font-medium">Periode:</span> {
                    entries.length > 0
                      ? `${new Date(entries[entries.length - 1].date).toLocaleDateString('nl-NL')} - ${new Date(entries[0].date).toLocaleDateString('nl-NL')}`
                      : 'Geen gegevens'
                  }
                </div>
                <div>
                  <span className="font-medium">Gegevensgrootte:</span> ~{Math.round(JSON.stringify(entries).length / 1024)}KB
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={exportData}
                disabled={entries.length === 0}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={20} />
                <span>Download CSV Bestand</span>
              </button>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">📋 Voor uw Zorgverlener</h4>
                <p className="text-yellow-700 text-sm mb-3">
                  Het CSV bestand bevat al uw symptoom- en voedingsgegevens in een format dat uw arts kan gebruiken.
                </p>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Volledig symptoomoverzicht per dag</li>
                  <li>• Bristol Ontlasting Schaal gegevens</li>
                  <li>• Voedingsmiddelen en triggers</li>
                  <li>• Stress en slaappatronen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {currentView === 'calendar' && <CalendarView />}
      {currentView === 'add' && <AddEntryView />}
      {currentView === 'trends' && <TrendsView />}
      {currentView === 'export' && <ExportView />}
    </div>
  );
};

export default SymptomTracker;