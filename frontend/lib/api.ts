import { GameResponse, GuessResponse, GuessRequest } from "./types";

const API_URL = "http://localhost:8080";

export async function getRandomLanguage(): Promise<GameResponse> {
  const res = await fetch(`${API_URL}/game`);
  return res.json();
}

export async function submitGuess(game_id: number, name: string): Promise<GuessResponse> {
  const payload: GuessRequest = {
    Language: name,
    GameID: game_id
  };
  
  const res = await fetch(`${API_URL}/guess`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}