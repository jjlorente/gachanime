import { Resets } from '../ResetsComponent/Resets';
import './EyeGame.css';
import { useUserGames } from '../Games';
import { useState, useEffect } from 'react';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { Input } from '../InputComponent/Input';
import { findGameById, findUserGames, updateSelected } from '../../../../services/userGames';
import { Game } from '../../../Interfaces/GamesUser';
import { useTranslation } from 'react-i18next';

export const EyeGame = (props: any) => {
    const [finishedEyeGame, setFinishedEyeGame] = useState<boolean>();
    const { userGamesData, setUserGamesData, mode, setEyeTries } = useUserGames();
    const [gachasRecompensa, setGachasRecompensa] = useState<number>();
    const [statusReward, setStatusReward] = useState<number>(0);
    const [animesErrors, setAnimesErrors] = useState<Array<string>>([]);
    const [pjName, setPjName] = useState<string>();
    const [eyeSelected, setEyeSelected] = useState<number>();
    const [gameData, setGameData] = useState<Game>();
    const { i18n, t } = useTranslation();
    const { eyeTries } = useUserGames();
    const [srcImage, setSrc] = useState<string>();
    const [srcImageSolution, setSrcSolution] = useState<string>();

     useEffect(()=> {
        let arrayErrors;
        if(mode === 0) {
            arrayErrors = localStorage.getItem("arrayErrorsEye")
        } else if(mode === 1) {
            arrayErrors = localStorage.getItem("arrayErrorsEyeMedium")
        } else if(mode === 2) {
            arrayErrors = localStorage.getItem("arrayErrorsEyeHard")
        }

        if(!arrayErrors) {
            if(mode === 0) {
                localStorage.setItem("arrayErrorsEye", JSON.stringify([]));
            } else if(mode === 1) {
                localStorage.setItem("arrayErrorsEyeMedium", JSON.stringify([]));
            } else if(mode === 2) {
                localStorage.setItem("arrayErrorsEyeHard", JSON.stringify([]));
            }
        } else {
            if (finishedEyeGame === false || finishedEyeGame === undefined) {
                setAnimesErrors(JSON.parse(arrayErrors))
            } else if (finishedEyeGame === true) {
                setAnimesErrors([])
            }
        }
    },[ userGamesData , finishedEyeGame, mode ])

    useEffect(()=>{
        if(animesErrors && animesErrors.length > 0 && finishedEyeGame === false) {
            if(mode === 0) {
                localStorage.setItem("arrayErrorsEye", JSON.stringify(animesErrors));
            } else if(mode === 1) {
                localStorage.setItem("arrayErrorsEyeMedium", JSON.stringify(animesErrors));
            } else if(mode === 2) {
                localStorage.setItem("arrayErrorsEyeHard", JSON.stringify(animesErrors));
            }
        }
    }, [animesErrors])

    useEffect(()=>{
        const fetchData = async () => {
            if(userGamesData && mode !== null) {
                let loop = false;
                while(loop===false) {
                    loop = true;
                    await findEyeGame(userGamesData.eyeid[mode])
                    setEyeSelected(userGamesData.eyeSelected[mode])
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

    useEffect(()=>{
        if(gameData && userGamesData && mode !== null) {
            if(mode=== 0) {
                setPjName(gameData.names_game[userGamesData.eyeSelected[mode]])
            } else if(mode === 1) {
                setPjName(gameData.names_game_medium[userGamesData.eyeSelected[mode]])
            } else if(mode === 2) {
                setPjName(gameData.names_game_hard[userGamesData.eyeSelected[mode]])
            }
        }
    },[gameData])

    const findEyeGame = async (id:any) => {
        try {
            const data = await findGameById(id)
            if (data && mode !== null) {
                setGameData(data);
                if(userGamesData) {
                    if(mode === 0) {
                        setSrc(data.eye_game[userGamesData.eyeSelected[0]])
                        setSrcSolution(data.eye_solution[userGamesData.eyeSelected[0]])
                        setEyeTries(userGamesData.trieseye[0])
                    } else if(mode === 1) {
                        setSrc(data.eye_game_medium[userGamesData.eyeSelected[1]])
                        setSrcSolution(data.eye_solution_medium[userGamesData.eyeSelected[1]])
                        setEyeTries(userGamesData.trieseye[1])
                    } else if(mode === 2) {
                        setSrc(data.eye_game_hard[userGamesData.eyeSelected[2]])
                        setSrcSolution(data.eye_solution_hard[userGamesData.eyeSelected[2]])
                        setEyeTries(userGamesData.trieseye[2])
                    }
                    setFinishedEyeGame(userGamesData.finishedEye[mode]);
                    let dataTries = userGamesData.trieseye[mode] * 5;
                    if(dataTries >= 25) {
                        setGachasRecompensa(25)
                    } else {
                        setGachasRecompensa(50 - dataTries)
                    }

                    setStatusReward(userGamesData.statusRewardEye[mode])
                }

                const eyeLocal = localStorage.getItem("eyeSelected");
                if (userGamesData && userGamesData.eyeSelected[mode]) {
                    localStorage.setItem("eyeSelected", userGamesData.eyeSelected[mode].toString())
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container-imagegame'>      

            <Resets title={t('games.titleEye')} game={"eye"} finishedGame={finishedEyeGame} findGame={findEyeGame}/>

            <div className='container-image-center'>
                
                <div className={finishedEyeGame ? 'section-image-center eye-center-game-solution' : 'section-image-center eye-center-game'} style={{backgroundColor:"white", border:"solid black 2px"}}>        
                    {eyeSelected !== undefined ? 
                        <img className={finishedEyeGame ? "eye_img_solution" : "eye_game"} src={finishedEyeGame ? srcImageSolution : srcImage} alt="" />
                        :
                        <l-trefoil size="150" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
                    }       
                </div>

                {
                    finishedEyeGame === false ?    
                        null            
                        :
                        <span className='span-info-image'>{t('games.infoSpanWinEye')}</span>
                }

                {eyeTries && eyeTries >= 3 && finishedEyeGame === false ? 
                    <div className='container-imagegame-input'>
                        <span className='span-info-clue' style={{backgroundColor:"#d98c16"}}>
                            {t('games.span3Errors') + gameData?.anime_name}
                        </span>
                    </div>
                    :
                    <></>
                }

                <TriesReward statusReward={statusReward} setStatusReward={setStatusReward} finishedGame={finishedEyeGame} setGachasRecompensa={setGachasRecompensa} gachasRecompensa={gachasRecompensa} game={"eye"}/>
            
            </div>
            
            <div className='container-imagegame-input'>

                {
                    finishedEyeGame === false ?    
                        <span className='span-info-image'>{t('games.infoSpanEye')}</span>
                        :
                        null
                }

                <Input setGachasRecompensa={setGachasRecompensa} setAnimesErrors={setAnimesErrors} finishedGame={finishedEyeGame} solution={pjName} game={"eye"} setFinishedGame={setFinishedEyeGame} setStatusReward={setStatusReward} />
            
            </div>

            {animesErrors && finishedEyeGame === false ? 
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
