import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, FileText, AlertTriangle, Brain, Utensils } from 'lucide-react';

interface BellyDrQuestionnaireProps {
  onNavigateToReports?: () => void;
}

// TypeScript interfaces
interface ScoreMapping {
  [key: string]: number | { [condition: string]: number };
}

interface Question {
  id: number;
  question: string;
  type: 'select' | 'checkbox';
  options: string[];
  scoring: ScoreMapping;
}

interface Section {
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface Scores {
  ibs: number;
  sibo: number;
  celiac: number;
  lactose: number;
  ibd: number;
  dyspepsia: number;
  gastritis: number;
}

interface Answers {
  [questionId: number]: string | string[];
}

const BellyDrQuestionnaire: React.FC<BellyDrQuestionnaireProps> = ({ onNavigateToReports }) => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<number[]>([]);

  const sections: Section[] = [
    {
      title: "Algemene Informatie",
      icon: <FileText className="w-6 h-6" />,
      color: "blue",
      description: "Basis informatie over uw gezondheid"
    },
    {
      title: "Symptoom Karakterisering", 
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "red",
      description: "Beschrijf uw hoofdklachten"
    },
    {
      title: "Specifieke Aandoening Screening",
      icon: <Brain className="w-6 h-6" />,
      color: "purple", 
      description: "Gerichte vragen per aandoening"
    },
    {
      title: "Red Flags & Comorbiditeiten",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "orange",
      description: "Alarmsymptomen en bijkomende klachten"
    },
    {
      title: "Lifestyle & Voeding",
      icon: <Utensils className="w-6 h-6" />,
      color: "green",
      description: "Leefstijl en voedingspatroon"
    }
  ];

  const questions: { [sectionIndex: number]: Question[] } = {
    0: [ // Algemene Informatie
      {
        id: 1,
        question: "Wat is uw leeftijd?",
        type: "select",
        options: ["<18", "18-30", "31-45", "46-60", ">60"],
        scoring: { "<18": 0, "18-30": 1, "31-45": 2, "46-60": 3, ">60": 4 }
      },
      {
        id: 2,
        question: "Hoe lang heeft u al klachten?",
        type: "select", 
        options: ["<1 maand", "1-3 maanden", "3-6 maanden", "6-12 maanden", ">1 jaar"],
        scoring: { "<1 maand": 1, "1-3 maanden": 2, "3-6 maanden": 3, "6-12 maanden": 4, ">1 jaar": 5 }
      },
      {
        id: 3,
        question: "Heeft u eerder een diagnose gekregen voor uw buikklachten? (meerdere antwoorden mogelijk)",
        type: "checkbox",
        options: ["Nee", "IBS (prikkelbare darm)", "Gastritis (maagontsteking)", "Reflux (zuurbranden)", "Lactose intolerantie", "Andere"],
        scoring: { "Nee": 0, "IBS (prikkelbare darm)": 1, "Gastritis (maagontsteking)": 2, "Reflux (zuurbranden)": 1, "Lactose intolerantie": 1, "Andere": 1 }
      },
      {
        id: 4,
        question: "Gebruikt u momenteel medicijnen voor uw buikklachten? (meerdere antwoorden mogelijk)",
        type: "checkbox",
        options: ["Nee", "Maagzuurremmers (Omeprazol, Pantoprazol, Nexium)", "Pijnstillers (Ibuprofen, Naproxen, Diclofenac)", "Antibiotica", "Probiotica (Yakult, Activia, VSL#3)", "Voedingssuplementen (Vitamines, Mineralen)", "Andere medicijnen"],
        scoring: { "Nee": 0, "Maagzuurremmers (Omeprazol, Pantoprazol, Nexium)": 2, "Pijnstillers (Ibuprofen, Naproxen, Diclofenac)": 3, "Antibiotica": 2, "Probiotica (Yakult, Activia, VSL#3)": 1, "Voedingssuplementen (Vitamines, Mineralen)": 0, "Andere medicijnen": 1 }
      },
      {
        id: 5,
        question: "Heeft iemand in uw familie vergelijkbare buikklachten of darmaandoeningen? (meerdere antwoorden mogelijk)",
        type: "checkbox",
        options: ["Nee", "IBS (prikkelbare darm)", "Coeliakie (glutenintolerantie)", "Crohn/Colitis ulcerosa", "Darmkanker", "Onbekend"],
        scoring: { "Nee": 0, "IBS (prikkelbare darm)": 2, "Coeliakie (glutenintolerantie)": 3, "Crohn/Colitis ulcerosa": 4, "Darmkanker": 3, "Onbekend": 1 }
      }
    ],
    1: [ // Symptoom Karakterisering
      {
        id: 6,
        question: "Waar heeft u het meest last van buikpijn?",
        type: "select",
        options: ["Geen buikpijn", "Bovenbuik midden", "Bovenbuik rechts", "Onderbuik links", "Onderbuik rechts", "Hele buik"],
        scoring: { 
          "Geen buikpijn": 0, 
          "Bovenbuik midden": { dyspepsia: 3, gastritis: 3 }, 
          "Bovenbuik rechts": { gastritis: 2 },
          "Onderbuik links": { ibs: 3, ibd: 2 }, 
          "Onderbuik rechts": { ibs: 2 }, 
          "Hele buik": { ibs: 2, sibo: 2 } 
        }
      },
      {
        id: 7,
        question: "Hoe vaak heeft u buikpijn?",
        type: "select",
        options: ["Zelden", "1-2 dagen/week", "3-4 dagen/week", "5-6 dagen/week", "Dagelijks"],
        scoring: { "Zelden": 1, "1-2 dagen/week": 2, "3-4 dagen/week": 3, "5-6 dagen/week": 4, "Dagelijks": 5 }
      },
      {
        id: 8,
        question: "Hoe vaak heeft u ontlasting?",
        type: "select",
        options: ["<3x per week", "3-6x per week", "1x per dag", "2-3x per dag", ">3x per dag"],
        scoring: { 
          "<3x per week": { ibs: 4 }, 
          "3-6x per week": { ibs: 2 }, 
          "1x per dag": 0, 
          "2-3x per dag": { ibs: 2, sibo: 2 }, 
          ">3x per dag": { ibs: 4, ibd: 3, sibo: 3 } 
        }
      },
      {
        id: 9,
        question: "Hoe is de consistentie van uw ontlasting meestal?",
        type: "select",
        options: ["Hard/keutels", "Normaal gevormd", "Zacht", "Waterig", "Wisselend hard/zacht"],
        scoring: { 
          "Hard/keutels": { ibs: 4 }, 
          "Normaal gevormd": 0, 
          "Zacht": { ibs: 2 }, 
          "Waterig": { ibs: 4, ibd: 3, sibo: 3 }, 
          "Wisselend hard/zacht": { ibs: 4, sibo: 2 } 
        }
      },
      {
        id: 10,
        question: "Ziet u wel eens bloed in uw ontlasting?",
        type: "select",
        options: ["Nooit", "Zelden (helder rood)", "Soms (donker)", "Regelmatig", "Vaak"],
        scoring: { "Nooit": 0, "Zelden (helder rood)": 2, "Soms (donker)": { ibd: 4 }, "Regelmatig": { ibd: 5 }, "Vaak": { ibd: 5 } }
      },
      {
        id: 11,
        question: "Heeft u last van winderigheid/opgeblazen gevoel?",
        type: "select",
        options: ["Nooit", "Zelden", "Soms", "Vaak", "Altijd"],
        scoring: { "Nooit": 0, "Zelden": 1, "Soms": 2, "Vaak": { ibs: 3, sibo: 4, lactose: 3 }, "Altijd": { sibo: 5, ibs: 4 } }
      },
      {
        id: 12,
        question: "Heeft u wel eens misselijkheid of braken?",
        type: "select",
        options: ["Nooit", "Zelden", "Bij bepaald eten", "Regelmatig", "Vaak"],
        scoring: { "Nooit": 0, "Zelden": 1, "Bij bepaald eten": 3, "Regelmatig": { gastritis: 3, dyspepsia: 2 }, "Vaak": { gastritis: 4 } }
      },
      {
        id: 13,
        question: "Bent u ongewild afgevallen (>5kg)?",
        type: "select",
        options: ["Nee", "1-3kg", "3-5kg", "5-10kg", ">10kg"],
        scoring: { "Nee": 0, "1-3kg": 1, "3-5kg": { ibd: 2, celiac: 2 }, "5-10kg": { ibd: 4, celiac: 4 }, ">10kg": { ibd: 5 } }
      },
      {
        id: 14,
        question: "Merkt u een relatie tussen uw klachten en eten?",
        type: "select",
        options: ["Geen relatie", "Erger na eten", "Beter na eten", "Specifieke voedingsmiddelen (bv. zuivel, gluten, knoflook)", "Altijd na eten"],
        scoring: { 
          "Geen relatie": 0, 
          "Erger na eten": { dyspepsia: 3, sibo: 4 }, 
          "Beter na eten": { gastritis: 2 }, 
          "Specifieke voedingsmiddelen (bv. zuivel, gluten, knoflook)": { ibs: 3 }, 
          "Altijd na eten": { sibo: 5, dyspepsia: 4 } 
        }
      },
      {
        id: 15,
        question: "Merkt u een relatie tussen stress en uw klachten?",
        type: "select",
        options: ["Geen relatie", "Iets erger bij stress", "Duidelijk erger bij stress", "Alleen bij stress", "Stress maakt alles erger"],
        scoring: { "Geen relatie": 0, "Iets erger bij stress": { ibs: 2 }, "Duidelijk erger bij stress": { ibs: 4 }, "Alleen bij stress": { ibs: 5 }, "Stress maakt alles erger": { ibs: 4, dyspepsia: 2 } }
      }
    ],
    2: [ // Specifieke Aandoening Screening - simplified for space
      {
        id: 21,
        question: "Heeft u vaak het gevoel dat uw ontlasting niet volledig is?",
        type: "select",
        options: ["Nooit", "Zelden", "Soms", "Vaak", "Altijd"],
        scoring: { "Nooit": 0, "Zelden": 1, "Soms": { ibs: 2 }, "Vaak": { ibs: 4 }, "Altijd": { ibs: 5 } }
      },
      {
        id: 22,
        question: "Zit er wel eens slijm in uw ontlasting?",
        type: "select",
        options: ["Nooit", "Zelden", "Soms", "Vaak", "Altijd"],
        scoring: { "Nooit": 0, "Zelden": 1, "Soms": { ibs: 3 }, "Vaak": { ibs: 4, ibd: 2 }, "Altijd": { ibs: 5, ibd: 3 } }
      },
      {
        id: 23,
        question: "Voelt uw buik extreem opgezwollen na eten (vooral 1-3 uur later)?",
        type: "select",
        options: ["Nooit", "Zelden", "Soms", "Vaak", "Altijd"],
        scoring: { "Nooit": 0, "Zelden": 1, "Soms": { sibo: 2 }, "Vaak": { sibo: 4 }, "Altijd": { sibo: 5 } }
      },
      {
        id: 24,
        question: "Heeft u eerder buikoperaties gehad? (meerdere antwoorden mogelijk)",
        type: "checkbox",
        options: ["Nee", "Blindedarm", "Galblaas", "Darmen", "Maag", "Andere operaties"],
        scoring: { "Nee": 0, "Blindedarm": { sibo: 2 }, "Galblaas": { sibo: 2 }, "Darmen": { sibo: 4 }, "Maag": { sibo: 3 }, "Andere operaties": { sibo: 2 } }
      },
      {
        id: 25,
        question: "Hoe lang gebruikt u al regelmatig maagzuurremmers (omeprazol, pantoprazol)?",
        type: "select",
        options: ["Nee", "Minder dan 3 maanden", "3-12 maanden", "1-2 jaar", "Meer dan 2 jaar"],
        scoring: { "Nee": 0, "Minder dan 3 maanden": { sibo: 1 }, "3-12 maanden": { sibo: 2 }, "1-2 jaar": { sibo: 3 }, "Meer dan 2 jaar": { sibo: 4 } }
      },
      {
        id: 26,
        question: "Heeft u chronische vermoeidheid of concentratieproblemen?",
        type: "select",
        options: ["Nee", "Lichte vermoeidheid", "Matige vermoeidheid", "Ernstige vermoeidheid", "Constant uitgeput"],
        scoring: { "Nee": 0, "Lichte vermoeidheid": { celiac: 1 }, "Matige vermoeidheid": { celiac: 2, ibd: 1 }, "Ernstige vermoeidheid": { celiac: 4, ibd: 2 }, "Constant uitgeput": { celiac: 5, ibd: 3 } }
      },
      {
        id: 27,
        question: "Heeft u tekorten gehad aan ijzer, B12 of foliumzuur?",
        type: "checkbox",
        options: ["Nee", "IJzer tekort", "B12 tekort", "Foliumzuur tekort", "Geen idee"],
        scoring: { "Nee": 0, "IJzer tekort": { celiac: 3, ibd: 2 }, "B12 tekort": { celiac: 3, sibo: 3 }, "Foliumzuur tekort": { celiac: 4 }, "Geen idee": 0 }
      },
      {
        id: 28,
        question: "Heeft u huidproblemen (eczeem, uitslag, jeuk)?",
        type: "select",
        options: ["Nee", "Lichte huidklachten", "Eczeem", "Chronische uitslag", "Dermatitis herpetiformis"],
        scoring: { "Nee": 0, "Lichte huidklachten": 1, "Eczeem": { celiac: 2 }, "Chronische uitslag": { celiac: 3 }, "Dermatitis herpetiformis": { celiac: 5 } }
      },
      {
        id: 29,
        question: "Heeft u klachten na het eten van zuivelproducten? (meerdere antwoorden mogelijk)",
        type: "checkbox",
        options: ["Nee", "Soms winderigheid", "Vaak buikpijn", "Altijd diarree", "Alle zuivel vermijden"],
        scoring: { "Nee": 0, "Soms winderigheid": { lactose: 2 }, "Vaak buikpijn": { lactose: 3 }, "Altijd diarree": { lactose: 4 }, "Alle zuivel vermijden": { lactose: 5 } }
      },
      {
        id: 30,
        question: "Merkt u verschil als u lactasevrije producten gebruikt?",
        type: "select",
        options: ["Nooit geprobeerd", "Geen verschil", "Iets beter", "Veel beter", "Volledig klachtenvrij"],
        scoring: { "Nooit geprobeerd": 0, "Geen verschil": { lactose: -1 }, "Iets beter": { lactose: 2 }, "Veel beter": { lactose: 4 }, "Volledig klachtenvrij": { lactose: 5 } }
      }
    ],
    3: [ // Red Flags & Comorbiditeiten
      {
        id: 31,
        question: "Heeft u wel eens koorts gehad samen met uw buikklachten?",
        type: "select",
        options: ["Nooit", "Zelden", "Soms", "Regelmatig", "Vaak"],
        scoring: { "Nooit": 0, "Zelden": 1, "Soms": { ibd: 2 }, "Regelmatig": { ibd: 4 }, "Vaak": { ibd: 5 } }
      },
      {
        id: 32,
        question: "Zweet u 's nachts zonder duidelijke reden?",
        type: "select",
        options: ["Nooit", "Zelden", "Soms", "Regelmatig", "Altijd"],
        scoring: { "Nooit": 0, "Zelden": 1, "Soms": { ibd: 2 }, "Regelmatig": { ibd: 3 }, "Altijd": { ibd: 4 } }
      },
      {
        id: 33,
        question: "Heeft u problemen rond uw anus (scheurtjes, uitstulpingen)? (meerdere antwoorden mogelijk)",
        type: "checkbox", 
        options: ["Nee", "Soms jeuk", "Pijn bij ontlasting", "Zichtbare problemen", "Ernstige klachten"],
        scoring: { "Nee": 0, "Soms jeuk": 1, "Pijn bij ontlasting": { ibd: 2 }, "Zichtbare problemen": { ibd: 4 }, "Ernstige klachten": { ibd: 5 } }
      },
      {
        id: 34,
        question: "Heeft u gewrichtspijn of gewrichtszwelling?",
        type: "select",
        options: ["Nee", "Soms stijfheid", "Regelmatige pijn", "Zwelling", "Ernstige gewrichtspijn"],
        scoring: { "Nee": 0, "Soms stijfheid": 1, "Regelmatige pijn": { ibd: 2 }, "Zwelling": { ibd: 3 }, "Ernstige gewrichtspijn": { ibd: 4 } }
      },
      {
        id: 35,
        question: "Heeft u oogklachten (ontsteking, roodheid, pijn)?",
        type: "select",
        options: ["Nee", "Soms droge ogen", "Regelmatige roodheid", "Pijnlijke ogen", "Oogontstekingen"],
        scoring: { "Nee": 0, "Soms droge ogen": 1, "Regelmatige roodheid": { ibd: 2 }, "Pijnlijke ogen": { ibd: 3 }, "Oogontstekingen": { ibd: 4 } }
      }
    ],
    4: [ // Lifestyle & Voeding
      {
        id: 36,
        question: "Hoe is uw algemene voedingspatroon?",
        type: "select",
        options: ["Zeer gezond", "Redelijk gezond", "Gemiddeld", "Veel processed food", "Zeer ongezond"],
        scoring: { "Zeer gezond": 0, "Redelijk gezond": 1, "Gemiddeld": 2, "Veel processed food": { ibs: 2, ibd: 2 }, "Zeer ongezond": { ibs: 3, ibd: 3 } }
      },
      {
        id: 37,
        question: "Hoeveel stress ervaart u in uw dagelijks leven?",
        type: "select",
        options: ["Zeer weinig", "Weinig", "Gemiddeld", "Veel", "Extreem veel"],
        scoring: { "Zeer weinig": 0, "Weinig": 1, "Gemiddeld": { ibs: 1 }, "Veel": { ibs: 3, dyspepsia: 2 }, "Extreem veel": { ibs: 5, dyspepsia: 3 } }
      },
      {
        id: 38,
        question: "Hoeveel beweging krijgt u per week?",
        type: "select",
        options: [">5 uur", "3-5 uur", "1-3 uur", "<1 uur", "Geen beweging"],
        scoring: { ">5 uur": 0, "3-5 uur": 0, "1-3 uur": 1, "<1 uur": { ibs: 1 }, "Geen beweging": { ibs: 2 } }
      },
      {
        id: 39,
        question: "Rookt u of heeft u gerookt?",
        type: "select",
        options: ["Nooit gerookt", "Gestopt >5 jaar", "Gestopt <5 jaar", "Sociale roker", "Dagelijkse roker"],
        scoring: { "Nooit gerookt": 0, "Gestopt >5 jaar": 0, "Gestopt <5 jaar": { ibd: 1 }, "Sociale roker": { ibd: 2 }, "Dagelijkse roker": { ibd: 4 } }
      },
      {
        id: 40,
        question: "Hoe vaak gebruikt u alcohol?",
        type: "select",
        options: ["Nooit", "Zelden", "1-2 glazen/week", "3-7 glazen/week", ">7 glazen/week"],
        scoring: { "Nooit": 0, "Zelden": 0, "1-2 glazen/week": 0, "3-7 glazen/week": { gastritis: 1 }, ">7 glazen/week": { gastritis: 3 } }
     
      },
      {
        id: 41,
        question: "Heeft u ooit een H. Pylori infectie gehad of getest?",
        type: "select",
        options: ["Nooit getest", "Negatief getest", "Positief getest - behandeld", "Positief getest - niet behandeld", "Onbekend"],
        scoring: { "Nooit getest": 0, "Negatief getest": 0, "Positief getest - behandeld": { gastritis: 3 }, "Positief getest - niet behandeld": { gastritis: 5 }, "Onbekend": 1 }
      },
      {
        id: 42,
        question: "Heeft u diabetes of problemen met bloedsuiker?",
        type: "select",
        options: ["Nee", "Pre-diabetes", "Type 1 diabetes", "Type 2 diabetes", "Gestationele diabetes", "Onbekend/niet getest"],
       scoring: { "Nee": 0, "Pre-diabetes": { dyspepsia: 2 }, "Type 1 diabetes": { dyspepsia: 3 }, "Type 2 diabetes": { dyspepsia: 3 }, "Gestationele diabetes": { dyspepsia: 2 }, "Onbekend/niet getest": 1 }
      },
      {
        id: 43,
        question: "Heeft u schildklierproblemen?",
        type: "select",
        options: ["Nee", "Onderactieve schildklier (hypothyreoïdie)", "Overactieve schildklier (hyperthyreoïdie)", "Hashimoto", "Andere schildklieraandoening", "Onbekend/niet getest"],
        scoring: { "Nee": 0, "Onderactieve schildklier (hypothyreoïdie)": { dyspepsia: 2 }, "Overactieve schildklier (hyperthyreoïdie)": { dyspepsia: 3 }, "Hashimoto": { dyspepsia: 2 }, "Andere schildklieraandoening": { dyspepsia: 2 }, "Onbekend/niet getest": 1 }
      },
      {
        id: 44,
        question: "Heeft u bekende voedselallergieën of intoleranties? (meerdere antwoorden mogelijk)",
        type: "checkbox",
        options: ["Nee", "Noten/pinda allergie", "Schaal- en schelpdieren", "Eieren", "Soja", "Sesam", "Andere allergieën"],
        scoring: { "Nee": 0, "Noten/pinda allergie": { ibs: 1 }, "Schaal- en schelpdieren": { ibs: 1 }, "Eieren": { ibs: 1 }, "Soja": { ibs: 2 }, "Sesam": { ibs: 1 }, "Andere allergieën": { ibs: 2 } }
      }
    ]
  };

  // Helper function to get current questionnaire data
  const getCurrentQuestionnaire = () => {
    return {
      questions: questions[currentSection] || []
    };
  };

  const calculateScores = (): Scores => {
    const scores: Scores = {
      ibs: 0,
      sibo: 0, 
      celiac: 0,
      lactose: 0,
      ibd: 0,
      dyspepsia: 0,
      gastritis: 0
    };

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionIdStr, answer]) => {
      const questionId = parseInt(questionIdStr);
      const question = Object.values(questions).flat().find(q => q.id === questionId);
      if (question?.scoring && answer) {
        
        // Handle checkbox answers (arrays)
        const answersToProcess = Array.isArray(answer) ? answer : [answer];
        
        answersToProcess.forEach(singleAnswer => {
          const scoring = question.scoring[singleAnswer];
          if (typeof scoring === 'number') {
            // General scoring - apply to relevant conditions
            if (questionId <= 20) { // General symptoms
              scores.ibs += scoring * 0.5;
              scores.sibo += scoring * 0.3;
            }
          } else if (typeof scoring === 'object' && scoring !== null) {
            // Specific scoring for conditions
            Object.entries(scoring).forEach(([condition, points]) => {
              if (condition in scores) {
                scores[condition as keyof Scores] += points;
              }
            });
          }
        });
      }
    });

    // Convert to percentages (max 100 per condition)
    Object.keys(scores).forEach(condition => {
      scores[condition as keyof Scores] = Math.min(Math.round(scores[condition as keyof Scores] * 2), 100);
    });

    return scores;
  };

  const handleAnswer = (questionId: number, answer: string): void => {
    const question = getCurrentQuestionnaire()?.questions.find(q => q.id === questionId);
    
    // Clear validation error for this question
    if (validationErrors.includes(questionId)) {
      setValidationErrors(prev => prev.filter(id => id !== questionId));
    }
    
    if (question?.type === 'checkbox') {
      // Checkbox logic with "Nee" handling
      if (answer === 'Nee') {
        // Als "Nee" geselecteerd wordt, clear alle andere antwoorden
        setAnswers(prev => ({
          ...prev,
          [questionId]: ['Nee']
        }));
        return;
      }
      
      setAnswers(prev => {
        const currentAnswers = (prev[questionId] as string[]) || [];
        
        // Als iets anders dan "Nee" geselecteerd wordt, verwijder "Nee" eerst
        let filteredAnswers = currentAnswers.filter(a => a !== 'Nee');
        
        if (filteredAnswers.includes(answer)) {
          // Remove answer
          const newAnswers = filteredAnswers.filter(a => a !== answer);
          return {
            ...prev,
            [questionId]: newAnswers.length > 0 ? newAnswers : []
          };
        } else {
          // Add answer
          return {
            ...prev,
            [questionId]: [...filteredAnswers, answer]
          };
        }
      });
    } else {
      // Regular select answer
      setAnswers(prev => ({
        ...prev,
        [questionId]: answer
      }));
    }
  };

  const nextSection = (): void => {
    const questionnaire = getCurrentQuestionnaire();
    if (!questionnaire) return;

    // Valideer alle vragen in de huidige sectie
    const currentQuestions = questionnaire.questions;
    const unansweredQuestions: number[] = [];
    
    currentQuestions.forEach((question) => {
      const answer = answers[question.id];
      
      // Check if question is answered
      if (!answer || (Array.isArray(answer) && answer.length === 0)) {
        unansweredQuestions.push(question.id);
      }
    });

    if (unansweredQuestions.length > 0) {
      setValidationErrors(unansweredQuestions);
      // Scroll to first unanswered question
      setTimeout(() => {
        const firstUnansweredElement = document.querySelector(`[data-question-id="${unansweredQuestions[0]}"]`);
        if (firstUnansweredElement) {
          firstUnansweredElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
      return; // Stop hier - ga niet verder
    }

    // Clear validatie als alle vragen beantwoord zijn
    setValidationErrors([]);

    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowResults(true);
    }
    
    // Scroll to top after state update
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const prevSection = (): void => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
    // Scroll to top after state update  
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const getProgress = (): number => {
    const totalQuestions = Object.values(questions).flat().length;
    const answeredQuestions = Object.entries(answers).filter(([_, answer]) => {
      // Count as answered if there's an answer (array or string) and it's not empty
      return answer && (Array.isArray(answer) ? answer.length > 0 : true);
    }).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const getSectionCompletion = (sectionIndex: number): boolean => {
    const sectionQuestions = questions[sectionIndex] || [];
    return sectionQuestions.every(question => {
      const answer = answers[question.id];
      return answer && (Array.isArray(answer) ? answer.length > 0 : true);
    });
  };

  const currentQuestions = questions[currentSection] || [];
  const scores = calculateScores();

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/TheBellyDrLogo.png" 
              alt="The Belly Dr." 
              className="h-32 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">🎯 Uw Dr. Belly Analyse Resultaten</h2>
          <p className="text-gray-600">Gebaseerd op wetenschappelijke diagnostische criteria</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {Object.entries(scores).map(([condition, score]) => {
            const conditionNames: { [key: string]: string } = {
              ibs: "Irritable Bowel Syndrome (IBS)",
              sibo: "Small Intestinal Bacterial Overgrowth (SIBO)", 
              celiac: "Coeliakie (Glutenintolerantie)",
              lactose: "Lactose Intolerantie",
              ibd: "Inflammatory Bowel Disease (IBD)",
              dyspepsia: "Functional Dyspepsia",
              gastritis: "Gastritis/H. Pylori"
            };

            const getScoreColor = (score: number): string => {
              if (score >= 70) return "text-red-600 bg-red-50";
              if (score >= 50) return "text-orange-600 bg-orange-50";
              if (score >= 30) return "text-yellow-600 bg-yellow-50";
              return "text-green-600 bg-green-50";
            };

            const getScoreLevel = (score: number): string => {
              if (score >= 70) return "HOOG";
              if (score >= 50) return "MATIG-HOOG";
              if (score >= 30) return "MATIG";
              return "LAAG";
            };

            return (
              <div key={condition} className={`p-4 rounded-lg border ${getScoreColor(score)}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-sm">{conditionNames[condition]}</h3>
                  <span className="text-2xl font-bold">{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full ${score >= 70 ? 'bg-red-500' : score >= 50 ? 'bg-orange-500' : score >= 30 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <p className="text-xs font-medium">{getScoreLevel(score)} RISICO</p>
              </div>
            );
          })}
        </div>

        {/* Most Likely Diagnosis */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-3">🎯 Meest Waarschijnlijke Diagnose</h3>
          {(() => {
            const maxScore = Math.max(...Object.values(scores));
            const topCondition = Object.entries(scores).find(([_, score]) => score === maxScore);
            const conditionNames: { [key: string]: string } = {
              ibs: "Irritable Bowel Syndrome (IBS)",
              sibo: "Small Intestinal Bacterial Overgrowth (SIBO)", 
              celiac: "Coeliakie",
              lactose: "Lactose Intolerantie",
              ibd: "Inflammatory Bowel Disease",
              dyspepsia: "Functional Dyspepsia",
              gastritis: "Gastritis"
            };
            
            return (
              <div>
                <p className="text-lg font-semibold text-blue-700">
                  {topCondition ? conditionNames[topCondition[0]] : "Onbepaald"}
                </p>
                <p className="text-blue-600">Waarschijnlijkheid: {maxScore}%</p>
              </div>
            );
          })()}
        </div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-800 mb-3">🚀 Aanbevolen Vervolgstappen</h3>
            <ul className="space-y-2 text-green-700">
              <li>• Bespreek resultaten met uw huisarts</li>
              <li>• Overweeg eliminatiedieet (FODMAP)</li>
              <li>• Houd symptoomdagboek bij</li>
              <li>• Stressmanagement technieken</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-purple-800 mb-3">🔬 Aanbevolen Zelftesten</h3>
            <ul className="space-y-2 text-purple-700">
              <li>• SIBO Breath Test Kit (€179)</li>
              <li>• Comprehensive Stool Analysis (€229)</li>
              <li>• Food Sensitivity Panel (€149)</li>
              <li>• Coeliakie Test Panel (€129)</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-600">
            <strong>⚠️ Medische Disclaimer:</strong> Deze Dr. Belly analyse is bedoeld voor informatieve doeleinden en vervangt geen medisch advies. 
            Raadpleeg altijd een arts voor definitieve diagnose en behandeling. Bij alarmsymptomen direct contact opnemen met uw huisarts.
          </p>
        </div>

        {/* Medical Report Button */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Voor Uw Zorgverlener</h3>
          <p className="text-gray-600 mb-6">Genereer een professioneel rapport om mee te nemen naar uw arts</p>
          <button
            onClick={() => {
              console.log('Navigating to reports...');
// Create unique report with timestamp
const reportId = 'BD-' + Date.now().toString().slice(-6);
const reportData = {
  id: reportId,
  date: new Date().toLocaleDateString('nl-NL'),
  timestamp: Date.now(),
  type: 'belly_dr_questionnaire',
  answers,
  scores,
  patientData: {
    initials: 'Pt.',
    referenceNumber: reportId
  }
};

// Get existing reports array
const existingReports = JSON.parse(localStorage.getItem('belly_dr_reports') || '[]');
const updatedReports = [reportData, ...existingReports];

// Save updated array
localStorage.setItem('belly_dr_reports', JSON.stringify(updatedReports));
localStorage.setItem('current_report', JSON.stringify(reportData));
              if (onNavigateToReports) {
                onNavigateToReports();
              } else {
                alert('Navigatie niet beschikbaar');
              }
            }}
            
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2 mx-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Rapport Afdrukken</span>
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          <button 
onClick={() => {
  console.log('Navigating to reports...');
localStorage.setItem('current_report', JSON.stringify({ answers, scores }));
 if (onNavigateToReports) {
    onNavigateToReports();
  } else {
    alert('Navigatie niet beschikbaar');
  }
            }}

            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Nieuwe Dr. Belly Analyse Starten
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <img 
            src="/TheBellyDrLogo.png" 
            alt="The Belly Dr." 
            className="h-32 w-auto"
          />
        </div>
        <h1 className="text-3xl font-bold text-blue-600 mb-2">🩺 Dr. Belly Uitgebreide Vragenlijst</h1>
        <p className="text-gray-600">Evidence-based diagnostiek voor buikklachten</p>
        
        {/* TEMPORARY TEST BUTTON - Remove later */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <button
            onClick={() => {
              const mockAnswers = {
                1: "31-45", 2: "6-12 maanden", 3: ["IBS (prikkelbare darm)"], 4: ["Nee"],
                6: "Onderbuik links", 7: "3-4 dagen/week", 8: "2-3x per dag", 9: "Wisselend hard/zacht",
                10: "Nooit", 11: "Vaak", 15: "Duidelijk erger bij stress"
              };
              setAnswers(mockAnswers);
              setShowResults(true);
            }}
            className="bg-yellow-600 text-white px-4 py-2 rounded text-sm"
          >
            🧪 Test Resultaten (Mock Data)
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Voortgang</span>
            <span>{Math.round(getProgress())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sections.map((section, index) => {
          const isCompleted = getSectionCompletion(index);
          const isCurrent = index === currentSection;
          
          return (
            <div 
              key={index}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${
                isCurrent
                  ? `bg-${section.color}-100 border-${section.color}-300 text-${section.color}-700` 
                  : isCompleted
                    ? 'bg-green-100 border-green-300 text-green-700'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
              }`}
            >
              {isCompleted && !isCurrent ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                section.icon
              )}
              <span className="font-medium hidden sm:block">{section.title}</span>
              {isCurrent && validationErrors.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {validationErrors.length}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 rounded-lg bg-${sections[currentSection].color}-100`}>
            {sections[currentSection].icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{sections[currentSection].title}</h2>
            <p className="text-gray-600">{sections[currentSection].description}</p>
          </div>
        </div>

        {/* Validation Summary */}
        {validationErrors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold text-red-800">Ontbrekende Antwoorden</h4>
            </div>
            <p className="text-red-700 text-sm mb-3">
              De volgende vragen moeten beantwoord worden voordat u verder kunt:
            </p>
            <div className="flex flex-wrap gap-2">
              {validationErrors.map((questionId) => {
                const question = currentQuestions.find(q => q.id === questionId);
                return (
                  <button
                    key={questionId}
                    onClick={() => {
                      const element = document.querySelector(`[data-question-id="${questionId}"]`);
                      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm font-medium hover:bg-red-300 transition-colors"
                  >
                    Vraag {questionId}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {currentQuestions.map((question) => {
            const hasError = validationErrors.includes(question.id);
            
            return (
              <div 
                key={question.id} 
                data-question-id={question.id}
                className={`border rounded-lg p-4 transition-colors ${
                  hasError 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <h3 className={`font-semibold mb-3 ${
                  hasError ? 'text-red-800' : 'text-gray-800'
                }`}>
                  {question.id}. {question.question}
                  <span className="text-red-500 ml-1">*</span>
                </h3>
                
                {hasError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-red-700 text-sm font-medium">
                        Deze vraag is verplicht en moet beantwoord worden
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="grid gap-2">
                  {question.options.map((option) => {
                    const isChecked = question.type === 'checkbox' 
                      ? ((answers[question.id] as string[]) || []).includes(option)
                      : answers[question.id] === option;
                      
                    return (
                      <label 
                        key={option}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-blue-50 border-blue-300 text-blue-700' 
                            : hasError
                              ? 'bg-red-25 border-red-200 hover:bg-red-50'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type={question.type === 'checkbox' ? 'checkbox' : 'radio'}
                          name={question.type === 'checkbox' ? undefined : `question-${question.id}`}
                          value={option}
                          checked={isChecked}
                          onChange={() => handleAnswer(question.id, option)}
                          className="mr-3"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevSection}
          disabled={currentSection === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
            currentSection === 0 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Vorige
        </button>

        <button
          onClick={nextSection}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {currentSection === sections.length - 1 ? 'Analyse Starten' : 'Volgende'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BellyDrQuestionnaire;