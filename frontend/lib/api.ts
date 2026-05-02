import { get } from "http";

// export const dbUrl = process.env.BACKEND_URL;
export const dbUrl = "http://localhost:8080";
export var gameid: number = 0;
export var sessionKey: string = "";
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
    gameid = data.game_id;
    sessionKey = data.session_key;
    return data;
}

newGame().then(() => {
    console.log(`Game ID: ${gameid}, Session Key: ${sessionKey}`);
});
