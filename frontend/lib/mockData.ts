import { Game } from "./types";

export const MOCK_LANGUAGES = [
  {
    name: "Python",
    year: 1991,
    typing: "dynamiczne",
    paradigm: "OOP",
    mainUsage: "data science",
    executionType: "interpretowany",
    languageLevel: "wysokopoziomowy",
  },
  {
    name: "JavaScript",
    year: 1995,
    typing: "dynamiczne",
    paradigm: "funkcyjny",
    mainUsage: "web",
    executionType: "interpretowany",
    languageLevel: "wysokopoziomowy",
  },
  {
    name: "Java",
    year: 1995,
    typing: "statyczne",
    paradigm: "OOP",
    mainUsage: "backend",
    executionType: "kompilowany",
    languageLevel: "wysokopoziomowy",
  },
  {
    name: "Go",
    year: 2009,
    typing: "statyczne",
    paradigm: "konkurencyjny",
    mainUsage: "backend",
    executionType: "kompilowany",
    languageLevel: "wysokopoziomowy",
  },
  {
    name: "C",
    year: 1972,
    typing: "statyczne",
    paradigm: "proceduralny",
    mainUsage: "systemy",
    executionType: "kompilowany",
    languageLevel: "niskopoziomowy",
  },
  {
    name: "C++",
    year: 1985,
    typing: "statyczne",
    paradigm: "OOP",
    mainUsage: "systemy",
    executionType: "kompilowany",
    languageLevel: "średniopoziomowy",
  },
  {
    name: "C#",
    year: 2000,
    typing: "statyczne",
    paradigm: "OOP",
    mainUsage: "backend",
    executionType: "kompilowany",
    languageLevel: "wysokopoziomowy",
  },
  {
    name: "Rust",
    year: 2010,
    typing: "statyczne",
    paradigm: "funkcyjny",
    mainUsage: "systemy",
    executionType: "kompilowany",
    languageLevel: "średniopoziomowy",
  },
  {
    name: "Kotlin",
    year: 2011,
    typing: "statyczne",
    paradigm: "OOP",
    mainUsage: "mobile",
    executionType: "kompilowany",
    languageLevel: "wysokopoziomowy",
  },
  {
    name: "Swift",
    year: 2014,
    typing: "statyczne",
    paradigm: "OOP",
    mainUsage: "mobile",
    executionType: "kompilowany",
    languageLevel: "wysokopoziomowy",
  },
];

export function getRandomMockGame(): Game {
  const randomIndex = Math.floor(Math.random() * MOCK_LANGUAGES.length);
  const randomLanguage = { ...MOCK_LANGUAGES[randomIndex] }; // kopia żeby nie modyfikować oryginału
  
  return {
    game_id: Math.random().toString(36).substring(7),
    language: randomLanguage,
  };
}

export function checkMockGuess(guessedName: string, correctLanguage: typeof MOCK_LANGUAGES[0]) {
  // Znajdź język który użytkownik zgaduje
  const guessedLanguage = MOCK_LANGUAGES.find(
    lang => lang.name.toLowerCase() === guessedName.toLowerCase()
  );
  
  if (!guessedLanguage) {
    return null;
  }
  
  // Porównanie roku
  let yearResult = 0;
  if (guessedLanguage.year === correctLanguage.year) yearResult = 1;
  else if (guessedLanguage.year < correctLanguage.year) yearResult = -1;
  else yearResult = 0;
  
  return {
    year: yearResult,
    typing: guessedLanguage.typing === correctLanguage.typing ? "1" : "0",
    paradigm: guessedLanguage.paradigm === correctLanguage.paradigm ? "1" : "0",
    mainUsage: guessedLanguage.mainUsage === correctLanguage.mainUsage ? "1" : "0",
    executionType: guessedLanguage.executionType === correctLanguage.executionType ? "1" : "0",
    languageLevel: guessedLanguage.languageLevel === correctLanguage.languageLevel ? "1" : "0",
  };
}