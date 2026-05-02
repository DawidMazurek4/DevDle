import { get } from "http";

export const dbUrl = process.env.BACKEND_URL;

export async function getLanguages(){
    var all_languages: string[] = []
    const res = await fetch(`${dbUrl}/languages`);
    const data = await res.json();
    all_languages = data;
    console.log(all_languages);
    return all_languages;
}