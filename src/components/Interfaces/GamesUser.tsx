export interface GameData {
    userid: string;
    nameid: string;
    imageid: string;
    siluetaid: string;
    triesname: number;
    triesimage: number;
    triessilueta: number;
    finishedImage: boolean,
    finishedName: boolean,
    finishedSilueta: boolean,
    resets: number,
    statusRewardImage: number,
    statusRewardName: number,
    statusRewardSilueta: number,
    imageSelected: number,
    siluetaSelected: number
}

export interface Game {
    names_game: Array<string>;
    anime_name: string;
    image_game: Array<string>;
    silueta_game: Array<string>;
    silueta_solution: Array<string>;
}