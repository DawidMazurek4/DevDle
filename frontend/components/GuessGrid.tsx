import { Language, GuessResponse } from "@/lib/types";
import GuessRow from "./GuessRow";

type Props = {
  guesses: Language[];
  results: GuessResponse[];
  answer: Language;
};

export default function GuessGrid({ guesses, results, answer }: Props) {
  const reversedGuesses = [...guesses].reverse();
  const reversedResults = [...results].reverse();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {reversedGuesses.map((guess, i) => (
        <GuessRow key={guesses.length - 1 - i} guess={guess} result={reversedResults[i]} />
      ))}
    </div>
  );
}