import { Language } from "./types";

let languagesCache: Language[] = [];

export async function loadLanguages(): Promise<void> {
  const res = await fetch("http://localhost:8080/languages");
  languagesCache = await res.json();
}

export function getLanguageData(name: string): Language | undefined {
  return languagesCache.find(lang => lang.name.toLowerCase() === name.toLowerCase());
}

export function getAllLanguageNames(): string[] {
  return languagesCache.map(lang => lang.name);
}