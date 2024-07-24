export interface GameData {
    userid: string;
    nameid: string;
    imageid: string;
    triesname: number;
    triesimage: number;
}

export interface Game {
    names_game: Array<string>;
    anime_name: string;
    image_game: Array<string>;
}