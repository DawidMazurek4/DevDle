export const dbUrl = process.env.BACKEND_URL;

export async function getLanguages(){
    var all_languages: string[] = []
    const res = await fetch(`${dbUrl}/languages`);
    const data = await res.json();
    all_languages = data;
    console.log(all_languages);
    return all_languages;
}

export async function newGame(){
    const res = await fetch(`${dbUrl}/game`);
    const data = await res.json();
    data.game_id = parseInt(data.game_id);
    return [data.game_id, data.session_key];
}

export async function guessLanguage(languageName: string, gameid: number, sessionKey: string){
    if (gameid === 0 || sessionKey === "") {
        throw new Error("Game not initialized. Please start a new game first.");
    }
    const res = await fetch(`${dbUrl}/guess`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            language: languageName,
            game_id: gameid,
            session_key: sessionKey
        })
    });
    const data = await res.json();
    return data;
}

