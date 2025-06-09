import React, { useState, useEffect } from 'react';
import { FileText, Download, Printer, Mail, Calendar, ArrowLeft, Eye } from 'lucide-react';
import MedicalReportMatrix from './MedicalReportMatrix';

interface SavedReport {
  id: string;
  date: string;
  timestamp: number;
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
  patientData: {
    initials: string;
    referenceNumber: string;
  };
}

interface ReportsMenuProps {
  onBack: () => void;
  currentReport?: {
    answers: { [questionId: number]: string | string[] };
    scores: any;
  } | null;
}

const ReportsMenu: React.FC<ReportsMenuProps> = ({ onBack, currentReport }) => {
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<SavedReport | null>(null);
  const [showReportView, setShowReportView] = useState(false);

  // Load saved reports from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('belly_dr_reports');
    if (saved) {
      setSavedReports(JSON.parse(saved));
    }

    // If there's a current report from questionnaire, save it automatically
    if (currentReport) {
      saveCurrentReport();
    }
  }, [currentReport]);

  const saveCurrentReport = () => {
    if (!currentReport) return;

    const newReport: SavedReport = {
      id: 'BD-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString('nl-NL'),
      timestamp: Date.now(),
      answers: currentReport.answers,
      scores: currentReport.scores,
      patientData: {
        initials: 'Pt.',
        referenceNumber: 'BD-' + Date.now().toString().slice(-6)
      }
    };

    const updated = [newReport, ...savedReports];
    setSavedReports(updated);
    localStorage.setItem('belly_dr_reports', JSON.stringify(updated));
  };

  const deleteReport = (reportId: string) => {
    const updated = savedReports.filter(report => report.id !== reportId);
    setSavedReports(updated);
    localStorage.setItem('belly_dr_reports', JSON.stringify(updated));
  };

  const printReport = (report: SavedReport) => {
    setSelectedReport(report);
    setShowReportView(true);
    // Print will be triggered after the component renders
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const downloadPDF = (report: SavedReport) => {
    // For now, trigger print dialog (user can save as PDF)
    printReport(report);
  };

  const emailReport = (report: SavedReport) => {
    const subject = `Medisch Rapport - ${report.date}`;
    const body = `Beste zorgverlener,\n\nBijgevoegd vindt u mijn medisch rapport van The Belly Dr.\n\nReferentie: ${report.patientData.referenceNumber}\nDatum: ${report.date}\n\nMet vriendelijke groet`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getTopDiagnosis = (scores: any) => {
    const maxScore = Math.max(...(Object.values(scores) as number[]));
    const topCondition = Object.entries(scores).find(([_, score]) => score === maxScore);
    
    const conditionNames: { [key: string]: string } = {
      ibs: "IBS",
      sibo: "SIBO",
      celiac: "Coeliakie",
      lactose: "Lactose Intol.",
      ibd: "IBD",
      dyspepsia: "Dyspepsie",
      gastritis: "Gastritis"
    };
    
    return topCondition ? `${conditionNames[topCondition[0]]} (${maxScore}%)` : 'Onbepaald';
  };

  // If showing report view
  if (showReportView && selectedReport) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8">
          <div className="mb-6 print:hidden">
            <button
              onClick={() => {
                setShowReportView(false);
                setSelectedReport(null);
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              <span>Terug naar Rapporten</span>
            </button>
          </div>
          
          <MedicalReportMatrix
            answers={selectedReport.answers}
            scores={selectedReport.scores}
            patientData={selectedReport.patientData}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📋 Mijn Rapporten</h1>
              <p className="text-gray-600 mt-2">Beheer en deel uw medische rapporten</p>
            </div>
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              <span>Terug</span>
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Opgeslagen Rapporten</h2>
            <p className="text-sm text-gray-600 mt-1">
              {savedReports.length} rapport{savedReports.length !== 1 ? 'en' : ''} beschikbaar
            </p>
          </div>

          {savedReports.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Geen rapporten gevonden</h3>
              <p className="text-gray-500">Vul de vragenlijst in om uw eerste rapport te genereren.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Datum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Referentie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Top Diagnose
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acties
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {savedReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.date}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(report.timestamp).toLocaleTimeString('nl-NL', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{report.patientData.referenceNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getTopDiagnosis(report.scores)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedReport(report);
                              setShowReportView(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                            title="Bekijken"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => printReport(report)}
                            className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                            title="Afdrukken"
                          >
                            <Printer size={16} />
                          </button>
                          <button
                            onClick={() => downloadPDF(report)}
                            className="text-purple-600 hover:text-purple-800 p-2 rounded-lg hover:bg-purple-50"
                            title="Download PDF"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => emailReport(report)}
                            className="text-orange-600 hover:text-orange-800 p-2 rounded-lg hover:bg-orange-50"
                            title="E-mail"
                          >
                            <Mail size={16} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Weet u zeker dat u dit rapport wilt verwijderen?')) {
                                deleteReport(report.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                            title="Verwijderen"
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Hoe te gebruiken</h3>
          <ul className="space-y-1 text-blue-700">
            <li>• <strong>Bekijken:</strong> Volledige rapport weergeven</li>
            <li>• <strong>Afdrukken:</strong> Direct naar printer</li>
            <li>• <strong>PDF:</strong> Opslaan als PDF bestand</li>
            <li>• <strong>E-mail:</strong> Deel met uw zorgverlener</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportsMenu;