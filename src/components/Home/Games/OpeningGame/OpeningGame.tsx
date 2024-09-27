import { findGameById, findUserGames, updateSelected } from '../../../../services/userGames';
import { useState, useEffect } from 'react';
import './OpeningGame.css'
import { useUserGames } from '../Games';
import { Game } from '../../../Interfaces/GamesUser';
import { Resets } from '../ResetsComponent/Resets';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { Input } from '../InputComponent/Input';
import ReactAudioPlayer from 'react-audio-player';
import { useTranslation } from 'react-i18next';

export const OpeningGame = () => {
    const { userGamesData, setUserGamesData, mode, setOpeningTries } = useUserGames();
    const {i18n, t} = useTranslation();
    const { openingTries } = useUserGames();

    const [finishedOpeningGame, setFinishedOpeningGame] = useState<boolean>();
    const [gameOpeningData, setGameOpeningData] = useState<Game>();
    const [openingSelected, setOpeningSelected] = useState<number>();
    const [animeNameImage, setAnimeNameImage] = useState<string>();
    const [animeSong, setAnimeSong] = useState<string>();
    const [linkYT, setLinkYT] = useState<string>();
    const [base64Audio, setBase64Audio] = useState<string>();
    const [openingErrors, setOpeningErrors] = useState<Array<string>>([]);
    const [gachasRecompensa, setGachasRecompensa] = useState<number>();
    const [statusReward, setStatusReward] = useState<number>();

      useEffect(()=> {
        let arrayErrors;
        if(mode === 0) {
            arrayErrors = localStorage.getItem("arrayErrorsOpening")
        } else if(mode === 1) {
            arrayErrors = localStorage.getItem("arrayErrorsOpeningMedium")
        } else if(mode === 2) {
            arrayErrors = localStorage.getItem("arrayErrorsOpeningHard")
        }

        if(!arrayErrors) {
            if(mode === 0) {
                localStorage.setItem("arrayErrorsOpening", JSON.stringify([]));
            } else if(mode === 1) {
                localStorage.setItem("arrayErrorsOpeningMedium", JSON.stringify([]));
            } else if(mode === 2) {
                localStorage.setItem("arrayErrorsOpeningHard", JSON.stringify([]));
            }
        } else {
            if (finishedOpeningGame === false || finishedOpeningGame === undefined) {
                setOpeningErrors(JSON.parse(arrayErrors))
            } else if (finishedOpeningGame === true) {
                setOpeningErrors([])
            }
        }
    },[ userGamesData , finishedOpeningGame, mode ])

    useEffect(()=>{
        if(openingErrors && openingErrors.length > 0 && finishedOpeningGame === false) {
            if(mode === 0) {
                localStorage.setItem("arrayErrorsOpening", JSON.stringify(openingErrors));
            } else if(mode === 1) {
                localStorage.setItem("arrayErrorsOpeningMedium", JSON.stringify(openingErrors));
            } else if(mode === 2) {
                localStorage.setItem("arrayErrorsOpeningHard", JSON.stringify(openingErrors));
            }
        }
    }, [openingErrors])

    useEffect(()=>{
        const fetchData = async () => {
            if(userGamesData && mode !== null) {
                let loop = false;
                while(loop===false) {
                    loop = true;
                    await findOpeningGame(userGamesData.openingid[mode])
                    setOpeningSelected(userGamesData.openingSelected[mode])
                }
            }
        }
        fetchData();
    },[userGamesData, mode])

    useEffect(()=>{
        const fetchData = async () => {
            if(userGamesData && mode !== null) {
                let loop = false;
                const idUser = localStorage.getItem("_id");
                if (idUser) {
                    while(loop===false) {
                        loop = true;
                        const data = await findUserGames(idUser);
                        setUserGamesData(data);
                    }
                }
            }
        }
        fetchData();
    },[mode])

    const findOpeningGame = async (id:any) => {
        try {
            const data = await findGameById(id);
            if (data && mode !== null) {
                setAnimeNameImage(data.anime_name);
                
                setGameOpeningData(data);
                if(userGamesData) {
                    if(data.opening_solutions !== undefined) {
                        let numOpeningName = userGamesData.openingSelected[mode]*2;
                        let numOpeningLink = numOpeningName + 1;

                        setAnimeSong(data.opening_solutions[mode][numOpeningName]);
                        setLinkYT(data.opening_solutions[mode][numOpeningLink]);
                    } 
                    if(mode === 0) {
                        setBase64Audio("data:audio/wav;base64,"+data.opening[userGamesData.openingSelected[0]]);
                        setOpeningTries(userGamesData.triesopening[0])
                    } else if(mode === 1) {
                        setBase64Audio("data:audio/wav;base64,"+data.opening_medium[userGamesData.openingSelected[1]]);
                        setOpeningTries(userGamesData.triesopening[1])
                    } else if(mode === 2) {
                        setBase64Audio("data:audio/wav;base64,"+data.opening_hard[userGamesData.openingSelected[2]]);
                        setOpeningTries(userGamesData.triesopening[2])
                    }
                }
                if(userGamesData) {
                    setFinishedOpeningGame(userGamesData.finishedOpening[mode]);
                    let dataTries = userGamesData.triesopening[mode] * 5
                    if(dataTries >= 25) {
                        setGachasRecompensa(25)
                    } else {
                        setGachasRecompensa(50 - dataTries)
                    }

                    setStatusReward(userGamesData.statusRewardOpening[mode])
                }

                const openingLocal = localStorage.getItem("openingSelected");
                if (userGamesData && userGamesData.openingSelected[mode]) {
                    localStorage.setItem("openingSelected", userGamesData.openingSelected[mode].toString());
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const audioElement = document.getElementById('audio');
        if (audioElement) {
            audioElement.removeAttribute('title');
        }
    }, [gameOpeningData]);

    return (
        <div className='container-imagegame'>

        <Resets title={t('games.titleOpening')} game={"opening"} finishedGame={finishedOpeningGame} findGame={findOpeningGame}/>
            <div className='container-image-center'>
                {gameOpeningData !== undefined && base64Audio !== undefined && finishedOpeningGame === false ? 
                    <ReactAudioPlayer
                        id="audio"
                        src={base64Audio}
                        className="audio-player jaro-regular"
                        controls
                    />
                    :
                    linkYT ? 
                        <iframe 
                            width="100%" 
                            height="315" 
                            src={`https://www.youtube.com/embed/${linkYT}?controls=1&modestbranding=1&rel=0&autoplay=0&showinfo=0&iv_load_policy=3&disablekb=1`} 
                            allow="autoplay; encrypted-media" 
                            allowFullScreen
                        ></iframe>                    
                    :
                        <l-trefoil size="200" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
                }       
            </div>

            {
                finishedOpeningGame === true ?    
                    <span className='span-info-image'>{t('games.infoSpanOpeningCorrect')}</span>
                    :
                    null
            }

            <TriesReward statusReward={statusReward} setStatusReward={setStatusReward} finishedGame={finishedOpeningGame} setGachasRecompensa={setGachasRecompensa} gachasRecompensa={gachasRecompensa} game={"opening"}/>
        
        <div className='container-imagegame-input'>
            {
                    finishedOpeningGame === true ?  
                        null  
                        :
                        <span className='span-info-image'>{t('games.infoSpanOpening')}</span>
            }
            <Input setGachasRecompensa={setGachasRecompensa} setAnimesErrors={setOpeningErrors} finishedGame={finishedOpeningGame} solution={animeNameImage} song={animeSong} game={"opening"} setFinishedGame={setFinishedOpeningGame} setStatusReward={setStatusReward} />
        </div>
        {openingErrors && finishedOpeningGame === false ? 
            <div className='errors-imagegame'>
                {openingErrors.slice().reverse().map((anime, index) => (
                    <span key={index + "error"} className='error-span-image' style={{fontSize:"1.3rem"}}>{anime}</span>
                ))}
            </div>
            :
            <></>
        }
        </div>
    )
}
