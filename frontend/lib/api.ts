import { Game, GuessResponse } from "./types";

const API_URL = "http://localhost:8080";

export async function getRandomLanguage(): Promise<Game> {
  const res = await fetch(`${API_URL}/game`);
  return res.json();
}

export async function submitGuess(game_id: string, name: string): Promise<GuessResponse> {
  const res = await fetch(`${API_URL}/guess`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game_id, name }),
  });
  return res.json();
}