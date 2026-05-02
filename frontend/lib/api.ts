export const dbUrl = process.env.BACKEND_URL;

export function getLanguages(){
    var all_languages: string[] = []
    fetch(`${dbUrl}/languages`).then(res => res.json()).then(data => {
        console.log(data);
        all_languages = data;
    }).catch(err => {
        console.error(err);
    });
    return all_languages;
}