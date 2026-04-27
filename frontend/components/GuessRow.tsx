import { Language, GuessResponse } from "@/lib/types";

type Props = {
  guess: Language;
  result: GuessResponse;
};

export default function GuessRow({ guess, result }: Props) {
  const getYearDisplay = (yearResult: number) => {
    if (yearResult === 1) return "✅";
    if (yearResult === -1) return "⬆️";
    if (yearResult === 0) return "⬇️";
    return "";
  };

  const getStatusClass = (value: string) => {
    return value === "1" ? "correct-green" : "incorrect-red";
  };

  return (
    <div className="table-row">
      <div className="cell">{guess.name}</div>
      <div className="year-cell">
        <span>{guess.year}</span>
        <span className="year-arrow">{getYearDisplay(result.year)}</span>
      </div>
      <div className={`cell ${getStatusClass(result.typing)}`}>
        {guess.typing}
      </div>
      <div className={`cell ${getStatusClass(result.paradigm)}`}>
        {guess.paradigm}
      </div>
      <div className={`cell ${getStatusClass(result.mainUsage)}`}>
        {guess.mainUsage}
      </div>
      <div className={`cell ${getStatusClass(result.executionType)}`}>
        {guess.executionType}
      </div>
      <div className={`cell ${getStatusClass(result.languageLevel)}`}>
        {guess.languageLevel}
      </div>
    </div>
  );
}