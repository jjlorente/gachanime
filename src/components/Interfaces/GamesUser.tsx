export interface GameData {
    userid: string;
    nameid: string;
    imageid: string;
    triesname: number;
    triesimage: number;
    finishedImage: boolean,
    finishedName: boolean,
    resets: number,
    statusRewardImage: number,
    statusRewardName: number,
    imageSelected: number
}

export interface Game {
    names_game: Array<string>;
    anime_name: string;
    image_game: Array<string>;
}