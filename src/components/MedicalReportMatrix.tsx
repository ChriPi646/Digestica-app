import React from 'react';
import { FileText, Download, Clock, AlertTriangle, User, Pill } from 'lucide-react';

interface MedicalReportProps {
  answers: { [questionId: number]: string | string[] };
  scores: {
    ibs: number;
    sibo: number;
    celiac: number;
    lactose: number;
    ibd: number;
    dyspepsia: number;
    gastritis: number;
  };
  patientData?: {
    initials?: string;
    age?: string;
    gender?: string;
    referenceNumber?: string;
  };
}

const MedicalReportMatrix: React.FC<MedicalReportProps> = ({ answers, scores, patientData }) => {
  
  // Map question IDs to readable questions (abbreviated for medical context)
  const questionMap: { [key: number]: string } = {
    1: "Leeftijd",
    2: "Duur klachten", 
    3: "Eerdere diagnoses",
    4: "Huidige medicatie",
    5: "Familie anamnese",
    6: "Lokalisatie buikpijn",
    7: "Frequentie buikpijn",
    8: "Defecatie frequentie",
    9: "Ontlasting consistentie",
    10: "Bloed bij ontlasting",
    11: "Winderigheid/opgeblazen",
    12: "Misselijkheid/braken",
    13: "Gewichtsverlies (>5kg)",
    14: "Relatie met voeding",
    15: "Relatie met stress",
    // Add more mappings as needed
  };

  // Get red flags based on answers
  const getRedFlags = () => {
    const redFlags = [];
    
    if (answers[10] && (answers[10] as string).includes('Regelmatig') || (answers[10] as string).includes('Vaak')) {
      redFlags.push('Frequent bloed bij ontlasting');
    }
    if (answers[13] && (answers[13] as string).includes('>10kg')) {
      redFlags.push('Significant gewichtsverlies (>10kg)');
    }
    if (answers[31] && (answers[31] as string).includes('Vaak')) {
      redFlags.push('Koorts bij buikklachten');
    }
    
    return redFlags;
  };

  // Generate diagnostic recommendations
  const getDiagnosticRecommendations = () => {
    const recommendations = [];
    const topScore = Math.max(...Object.values(scores));
    const topCondition = Object.entries(scores).find(([_, score]) => score === topScore)?.[0];

    // Base recommendations
    recommendations.push('Volledige anamnese en lichamelijk onderzoek');
    recommendations.push('Laboratorium: FBC, CRP, ESR, coeliakie serologie');
    
    if (topCondition === 'ibd' || scores.ibd > 50) {
      recommendations.push('Calprotectine (feces)');
      recommendations.push('Coloscopie met biopsie');
    }
    
    if (topCondition === 'sibo' || scores.sibo > 60) {
      recommendations.push('H2/CH4 ademtest (SIBO)');
      recommendations.push('Glucose/lactulose tolerantie test');
    }
    
    if (topCondition === 'celiac' || scores.celiac > 50) {
      recommendations.push('Anti-TTG IgA, anti-endomysium');
      recommendations.push('Totaal IgA');
      recommendations.push('Overweeg gastroscopie met duodenum biopsie');
    }
    
    if (topCondition === 'lactose' || scores.lactose > 60) {
      recommendations.push('Lactose tolerantie test');
      recommendations.push('Eliminatiedieet (2 weken lactosevrij)');
    }

    return recommendations;
  };

  const reportDate = new Date().toLocaleDateString('nl-NL');
  const redFlags = getRedFlags();
  const diagnosticRecs = getDiagnosticRecommendations();

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 print:p-6">
      {/* Header */}
      <div className="border-b-2 border-blue-900 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">MEDISCH RAPPORT</h1>
            <h2 className="text-lg text-gray-700">Digitale Anamnese Buikklachten</h2>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>Gegenereerd: {reportDate}</p>
            <p>Bron: The Belly Dr. (Digestica)</p>
            {patientData?.referenceNumber && <p>Ref: {patientData.referenceNumber}</p>}
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
            <User className="w-5 h-5 mr-2" />
            Patiënt Informatie
          </h3>
          <div className="space-y-1 text-sm">
            <p><strong>Initialen:</strong> {patientData?.initials || 'Niet opgegeven'}</p>
            <p><strong>Leeftijd:</strong> {answers[1] || 'Niet opgegeven'}</p>
            <p><strong>Geslacht:</strong> {patientData?.gender || 'Niet opgegeven'}</p>
            <p><strong>Duur klachten:</strong> {answers[2] || 'Niet opgegeven'}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
            <Clock className="w-5 h-5 mr-2" />
            Klacht Karakteristieken
          </h3>
          <div className="space-y-1 text-sm">
            <p><strong>Lokalisatie pijn:</strong> {answers[6] || 'Niet opgegeven'}</p>
            <p><strong>Frequentie pijn:</strong> {answers[7] || 'Niet opgegeven'}</p>
            <p><strong>Defecatie:</strong> {answers[8] || 'Niet opgegeven'}</p>
            <p><strong>Consistentie:</strong> {answers[9] || 'Niet opgegeven'}</p>
          </div>
        </div>
      </div>

      {/* Diagnostic Scores Matrix */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">DIAGNOSTISCHE SCORES MATRIX</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="border border-gray-300 p-2 text-left">Aandoening</th>
                <th className="border border-gray-300 p-2 text-center">Score (%)</th>
                <th className="border border-gray-300 p-2 text-center">Waarschijnlijkheid</th>
                <th className="border border-gray-300 p-2 text-left">Klinische Relevantie</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(scores).map(([condition, score]) => {
                const conditionNames: { [key: string]: string } = {
                  ibs: "Irritable Bowel Syndrome",
                  sibo: "Small Intestinal Bacterial Overgrowth",
                  celiac: "Coeliakie",
                  lactose: "Lactose Intolerantie", 
                  ibd: "Inflammatory Bowel Disease",
                  dyspepsia: "Functionele Dyspepsie",
                  gastritis: "Gastritis/H. Pylori"
                };

                const getProbability = (score: number) => {
                  if (score >= 70) return "Hoog";
                  if (score >= 50) return "Matig-Hoog";
                  if (score >= 30) return "Matig";
                  return "Laag";
                };

                const getRelevance = (condition: string, score: number) => {
                  if (score >= 60) {
                    switch(condition) {
                      case 'ibs': return 'Rome IV criteria overwegen';
                      case 'sibo': return 'Ademtest indicatie';
                      case 'celiac': return 'Serologie + biopsie';
                      case 'lactose': return 'Eliminatie test';
                      case 'ibd': return 'Endoscopie urgentie';
                      case 'dyspepsia': return 'H. pylori test + PPI trial';
                      case 'gastritis': return 'Endoscopie overwegen';
                      default: return 'Verder onderzoek';
                    }
                  }
                  return score >= 30 ? 'Differentiaal diagnose' : 'Minder waarschijnlijk';
                };

                return (
                  <tr key={condition} className={score >= 50 ? 'bg-yellow-50' : ''}>
                    <td className="border border-gray-300 p-2 font-medium">{conditionNames[condition]}</td>
                    <td className="border border-gray-300 p-2 text-center font-bold">{score}%</td>
                    <td className="border border-gray-300 p-2 text-center">{getProbability(score)}</td>
                    <td className="border border-gray-300 p-2">{getRelevance(condition, score)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Red Flags Section */}
      {redFlags.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="flex items-center text-lg font-semibold text-red-800 mb-3">
            <AlertTriangle className="w-5 h-5 mr-2" />
            ALARMSYMPTOMEN (Red Flags)
          </h3>
          <ul className="list-disc list-inside space-y-1 text-red-700">
            {redFlags.map((flag, index) => (
              <li key={index}>{flag}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-medium text-red-800">
            → Urgente medische evaluatie geïndiceerd
          </p>
        </div>
      )}

      {/* Medication History */}
      <div className="mb-6">
        <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
          <Pill className="w-5 h-5 mr-2" />
          MEDICATIE ANAMNESE
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p><strong>Huidige medicatie:</strong> {answers[4] ? (Array.isArray(answers[4]) ? (answers[4] as string[]).join(', ') : answers[4]) : 'Geen opgegeven'}</p>
          <p><strong>Familie anamnese:</strong> {answers[5] ? (Array.isArray(answers[5]) ? (answers[5] as string[]).join(', ') : answers[5]) : 'Geen opgegeven'}</p>
        </div>
      </div>

      {/* Diagnostic Recommendations */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">AANBEVOLEN VERVOLGONDERZOEK</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <ol className="list-decimal list-inside space-y-2">
            {diagnosticRecs.map((rec, index) => (
              <li key={index} className="text-blue-900">{rec}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Clinical Notes */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">KLINISCHE OVERWEGINGEN</h3>
        <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
          <p>• Scores gebaseerd op gevalideerde vragenlijsten en diagnostische criteria</p>
          <p>• Hogere scores (&gt;60%) rechtvaardigen gerichte diagnostiek</p>
          <p>• Multiple positieve scores suggereren overlap syndromen</p>
          <p>• Psychosociale factoren en stress rol evalueren bij functionele stoornissen</p>
          {answers[15] && (answers[15] as string).includes('Duidelijk') && (
            <p>• <strong>Stress-relatie gerapporteerd:</strong> Overweeg stress-management en/of psychologische begeleiding</p>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-gray-300 pt-4 mt-6">
        <p className="text-xs text-gray-600">
          <strong>Disclaimer:</strong> Dit rapport is gebaseerd op patiënt-gerapporteerde symptomen via gestructureerde vragenlijst. 
          Het dient als aanvulling op, niet vervanging van, klinische beoordeling. Definitieve diagnose vereist medische evaluatie door bevoegde zorgverlener.
          <br />
          <strong>Bron:</strong> The Belly Dr. v1.0 - Digestica Platform | <strong>Datum:</strong> {reportDate}
        </p>
      </div>

      {/* Print Button */}
      <div className="flex justify-center mt-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Print / Download PDF</span>
        </button>
      </div>
    </div>
  );
};

export default MedicalReportMatrix;