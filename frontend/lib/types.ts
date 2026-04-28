export type Language = {
  id : number;
  year: number;
  name: string;
  typing: string;
  paradigm: string;
  mainUsage: string;
  executionType: string;
  languageLevel: string;
}

export type GameResponse = {
  game_id: number;
  language: Language;
  result: GuessResponse;
}

export type GuessResponse = {
  year: number;  // 1 = correct, -1 = too early, 0 = too late
  typing: number;
  paradigm: number;
  mainUsage: number;
  executionType: number;
  languageLevel: number; 
}

export type GuessRequest = {
  Language: string;
  GameID: number;
}