export type Language = {
  year: number;
  name: string;
  typing: string;
  paradigm: string;
  mainUsage: string;
  executionType: string;
  languageLevel: string;
}

export type Game = {
  game_id: string;
  language: Language;
}

export type GuessResponse = {
  game_id: string;
  name: string;
  year: number;        // 1 = correct, -1 = too early, 0 = too late
  typing: string;      // "1" lub "0"
  paradigm: string;    // "1" lub "0"
  mainUsage: string;   // "1" lub "0"
  executionType: string; // "1" lub "0"
  languageLevel: string; // "1" lub "0"
}