"use client";

import { useState, useEffect } from "react";
import { getLanguages } from "@/lib/languages";

type Props = {
  onGuess: (name: string) => void;
  disabled?: boolean;
};

export default function GuessInput({ onGuess, disabled }: Props) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    getLanguages().then(setLanguages);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setValue(val);
    if (val.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    const filtered = languages.filter((lang) =>
      lang.toLowerCase().startsWith(val.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 10));
  }

  function handleSelect(lang: string) {
    onGuess(lang);
    setValue("");
    setSuggestions([]);
  }

  function handleSubmit() {
    if (!value.trim() || disabled) return;
    onGuess(value.trim());
    setValue("");
    setSuggestions([]);
  }

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Wpisz język programowania..."
          className="input"
          disabled={disabled}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className="button"
        >
          Zgadnij
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((lang) => (
            <li
              key={lang}
              onClick={() => handleSelect(lang)}
              className="suggestion-item"
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}