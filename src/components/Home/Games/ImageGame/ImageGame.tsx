import './ImageGame.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { findGameImageById, updateGameUser, updateReward, resetGame, updateImageSelected} from '../../../../services/userGames';
import { GameData, Game } from '../../../Interfaces/GamesUser';
import { trefoil } from 'ldrs';
import { useUserGachas } from "../../Home";
import { useUserGames } from '../Games';

export const ImageGame = (props: any) => {
    const { userGachas, setUserGachas } = useUserGachas();
    const { resets, setResets, imageTries, setImageTries, userGamesData, setUserGamesData } = useUserGames();

    const animeArray = [
        "Frieren: Beyond Journeys End",
        "One Piece",
        "Kaiju No. 8",
        "Demon Slayer: Kimetsu No Yaiba",
        "My Hero Academia",
        "Jujutsu Kaisen",
        "Chainsaw Man",
        "Blue Lock",
        "Hell's Paradise",
        "Spy x Family",
        "Attack on Titan: The Final Season",
        "Vinland Saga",
        "Re:Zero - Starting Life in Another World",
        "Mob Psycho 100",
        "Tokyo Revengers",
        "The Rising of the Shield Hero",
        "Dr. Stone",
        "Horimiya",
        "Kubo Won't Let Me Be Invisible",
        "Oshi no Ko",
        "Grand Blue",
        "Mushoku Tensei: Jobless Reincarnation",
        "Made in Abyss",
        "The Eminence in Shadow",
        "Welcome to Demon School! Iruma-kun",
        "Bocchi the Rock!",
        "Arknights: Reimei Zensou",
        "The Devil is a Part-Timer! Season 2",
        "Sk8 the Infinity",
        "Cyborg 009: Call of Justice",
        "The World’s Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
        "Tomo-chan Is a Girl!",
        "KonoSuba: An Explosion on This Wonderful World!",
        "Akiba Maid War",
        "The Ancient Magus' Bride",
        "Sabikui Bisco",
        "A Couple of Cuckoos",
        "The Orbital Children",
        "Rebirth",
        "Hoshikuzu Telepath",
        "The Legend of Heroes: Sen no Kiseki Northern War",
        "Kage no Jitsuryokusha ni Naritakute!",
        "The Yakuza’s Guide to Babysitting",
        "Bastard!! - Ankoku no Hakaishin",
        "Coppelion",
        "To Your Eternity",
        "So I'm a Spider, So What?",
        "Komi Can’t Communicate",
        "Mairimashita, Iruma-kun",
        "The Great Jahy Will Not Be Defeated!",
        "Yofukashi no Uta",
        "Tsukimichi -Moonlit Fantasy-",
        "Joran: The Princess of Snow and Blood",
        "Koi wa Sekai Seifuku no Ato de",
        "Shaman King (2021)",
        "Shoujo Kageki Revue Starlight",
        "Fate/Grand Order: Camelot",
        "The Quintessential Quintuplets",
        "Vinland Saga",
        "Mushoku Tensei: Jobless Reincarnation",
        "Beastars",
        "Keep Your Hands Off Eizouken!",
        "Wonder Egg Priority",
        "Great Pretender",
        "Aggretsuko",
        "Dorohedoro",
        "Promare",
        "Kengan Ashura",
        "Higehiro: After Being Rejected, I Shaved and Took in a High School Runaway",
        "Maou Gakuin no Futekigousha",
        "Astra Lost in Space",
        "Ousama Ranking",
        "Kakegurui",
        "InuYasha",
        "Made in Abyss",
        "Koi to Yobu ni wa Kimochi Warui",
        "The Rising of the Shield Hero",
        "Fate/Grand Order: Camelot",
        "Kaguya-sama: Love is War",
        "Citrus",
        "Kuroko's Basketball",
        "Nodame Cantabile",
        "A Place Further than the Universe",
        "Gintama",
        "My Senpai is Annoying",
        "Akame ga Kill!",
        "A Silent Voice",
        "Blue Exorcist",
        "JoJo's Bizarre Adventure",
        "Attack on Titan",
        "Sword Art Online",
        "Black Clover",
        "The Promised Neverland",
        "No Game No Life",
        "Noragami",
        "KonoSuba: God's Blessing on This Wonderful World!",
        "Re:Creators",
        "Tengen Toppa Gurren Lagann",
        "Cowboy Bebop",
        "Samurai Champloo",
        "Steins;Gate",
        "Psycho-Pass",
        "Death Parade",
        "Parasyte: The Maxim",
        "Durarara!!",
        "Hellsing Ultimate",
        "Baccano!",
        "Elfen Lied",
        "Toradora!",
        "Anohana: The Flower We Saw That Day",
        "Angel Beats!",
        "Clannad",
        "Little Busters!",
        "March Comes in Like a Lion",
        "K-On!",
        "Spice and Wolf",
        "Nana",
        "March Comes in Like a Lion",
        "Vinland Saga",
        "Golden Kamuy",
        "Mob Psycho 100",
        "Fruits Basket",
        "March Comes in Like a Lion",
        "Natsume's Book of Friends",
        "Anohana: The Flower We Saw That Day",
        "Made in Abyss",
        "The Rising of the Shield Hero",
        "Re:Zero",
        "Hinamatsuri",
        "Fate/Stay Night: Unlimited Blade Works",
        "The Tatami Galaxy",
        "Houseki no Kuni",
        "Mononoke",
        "Princess Tutu",
        "Little Witch Academia",
        "Mushishi",
        "Wolf's Rain",
        "Yuri on Ice",
        "The Ancient Magus' Bride",
        "Hellsing",
        "D.Gray-man",
        "Blue Exorcist",
        "Kekkaishi",
        "Bungou Stray Dogs",
        "The Devil is a Part-Timer!",
        "March Comes in Like a Lion",
        "The Promised Neverland",
        "Black Clover",
        "Attack on Titan",
        "Noragami",
        "JoJo's Bizarre Adventure",
        "Made in Abyss",
        "KonoSuba",
        "Steins;Gate",
        "Psycho-Pass",
        "Death Parade",
        "Gintama",
        "Space Dandy",
        "Cyborg 009",
        "Kiznaiver",
        "Sakamoto Desu Ga?",
        "D.Gray-man",
        "Wotakoi: Love is Hard for Otaku",
        "The Rising of the Shield Hero",
        "The Devil is a Part-Timer!",
        "Yuri!!! on ICE",
        "Little Witch Academia",
        "Kakegurui",
        "Inuyasha",
        "Nodame Cantabile",
        "Great Pretender",
        "Aggretsuko",
        "Coppelion",
        "Kage no Jitsuryokusha ni Naritakute!",
        "The Legend of Heroes: Sen no Kiseki Northern War",
        "A Couple of Cuckoos",
        "The Orbital Children",
        "Rebirth",
        "Hoshikuzu Telepath",
        "Tomo-chan Is a Girl!",
        "KonoSuba: An Explosion on This Wonderful World!",
        "Akiba Maid War",
        "Sabikui Bisco",
        "A Couple of Cuckoos",
        "The Orbital Children",
        "Rebirth",
        "Hoshikuzu Telepath"
      ];
      
    library.add(faRotateRight);
    trefoil.register();

    const [finishedImageGame, setFinishedImageGame] = useState<boolean>();
    const [gameImageData, setGameImageData] = useState<Game>();
    const [imgSelected, setImgSelected] = useState<number>();
    const [animeNameImage, setAnimeNameImage] = useState<string>();
    const [animesSuggested, setAnimesSuggested] = useState<Array<string>>([]);
    const [animesErrors, setAnimesErrors] = useState<Array<string>>([]);
    const [valueInput, setValueInput] = useState<string>("");
    const [zoomImage, setZoomImage] = useState<string>("500%");
    const [gachasRecompensa, setGachasRecompensa] = useState<number>();
    const [statusReward, setStatusReward] = useState<number>();

    useEffect(()=> {
        let arrayErrors = localStorage.getItem("arrayErrorsImage");
        if(!arrayErrors) {
            localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
        } else {
            setAnimesErrors(JSON.parse(arrayErrors))
        }
    },[userGamesData])

    useEffect(()=>{
        if(animesErrors && animesErrors.length > 0) {
            localStorage.setItem("arrayErrorsImage", JSON.stringify(animesErrors));
        }
    }, [animesErrors])

    const findImageGame = async (id:any) => {
        try {
            const data = await findGameImageById(id)
            if (data) {
                setAnimeNameImage(data.anime_name);
                setGameImageData(data);
                if(userGamesData) {
                    setFinishedImageGame(userGamesData.finishedImage);
                    if(userGamesData.finishedImage === true) {
                        setZoomImage("100%")
                    } else {
                        let zoom = userGamesData.triesimage * 25;
                        if (zoom >= 400) {
                            setZoomImage("100%")
                        } else {
                            zoom = 500 - zoom;
                            setZoomImage(zoom+"%")
                        }
                    }

                    let dataTries = userGamesData.triesimage * 20
                    if(dataTries>= 400) {
                        setGachasRecompensa(100)
                    } else {
                        setGachasRecompensa(500-dataTries)
                    }

                    setStatusReward(userGamesData.statusRewardImage)
                }
                const randomIndex = Math.floor(Math.random() * data.image_game.length);
                const imageLocal = localStorage.getItem("imgSelected");

                if (userGamesData && userGamesData.imageSelected) {
                    localStorage.setItem("imgSelected", userGamesData.imageSelected.toString())
                } else if (userGamesData && userGamesData.imageSelected === undefined && !imageLocal) {
                    const dataImageSelected = await updateImageSelected(userGamesData.userid, randomIndex);
                    setUserGamesData(dataImageSelected);
                    localStorage.setItem("imgSelected", randomIndex.toString())
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    const changeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {

        const regex = /^[a-zA-Z0-9\s]*$/; 
        if (regex.test(e.target.value)) {
            setValueInput(e.target.value)
            if(e.target.value==="") {
                setAnimesSuggested([]);
                return
            }
            const inputValue = e.target.value.toLowerCase();
            const results = animeArray.filter((anime) =>
            anime.toLowerCase().includes(inputValue)
            );
            setAnimesSuggested(results);
        }
    };

    const handleClickAnime = async (e: React.MouseEvent<HTMLInputElement>) => {
        const value = e.currentTarget.textContent;
        setAnimesSuggested([])
        if(value === animeNameImage) {
            if(userGamesData) {
                const data = await updateGameUser(userGamesData.userid, true, 0, 0, 1);
                setFinishedImageGame(data.finishedImage);
                setStatusReward(data.statusRewardImage);
                setZoomImage("100%");

                let alertGame = localStorage.getItem("alerts");
                if (alertGame) {
                  let arrayAlerts = JSON.parse(alertGame);
                  arrayAlerts.push("games");
                  localStorage.setItem("alerts", JSON.stringify(arrayAlerts));
                  setAlerts(arrayAlerts);
                } else {
                  localStorage.setItem("alerts", JSON.stringify(["games"]));
                  setAlerts(["games"]);
                }

            }
        } else {
            if (value) {
                setAnimesErrors(prevAnimes => [ ...prevAnimes, value ]);
            }
            if(userGamesData) {
                const data = await updateGameUser(userGamesData.userid, false, 1, 0, 0);
                if (data) {
                    setImageTries(data.triesimage);
                    let zoomActual = parseInt(zoomImage.split("%")[0]);
                    let zoomRest = data.triesimage * 25;
                    if (zoomRest <= 400) {
                        zoomActual = 500 - zoomRest;
                        setZoomImage(zoomActual+"%");
                    } else {
                        setZoomImage("100%");
                    }

                    let dataTries = data.triesimage * 20
                    if(dataTries>= 400) {
                        setGachasRecompensa(100)
                    } else {
                        setGachasRecompensa(500-dataTries)
                    }
                }
            }
        }
        setValueInput("")
    };

    useEffect(()=>{
        if(userGamesData) {
            findImageGame(userGamesData.imageid)

            setImgSelected(userGamesData.imageSelected)
        }
    },[userGamesData])

    const { alerts, setAlerts } = useUserGachas();
    const claimReward = async () => {
        if(userGamesData && gachasRecompensa) {
            const data = await updateReward(userGamesData.userid, gachasRecompensa, 2)
            if(data) {
                let gachas = data[1].gachas;
                setUserGachas(gachas);
                setStatusReward(data[0].statusRewardImage);
            }
        }
        let alertGame = localStorage.getItem("alerts");
        if (alertGame) {
            let arrayAlerts = JSON.parse(alertGame);
            let index = arrayAlerts.indexOf("games");
            if (index !== -1) {
            arrayAlerts.splice(index, 1);
            localStorage.setItem("alerts", JSON.stringify(arrayAlerts));
            }
            setAlerts(arrayAlerts);
        }
    }


    const resetGameClick = async () => {
        if(userGamesData) {
            const data = await resetGame(userGamesData.userid, "image");
            if(data) {
                setResets(data.resets);
                const dataImg = await findGameImageById(data.imageid)
                if(dataImg) {
                    const randomIndex = Math.floor(Math.random() * dataImg.image_game.length);
                    localStorage.setItem("imgSelected", randomIndex.toString());
                    const dataImage = await updateImageSelected(userGamesData.userid, randomIndex);
                    if(dataImage) {
                        setUserGamesData(dataImage);
                        findImageGame(dataImage.imageid)
                    }
                }
            }
        }
    }

    return (
        <div className='container-imagegame'>
            <div className='header-imagegame'>
                <h1 className='title-imagegame'>
                    ¿De que anime es la imagen?
                </h1>
                <span className={resets === 0 || finishedImageGame === true ? "resets-empty" : "gachas-resets"} onClick={resets === 0 || finishedImageGame ? undefined : resetGameClick}>
                    <>
                        {resets} / 5
                        <FontAwesomeIcon icon={faRotateRight} className={resets === 0 || finishedImageGame === true ? "" : "refresh"} />  
                    </>
                </span>     
            </div>
            <div className='container-image-center'>
                <div className='section-image-center image-center-game'>        
                    {imgSelected !== undefined ? 
                        <img className='img-game' width={zoomImage} height={"auto"} src={ gameImageData?.image_game[imgSelected] } alt="" />
                        :
                        <l-trefoil size="200" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
                    }       
                </div>
                <div className='container-tries-image'>
                    <span className='gachas-recompensa-active'>
                        <>
                            Intentos fallidos: {imageTries === 0 ? 0 : imageTries}
                        </>
                    </span>  
                    {(gachasRecompensa && (statusReward === 1 || statusReward === 0)) ? (
                        <span onClick={finishedImageGame === true && statusReward === 1 ? claimReward : undefined} className={finishedImageGame === true ? 'gachas-recompensa-active-click' : 'gachas-recompensa-inactive'}>
                            {"Reclamar recompensa: " + gachasRecompensa}
                            <img src='../../home/summon-w.png' alt="Logo Summon" className='logo-summon-w' />
                            {statusReward === 1 ? (
                                <span className='reward-icon'></span>
                            ) : null}
                        </span>
                    ) : statusReward === 2 ? (
                        <span className='gachas-recompensa-active'>
                            {"Recompensa reclamada"}
                        </span>
                    ) : null}
                </div>
            </div>
            <div className='container-imagegame-input'>
                <span className='span-info-image'>Cada intento fallido aleja un poco la imágen y pierdes 20 gachas de la recompensa final.</span>
                {finishedImageGame !== undefined && (
                    finishedImageGame === false ? (
                        <>
                            <input
                                type="text"
                                className="input-imagegame jaro-regular"
                                maxLength={50}
                                placeholder="Nombre del anime..."
                                onChange={changeInputName}
                                value={valueInput}
                            />
                            {animesSuggested && animesSuggested.length > 0 ? (
                                <div className="container-suggested">
                                    {animesSuggested.map((anime, index) => (
                                        <span
                                            className="anime-suggested anime-name"
                                            key={index}
                                            onClick={handleClickAnime}
                                        >
                                            {anime}
                                        </span>
                                    ))}
                                </div>
                            ) : valueInput !== "" ? (
                                <div className="container-suggested">
                                    <span className="anime-suggested">
                                        No hay animes con este nombre...
                                    </span>
                                </div>
                            ) : null}
                        </>
                    ) : finishedImageGame === true ? (
                        <span className="anime-correct">{animeNameImage}</span>
                    ) : null
                )}
            </div>
            {animesErrors && finishedImageGame === false ? 
                <div className='errors-imagegame'>
                    {animesErrors.slice().reverse().map((anime, index) => (
                        <span key={index + "error"} className='error-span-image' style={{fontSize:"1.3rem"}}>{anime}</span>
                    ))}
                </div>
                :
                <></>
            }
        </div>
    )
}
