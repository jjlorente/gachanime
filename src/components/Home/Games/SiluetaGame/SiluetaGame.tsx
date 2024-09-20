import { Resets } from '../ResetsComponent/Resets'
import './SiluetaGame.css'
import { useUserGames } from '../Games';
import { useState, useEffect } from 'react';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { Input } from '../InputComponent/Input';
import { findGameById, findUserGames, updateSelected } from '../../../../services/userGames';
import { Game } from '../../../Interfaces/GamesUser';
import { useTranslation } from 'react-i18next';

export const SiluetaGame = (props: any) => {
    const [finishedSiluetaGame, setFinishedSiluetaGame] = useState<boolean>();
    const { userGamesData, setUserGamesData, findAllGamesUser, mode, setSiluetaTries } = useUserGames();
    const [gachasRecompensa, setGachasRecompensa] = useState<number>();
    const [statusReward, setStatusReward] = useState<number>(0);
    const [animesErrors, setAnimesErrors] = useState<Array<string>>([]);
    const [pjName, setPjName] = useState<string>();
    const [siluetaSelected, setSiluetaSelected] = useState<number>();
    const [gameData, setGameData] = useState<Game>();
    const [srcImage, setSrc] = useState<string>();
    const [srcImageSolution, setSrcSolution] = useState<string>();

    const { t } = useTranslation();
    const { siluetaTries } = useUserGames();

    useEffect(() => {
        const idUser = localStorage.getItem("_id");
        if (idUser) {
          findAllGamesUser(idUser);
        }
      }, []);

    useEffect(()=> {
        let arrayErrors;
        if(mode === 0) {
            arrayErrors = localStorage.getItem("arrayErrorsSilueta")
        } else if(mode === 1) {
            arrayErrors = localStorage.getItem("arrayErrorsSiluetaMedium")
        } else if(mode === 2) {
            arrayErrors = localStorage.getItem("arrayErrorsSiluetaHard")
        }

        if(!arrayErrors) {
            if(mode === 0) {
                localStorage.setItem("arrayErrorsSilueta", JSON.stringify([]));
            } else if(mode === 1) {
                localStorage.setItem("arrayErrorsSiluetaMedium", JSON.stringify([]));
            } else if(mode === 2) {
                localStorage.setItem("arrayErrorsSiluetaHard", JSON.stringify([]));
            }
        } else {
            if (finishedSiluetaGame === false || finishedSiluetaGame === undefined) {
                setAnimesErrors(JSON.parse(arrayErrors))
            }
        }
    },[userGamesData, mode])

    useEffect(()=>{
        if(animesErrors && animesErrors.length > 0 && finishedSiluetaGame === false) {
            if(mode === 0) {
                localStorage.setItem("arrayErrorsSilueta", JSON.stringify(animesErrors));
            } else if(mode === 1) {
                localStorage.setItem("arrayErrorsSiluetaMedium", JSON.stringify(animesErrors));
            } else if(mode === 2) {
                localStorage.setItem("arrayErrorsSiluetaHard", JSON.stringify(animesErrors));
            }
        }
    }, [animesErrors])

    useEffect(()=>{
        const fetchData = async () => {
            if(userGamesData && mode !== null) {
                let loop = false;
                while(loop===false) {
                    loop = true;
                    await findSiluetaGame(userGamesData.siluetaid[mode])
                    setSiluetaSelected(userGamesData.siluetaSelected[mode])
                    
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
                setPjName(gameData.names_game[userGamesData.siluetaSelected[mode]])
            } else if(mode === 1) {
                setPjName(gameData.names_game_medium[userGamesData.siluetaSelected[mode]])
            } else if(mode === 2) {
                setPjName(gameData.names_game_hard[userGamesData.siluetaSelected[mode]])
            }
        }
    },[gameData])

    const findSiluetaGame = async (id:any) => {
        try {
            const data = await findGameById(id)
            
            if (data && mode !== null) {
                setGameData(data);
                if(userGamesData) {

                    if(mode === 0) {
                        setSrc(data.silueta_game[userGamesData.siluetaSelected[0]])
                        setSrcSolution(data.silueta_solution[userGamesData.siluetaSelected[0]])
                        console.log("Tries: " + userGamesData.triessilueta)
                        setSiluetaTries(userGamesData.triessilueta[0])
                    } else if(mode === 1) {
                        setSrc(data.silueta_game_medium[userGamesData.siluetaSelected[1]])
                        setSrcSolution(data.silueta_solution_medium[userGamesData.siluetaSelected[1]])
                        setSiluetaTries(userGamesData.triessilueta[1])
                    } else if(mode === 2) {
                        setSrc(data.silueta_game_hard[userGamesData.siluetaSelected[2]])
                        setSrcSolution(data.silueta_solution_hard[userGamesData.siluetaSelected[2]])
                        setSiluetaTries(userGamesData.triessilueta[2])
                    }
                    setFinishedSiluetaGame(userGamesData.finishedSilueta[mode]);
                    let dataTries = userGamesData.triessilueta[mode] * 5;
                    if(dataTries >= 25) {
                        setGachasRecompensa(25)
                    } else {
                        setGachasRecompensa(50 - dataTries)
                    }

                    setStatusReward(userGamesData.statusRewardSilueta[mode])
                }

                const siluetaLocal = localStorage.getItem("siluetaSelected");
                if (userGamesData && userGamesData.siluetaSelected[mode]) {
                    localStorage.setItem("siluetaSelected", userGamesData.siluetaSelected[mode].toString())
                } else if (userGamesData && !siluetaLocal) {
                    const dataSiluetaSelected = await updateSelected(userGamesData.userid, "silueta", mode);
                    setUserGamesData(dataSiluetaSelected);
                    localStorage.setItem("siluetaSelected", dataSiluetaSelected.siluetaSelected[mode])
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container-imagegame'>      

            <Resets title={t('games.titleSilueta')} game={"silueta"} finishedGame={finishedSiluetaGame} findGame={findSiluetaGame}/>

            <div className='container-image-center'>
                
                <div className='section-image-center image-center-game' style={{backgroundColor:"white", border:"solid black 2px"}}>        
                    {siluetaSelected !== undefined ? 
                        <img 
                        className='img-game' 
                        width={"auto"} 
                        height={"100%"} 
                        src={finishedSiluetaGame ? srcImageSolution : srcImage}
                        alt="Game image" 
                    />
                    
                        :
                        <l-trefoil size="200" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
                    }       
                </div>

                {
                    finishedSiluetaGame === false ?    
                        null            
                        :
                        <span className='span-info-image'>{t('games.infoSpanWinSilueta')}</span>
                }

                {siluetaTries && siluetaTries >= 3 && finishedSiluetaGame === false ? 
                    <div className='container-imagegame-input'>
                        <span className='span-info-clue' style={{backgroundColor:"#d98c16"}}>
                            {t('games.span3Errors') + gameData?.anime_name}
                        </span>
                    </div>
                    :
                    <></>
                }

                <TriesReward statusReward={statusReward} setStatusReward={setStatusReward} finishedGame={finishedSiluetaGame} setGachasRecompensa={setGachasRecompensa} gachasRecompensa={gachasRecompensa} game={"silueta"}/>
            
            </div>
            
            <div className='container-imagegame-input'>

                {
                    finishedSiluetaGame === false ?    
                        <span className='span-info-image'>{t('games.infoSpanSilueta')}</span>
                        :
                        null
                }

                <Input setGachasRecompensa={setGachasRecompensa} setAnimesErrors={setAnimesErrors} finishedGame={finishedSiluetaGame} solution={pjName} game={"silueta"} setFinishedGame={setFinishedSiluetaGame} setStatusReward={setStatusReward} />
            
            </div>

            {animesErrors && finishedSiluetaGame === false ? 
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
