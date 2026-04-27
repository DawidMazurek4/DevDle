import { getAllLanguageNames, loadLanguages } from "./languagesCache";

let cachedNames: string[] = [];

export async function getLanguages(): Promise<string[]> {
  if (cachedNames.length === 0) {
    await loadLanguages();
    cachedNames = getAllLanguageNames();
  }
  return cachedNames;
}