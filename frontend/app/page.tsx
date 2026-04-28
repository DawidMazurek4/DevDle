"use client";

import { useEffect, useState } from "react";
import { Language, GameResponse, GuessResponse } from "@/lib/types";
import { getRandomLanguage, submitGuess } from "@/lib/api";
import { loadLanguages, getLanguageData } from "@/lib/languagesCache";
import GuessInput from "@/components/GuessInput";
import GuessGrid from "@/components/GuessGrid";

export default function Home() {
  const [game, setGame] = useState<GameResponse | null>(null);
  const [guesses, setGuesses] = useState<Language[]>([]);
  const [results, setResults] = useState<GuessResponse[]>([]);
  const [won, setWon] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      await loadLanguages();
      const newGame = await getRandomLanguage();
      setGame(newGame);
      setLoading(false);
    }
    init();
  }, []);

  async function handleGuess(name: string) {
    if (!game || won) return;
    
    const gameId = typeof game.game_id === 'number' ? game.game_id : parseInt(game.game_id as any);
    const result = await submitGuess(gameId, name);
    const guessedLanguage = getLanguageData(name);
    
    if (!guessedLanguage || !result) return;
    
    if (result.year === 1) {
      setWon(true);
    }
    
    setGuesses((prev) => [guessedLanguage, ...prev]);
    setResults((prev) => [result, ...prev]);
  }

  if (loading) return <p className="loading">Ładowanie...</p>;
  if (!game) return <p className="loading">Błąd ładowania gry</p>;

  return (
    <div className="container">
      <h1 className="title">DevDle</h1>
      <p className="subtitle">Zgadnij język programowania!</p>
      
      {!won && <GuessInput onGuess={handleGuess} />}
      
      {won && (
        <p className="win-message">
          Brawo! To był {game.language.name}!
        </p>
      )}
      
      {guesses.length > 0 && (
        <>
          <div className="table-header">
            <div className="header-cell">Nazwa</div>
            <div className="header-cell">Rok</div>
            <div className="header-cell">Typowanie</div>
            <div className="header-cell">Paradygmat</div>
            <div className="header-cell">Zastosowanie</div>
            <div className="header-cell">Wykonanie</div>
            <div className="header-cell">Poziom</div>
          </div>
          <GuessGrid guesses={guesses} results={results} answer={game.language} />
        </>
      )}
    </div>
  );
}