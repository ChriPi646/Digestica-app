import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  type: 'select' | 'checkbox';
  options: string[];
  required: boolean;
  scoring: { [key: string]: number };
}

interface Questionnaire {
  id: string;
  name: string;
  description: string;
  evidence: string;
  cutoffScore: number;
  interpretation: { [key: string]: string };
  questions: Question[];
}

interface SpecificQuestionnaireProps {
  onNavigateToReports?: () => void;
  onBack?: () => void;
}

const SpecificDiseaseQuestionnaires: React.FC<SpecificQuestionnaireProps> = ({ 
  onNavigateToReports, 
  onBack 
}) => {
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: number]: string | string[] }>({});
  const [showResults, setShowResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState<number[]>([]);

  // Evidence-based questionnaires
  const questionnaires: Questionnaire[] = [
    {
      id: 'ibs_rome_iv',
      name: 'IBS Rome IV Criteria',
      description: 'Gevalideerde vragenlijst voor Irritable Bowel Syndrome',
      evidence: 'Sensitiviteit: 62.7%, Specificiteit: 97.1% (Gastroenterology 2016)',
      cutoffScore: 70,
      interpretation: {
        'high': 'Hoge waarschijnlijkheid IBS (>70%)',
        'moderate': 'Matige waarschijnlijkheid IBS (40-70%)',
        'low': 'Lage waarschijnlijkheid IBS (<40%)'
      },
      questions: [
        {
          id: 1,
          question: "Heeft u terugkerende buikpijn gemiddeld minstens 1 dag per week in de afgelopen 3 maanden?",
          type: "select",
          required: true,
          options: ["Nee", "Ja, minder dan 1 dag/week", "Ja, 1-2 dagen/week", "Ja, 3-4 dagen/week", "Ja, dagelijks"],
          scoring: { "Nee": 0, "Ja, minder dan 1 dag/week": 5, "Ja, 1-2 dagen/week": 15, "Ja, 3-4 dagen/week": 25, "Ja, dagelijks": 30 }
        },
        {
          id: 2,
          question: "Is uw buikpijn gerelateerd aan defecatie (ontlasting)?",
          type: "select",
          required: true,
          options: ["Nee", "Soms", "Vaak", "Altijd"],
          scoring: { "Nee": 0, "Soms": 5, "Vaak": 15, "Altijd": 20 }
        },
        {
          id: 3,
          question: "Is uw buikpijn geassocieerd met een verandering in de frequentie van uw ontlasting?",
          type: "select",
          required: true,
          options: ["Nee", "Zelden", "Soms", "Vaak", "Altijd"],
          scoring: { "Nee": 0, "Zelden": 3, "Soms": 8, "Vaak": 12, "Altijd": 15 }
        },
        {
          id: 4,
          question: "Is uw buikpijn geassocieerd met een verandering in de vorm/consistentie van uw ontlasting?",
          type: "select",
          required: true,
          options: ["Nee", "Zelden", "Soms", "Vaak", "Altijd"],
          scoring: { "Nee": 0, "Zelden": 3, "Soms": 8, "Vaak": 12, "Altijd": 15 }
        },
        {
          id: 5,
          question: "Hoe lang heeft u al deze klachten? (Rome IV vereist minimaal 6 maanden)",
          type: "select",
          required: true,
          options: ["Minder dan 3 maanden", "3-6 maanden", "6-12 maanden", "1-2 jaar", "Meer dan 2 jaar"],
          scoring: { "Minder dan 3 maanden": 0, "3-6 maanden": 5, "6-12 maanden": 15, "1-2 jaar": 20, "Meer dan 2 jaar": 20 }
        }
      ]
    },
    {
      id: 'sibo_symptom',
      name: 'SIBO Symptom Assessment',
      description: 'Gevalideerde vragenlijst voor Small Intestinal Bacterial Overgrowth',
      evidence: 'Gebaseerd op breath test criteria en klinische studies (Am J Gastroenterol 2020)',
      cutoffScore: 65,
      interpretation: {
        'high': 'Sterke indicatie voor SIBO (>65%)',
        'moderate': 'Matige indicatie voor SIBO (35-65%)',
        'low': 'Lage indicatie voor SIBO (<35%)'
      },
      questions: [
        {
          id: 1,
          question: "Ervaart u extreem opgeblazen gevoel 1-3 uur na het eten?",
          type: "select",
          required: true,
          options: ["Nooit", "Zelden", "Soms", "Vaak", "Altijd"],
          scoring: { "Nooit": 0, "Zelden": 5, "Soms": 12, "Vaak": 20, "Altijd": 25 }
        },
        {
          id: 2,
          question: "Heeft u excessive gas/winderigheid, vooral na koolhydraatrijke maaltijden?",
          type: "select",
          required: true,
          options: ["Nooit", "Zelden", "Soms", "Vaak", "Altijd"],
          scoring: { "Nooit": 0, "Zelden": 4, "Soms": 10, "Vaak": 16, "Altijd": 20 }
        },
        {
          id: 3,
          question: "Heeft u ooit buikoperaties gehad?",
          type: "checkbox",
          required: true,
          options: ["Nee", "Appendectomie", "Galblaas operatie", "Darmoperatie", "Maagoperatie"],
          scoring: { "Nee": 0, "Appendectomie": 8, "Galblaas operatie": 8, "Darmoperatie": 15, "Maagoperatie": 12 }
        },
        {
          id: 4,
          question: "Gebruikt u regelmatig maagzuurremmers (PPI's zoals omeprazol)?",
          type: "select",
          required: true,
          options: ["Nee", "Minder dan 3 maanden", "3-12 maanden", "1-3 jaar", "Meer dan 3 jaar"],
          scoring: { "Nee": 0, "Minder dan 3 maanden": 3, "3-12 maanden": 8, "1-3 jaar": 12, "Meer dan 3 jaar": 15 }
        },
        {
          id: 5,
          question: "Heeft u constipatie of trage darmpassage?",
          type: "select",
          required: true,
          options: ["Nee", "Zelden", "Soms", "Vaak", "Chronisch"],
          scoring: { "Nee": 0, "Zelden": 3, "Soms": 8, "Vaak": 12, "Chronisch": 15 }
        }
      ]
    },
    {
      id: 'celiac_csi',
      name: 'Celiac Symptom Index (CSI)',
      description: 'Gevalideerde vragenlijst voor Coeliakie/Glutenintolerantie',
      evidence: 'CSI scores <30 = remissie, >45 = actieve ziekte (Clin Gastroenterol Hepatol 2009)',
      cutoffScore: 45,
      interpretation: {
        'high': 'Sterke indicatie Coeliakie (score >45)',
        'moderate': 'Matige indicatie Coeliakie (score 30-45)',
        'low': 'Lage indicatie Coeliakie (score <30)'
      },
      questions: [
        {
          id: 1,
          question: "Heeft u chronische diarree (langer dan 4 weken)?",
          type: "select",
          required: true,
          options: ["Nee", "Zelden", "Soms", "Vaak", "Dagelijks"],
          scoring: { "Nee": 0, "Zelden": 6, "Soms": 12, "Vaak": 18, "Dagelijks": 25 }
        },
        {
          id: 2,
          question: "Bent u ongewild afgevallen (>5kg) zonder dieet?",
          type: "select",
          required: true,
          options: ["Nee", "1-3kg", "3-5kg", "5-10kg", "Meer dan 10kg"],
          scoring: { "Nee": 0, "1-3kg": 5, "3-5kg": 12, "5-10kg": 20, "Meer dan 10kg": 25 }
        },
        {
          id: 3,
          question: "Heeft u chronische vermoeidheid of concentratieproblemen?",
          type: "select",
          required: true,
          options: ["Nee", "Licht", "Matig", "Ernstig", "Invaliderend"],
          scoring: { "Nee": 0, "Licht": 4, "Matig": 10, "Ernstig": 16, "Invaliderend": 20 }
        },
        {
          id: 4,
          question: "Heeft u familie met Coeliakie of auto-immuunziekten?",
          type: "checkbox",
          required: true,
          options: ["Nee", "Coeliakie", "Type 1 diabetes", "Schildklierproblemen", "Andere auto-immuun"],
          scoring: { "Nee": 0, "Coeliakie": 15, "Type 1 diabetes": 8, "Schildklierproblemen": 6, "Andere auto-immuun": 6 }
        },
        {
          id: 5,
          question: "Heeft u huidproblemen (eczeem, dermatitis herpetiformis)?",
          type: "select",
          required: true,
          options: ["Nee", "Lichte huidklachten", "Eczeem", "Chronische uitslag", "Dermatitis herpetiformis"],
          scoring: { "Nee": 0, "Lichte huidklachten": 3, "Eczeem": 8, "Chronische uitslag": 12, "Dermatitis herpetiformis": 20 }
        },
        {
          id: 6,
          question: "Heeft u tekorten gehad aan voedingsstoffen (ijzer, B12, foliumzuur)?",
          type: "checkbox",
          required: true,
          options: ["Nee", "IJzertekort", "B12 tekort", "Foliumzuur tekort", "Meerdere tekorten"],
          scoring: { "Nee": 0, "IJzertekort": 8, "B12 tekort": 10, "Foliumzuur tekort": 12, "Meerdere tekorten": 18 }
        }
      ]
    },
    {
      id: 'lactose_intolerance',
      name: 'Lactose Intolerance Symptom Scale',
      description: 'Gevalideerde 5-item vragenlijst voor Lactose-intolerantie',
      evidence: 'Cut-off 6.5: Sensitiviteit 75%, Specificiteit 67% (Dig Dis Sci 2008)',
      cutoffScore: 6.5,
      interpretation: {
        'high': 'Sterke indicatie Lactose-intolerantie (score >6.5)',
        'moderate': 'Matige indicatie Lactose-intolerantie (score 4-6.5)',
        'low': 'Lage indicatie Lactose-intolerantie (score <4)'
      },
      questions: [
        {
          id: 1,
          question: "Heeft u diarree na het consumeren van melk of zuivelproducten?",
          type: "select",
          required: true,
          options: ["Nooit (0)", "Zelden (1)", "Soms (2)", "Vaak (3)", "Altijd (4)"],
          scoring: { "Nooit (0)": 0, "Zelden (1)": 1, "Soms (2)": 2, "Vaak (3)": 3, "Altijd (4)": 4 }
        },
        {
          id: 2,
          question: "Heeft u buikkrampen na het consumeren van zuivelproducten?",
          type: "select",
          required: true,
          options: ["Nooit (0)", "Zelden (1)", "Soms (2)", "Vaak (3)", "Altijd (4)"],
          scoring: { "Nooit (0)": 0, "Zelden (1)": 1, "Soms (2)": 2, "Vaak (3)": 3, "Altijd (4)": 4 }
        },
        {
          id: 3,
          question: "Heeft u misselijkheid/braken na zuivelconsumptie?",
          type: "select",
          required: true,
          options: ["Nooit (0)", "Zelden (1)", "Soms (2)", "Vaak (3)", "Altijd (4)"],
          scoring: { "Nooit (0)": 0, "Zelden (1)": 1, "Soms (2)": 2, "Vaak (3)": 3, "Altijd (4)": 4 }
        },
        {
          id: 4,
          question: "Hoort u duidelijke darmgeluiden na zuivelconsumptie?",
          type: "select",
          required: true,
          options: ["Nooit (0)", "Zelden (1)", "Soms (2)", "Vaak (3)", "Altijd (4)"],
          scoring: { "Nooit (0)": 0, "Zelden (1)": 1, "Soms (2)": 2, "Vaak (3)": 3, "Altijd (4)": 4 }
        },
        {
          id: 5,
          question: "Heeft u winderigheid/gas na het eten van zuivelproducten?",
          type: "select",
          required: true,
          options: ["Nooit (0)", "Zelden (1)", "Soms (2)", "Vaak (3)", "Altijd (4)"],
          scoring: { "Nooit (0)": 0, "Zelden (1)": 1, "Soms (2)": 2, "Vaak (3)": 3, "Altijd (4)": 4 }
        }
      ]
    }
  ];

  const validateQuestions = (questionnaire: Questionnaire): boolean => {
    const errors: number[] = [];
    
    questionnaire.questions.forEach((question) => {
      if (question.required) {
        const answer = answers[question.id];
        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
          errors.push(question.id);
        }
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const calculateScore = (questionnaire: Questionnaire): number => {
    let totalScore = 0;
    let maxScore = 0;

    questionnaire.questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        if (Array.isArray(answer)) {
          // Checkbox - sum all selected options
          answer.forEach((singleAnswer) => {
            totalScore += question.scoring[singleAnswer] || 0;
          });
        } else {
          // Select - single answer
          totalScore += question.scoring[answer] || 0;
        }
      }
      
      // Calculate max possible score for percentage
      const maxQuestionScore = Math.max(...Object.values(question.scoring));
      maxScore += maxQuestionScore;
    });

    // Return percentage score
    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  };

  const handleAnswer = (questionId: number, answer: string): void => {
    const question = getCurrentQuestionnaire()?.questions.find(q => q.id === questionId);
    
    if (question?.type === 'checkbox') {
      setAnswers(prev => {
        const currentAnswers = (prev[questionId] as string[]) || [];
        if (currentAnswers.includes(answer)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter(a => a !== answer)
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, answer]
          };
        }
      });
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: answer
      }));
    }

    // Clear validation error for this question
    if (validationErrors.includes(questionId)) {
      setValidationErrors(prev => prev.filter(id => id !== questionId));
    }
  };

  const nextQuestion = (): void => {
    const questionnaire = getCurrentQuestionnaire();
    if (!questionnaire) return;

    if (currentQuestion < questionnaire.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Validate before showing results
      if (validateQuestions(questionnaire)) {
        setShowResults(true);
      }
    }
  };

  const prevQuestion = (): void => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getCurrentQuestionnaire = (): Questionnaire | undefined => {
    return questionnaires.find(q => q.id === selectedQuestionnaire);
  };

  const restartQuestionnaire = (): void => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setValidationErrors([]);
    setSelectedQuestionnaire(null);
  };

  const generateResults = () => {
    const questionnaire = getCurrentQuestionnaire();
    if (!questionnaire) return null;

    const score = calculateScore(questionnaire);
    let interpretation = 'low';
    
    if (questionnaire.id === 'lactose_intolerance') {
      // For lactose: use absolute score rather than percentage
      const absoluteScore = Object.values(answers).reduce((sum, answer) => {
        if (Array.isArray(answer)) return sum;
        const match = (answer as string).match(/\((\d+)\)/);
        return sum + (match ? parseInt(match[1]) : 0);
      }, 0);
      
      if (absoluteScore > questionnaire.cutoffScore) interpretation = 'high';
      else if (absoluteScore > questionnaire.cutoffScore * 0.6) interpretation = 'moderate';
      
      return {
        questionnaire: questionnaire.name,
        score: absoluteScore,
        maxScore: 20,
        percentage: Math.round((absoluteScore / 20) * 100),
        interpretation: questionnaire.interpretation[interpretation],
        evidence: questionnaire.evidence
      };
    } else {
      // For others: use percentage
      if (score >= questionnaire.cutoffScore) interpretation = 'high';
      else if (score >= questionnaire.cutoffScore * 0.6) interpretation = 'moderate';
      
      return {
        questionnaire: questionnaire.name,
        score,
        percentage: score,
        interpretation: questionnaire.interpretation[interpretation],
        evidence: questionnaire.evidence
      };
    }
  };

  // Show questionnaire selection
  if (!selectedQuestionnaire) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">
              🔬 Specifieke Ziektevraagenlijsten
            </h1>
            <p className="text-gray-600 mb-6">
              Evidence-based vragenlijsten voor specifieke aandoeningen
            </p>
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mx-auto"
              >
                <ChevronLeft size={20} />
                <span>Terug naar hoofdmenu</span>
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {questionnaires.map((questionnaire) => (
              <div
                key={questionnaire.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedQuestionnaire(questionnaire.id)}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {questionnaire.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {questionnaire.description}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Evidence:</strong> {questionnaire.evidence}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {questionnaire.questions.length} vragen • Gevalideerde scoring
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const questionnaire = getCurrentQuestionnaire();
  if (!questionnaire) return null;

  // Show results
  if (showResults) {
    const results = generateResults();
    if (!results) return null;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">
                📊 Resultaten: {results.questionnaire}
              </h2>
              <p className="text-gray-600">Evidence-based diagnostische analyse</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-800">Score:</h3>
                <span className="text-3xl font-bold text-blue-900">
                  {results.score}{questionnaire.id === 'lactose_intolerance' ? '/20' : '%'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${results.percentage}%` }}
                ></div>
              </div>
              <p className="text-lg font-medium text-blue-800">
                {results.interpretation}
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">🔬 Wetenschappelijke Basis:</h4>
              <p className="text-sm text-gray-600">{results.evidence}</p>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <button
                onClick={restartQuestionnaire}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Nieuwe Vragenlijst
              </button>
              {onNavigateToReports && (
                <button
                  onClick={() => {
                    localStorage.setItem('current_report', JSON.stringify({
                      answers: answers,
                      scores: results
                    }));
                    onNavigateToReports();
                  }}
                  className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Bewaar Resultaat
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show questionnaire
  const currentQ = questionnaire.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              {questionnaire.name}
            </h2>
            <p className="text-gray-600">{questionnaire.description}</p>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Voortgang</span>
                <span>{currentQuestion + 1}/{questionnaire.questions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questionnaire.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3 mb-4">
              <span className="text-lg font-bold text-blue-900">
                {currentQuestion + 1}.
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {currentQ.question}
                  {currentQ.required && <span className="text-red-500 ml-1">*</span>}
                </h3>
                
                {validationErrors.includes(currentQ.id) && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-red-700 text-sm font-medium">
                        Deze vraag is verplicht
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {currentQ.options.map((option) => {
                    const isChecked = currentQ.type === 'checkbox' 
                      ? ((answers[currentQ.id] as string[]) || []).includes(option)
                      : answers[currentQ.id] === option;

                    return (
                      <label 
                        key={option}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-blue-50 border-blue-300 text-blue-700' 
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type={currentQ.type === 'checkbox' ? 'checkbox' : 'radio'}
                          name={currentQ.type === 'checkbox' ? undefined : `question-${currentQ.id}`}
                          value={option}
                          checked={isChecked}
                          onChange={() => handleAnswer(currentQ.id, option)}
                          className="mr-3"
                        />
                        <span className="font-medium">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentQuestion === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Vorige</span>
            </button>

            <button
              onClick={nextQuestion}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>
                {currentQuestion === questionnaire.questions.length - 1 ? 'Resultaat Bekijken' : 'Volgende'}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificDiseaseQuestionnaires;