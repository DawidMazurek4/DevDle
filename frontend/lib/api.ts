const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ?? "";

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(errorBody || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function getLanguages(): Promise<string[]> {
  return fetchJson<string[]>(`${backendUrl}/languages`);
}

export async function newGame(): Promise<[number, string]> {
  const data = await fetchJson<{ game_id: number; session_key: string }>(
    `${backendUrl}/game`
  );
  return [data.game_id, data.session_key];
}

export async function guessLanguage(
  languageName: string,
  gameid: number,
  sessionKey: string
): Promise<{ language: any; result: any }> {
  if (gameid === 0 || sessionKey === "") {
    throw new Error("Game not started. Start a new game first.");
  }

  return fetchJson(`${backendUrl}/guess`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: languageName,
      game_id: gameid,
      session_key: sessionKey,
    }),
  });
}

