'use client';

import { useEffect, useState } from "react";
import { getLanguages, guessLanguage, newGame } from "../lib/api";
import "./main_style.css";

type GuessResult = {
  language: {
    id: number;
    name: string;
    year: number;
    typing: string;
    paradigm: string;
    mainUsage: string;
    executionType: string;
    languageLevel: string;
  };
  result: {
    year: number;
    typing: number;
    paradigm: number;
    mainUsage: number;
    executionType: number;
    languageLevel: number;
  };
};

export default function Home() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [gameId, setGameId] = useState<number>(0);
  const [sessionKey, setSessionKey] = useState<string>("");
  const [guessHistory, setGuessHistory] = useState<GuessResult[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [won, setWon] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getLanguages()
      .then((data) => {
        setLanguages(data);
        setSelectedLanguage(data[0] ?? "");
      })
      .catch((err) => {
        setError(`Failed to load languages: ${err.message}`);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const gameStarted = gameId !== 0 && sessionKey !== "";

  const handleNewGame = async () => {
    setError("");
    setMessage("");
    setGuessHistory([]);
    setWon(false);
    setIsLoading(true);

    try {
      const [newGameId, newSessionKey] = await newGame();
      setGameId(newGameId);
      setSessionKey(newSessionKey);
      setMessage("New game started. Guess the language.");
    } catch (err: any) {
      setError(err.message ?? "Failed to start game.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuess = async () => {
    if (!selectedLanguage) {
      setError("Select a language.");
      return;
    }
    if (!gameStarted) {
      setError("Start a new game first.");
      return;
    }
    if (won) {
      setError("Game already won. Start a new game.");
      return;
    }

    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const result = await guessLanguage(selectedLanguage, gameId, sessionKey);
      const resultData = result as GuessResult;
      setGuessHistory((prev) => [resultData, ...prev]); 

      const isWin = Object.values(resultData.result).every((value) => value === 1);
      if (isWin) {
        setWon(true);
        setMessage(`You guessed correctly: ${resultData.language.name}!`);
      } else {
        setMessage("Guess submitted.");
      }
    } catch (err: any) {
      setError(err.message ?? "Error occurred during guess.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="devdle-container">

      <header className="devdle-header">
        <h1 className="devdle-title">DevDle</h1>
        <p className="devdle-subtitle">Guess the programming language based on hints</p>
      </header>

      <div className="game-layout">

        <div className="control-panel">
          <div className="game-status">
            <p className={`status-indicator ${gameStarted ? 'status-active' : 'status-inactive'}`}>
              {gameStarted ? `Game #${gameId || ""}` : "Start a new game"}
            </p>
          </div>

          {gameStarted && (
            <>
            </>
          )}

          <button
            className="action-button"
            onClick={handleNewGame}
            disabled={isLoading}
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            New Game
          </button>


          {error && (
            <div className="message message-error">
              {error}
            </div>
          )}
          {message && (
            <div className={`message ${won ? 'message-success' : 'message-info'}`}>
              {message}
            </div>
          )}
        </div>


        <div className="control-panel shooting-panel">
          {gameStarted ? (
            <>
              <div className="language-selector">
                <label className="selector-label" htmlFor="language-select">
                  Select Language
                </label>
                <select
                  id="language-select"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="language-select"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGuess}
                disabled={isLoading || won}
                className="action-button"
              >
                {isLoading ? "Submitting..." : "Submit Guess"}
              </button>
            </>
          ) : (
            <div className="empty-state">
              <p>Start a new game to begin guessing</p>
            </div>
          )}
        </div>

        <div className="results-panel">
          <h2 className="results-title">Your Guesses</h2>

          {guessHistory.length > 0 ? (
            <div className="guess-history">
              {guessHistory.map((guess, idx) => (
                <GuessCard key={idx} guess={guess} attemptNumber={guessHistory.length - idx} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>
                {gameStarted
                  ? "Submit your first guess to see hints"
                  : "Start a new game to begin"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GuessCard({ guess, attemptNumber }: { guess: GuessResult; attemptNumber: number }) {
  const { language, result } = guess;

  return (
    <div className="guess-card">
      <div className="guess-header">
        <h3 className="guess-title">Attempt #{attemptNumber}: {language.name}</h3>
      </div>

      <div className="attributes-grid">
        <AttributeBox label="Year" value={result.year} isYear={true} languageValue={language.year} />
        <AttributeBox label="Typing" value={result.typing} isYear={false} languageValue={language.typing} />
        <AttributeBox label="Paradigm" value={result.paradigm} isYear={false} languageValue={language.paradigm} />
        <AttributeBox label="Usage" value={result.mainUsage} isYear={false} languageValue={language.mainUsage} />
        <AttributeBox label="Execution" value={result.executionType} isYear={false} languageValue={language.executionType} />
        <AttributeBox label="Level" value={result.languageLevel} isYear={false} languageValue={language.languageLevel} />
      </div>
    </div>
  );
}

function AttributeBox({ label, value, isYear, languageValue }: { label: string; value: number; isYear: boolean; languageValue: string | number }) {
  let className = "attribute-box incorrect";

  if (value === 1) {
    className = "attribute-box correct";
  } else if (isYear) {
    if (value === -1) {
      className = "attribute-box year-low";
    } else if (value === 0) {
      className = "attribute-box year-high";
    }
  }

  return (
    <div className={className}>
      <p className="attribute-label">{label}</p>
      <p className="attribute-value">{languageValue}</p>
      {isYear && value !== 1 && (
        <p className="attribute-hint">
          {value === -1 ? "Too low" : "Too high"}
        </p>
      )}
    </div>
  );
}