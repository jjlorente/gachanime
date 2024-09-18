import { Resets } from '../ResetsComponent/Resets';
import './EyeGame.css';
import { useUserGames } from '../Games';
import { useState, useEffect } from 'react';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { Input } from '../InputComponent/Input';
import { findGameById, updateSelected } from '../../../../services/userGames';
import { Game } from '../../../Interfaces/GamesUser';
import { useTranslation } from 'react-i18next';

export const EyeGame = (props: any) => {
    const [finishedEyeGame, setFinishedEyeGame] = useState<boolean>();
    const { userGamesData, setUserGamesData, findAllGamesUser } = useUserGames();
    const [gachasRecompensa, setGachasRecompensa] = useState<number>();
    const [statusReward, setStatusReward] = useState<number>(0);
    const [animesErrors, setAnimesErrors] = useState<Array<string>>([]);
    const [pjName, setPjName] = useState<string>();
    const [eyeSelected, setEyeSelected] = useState<number>();
    const [gameData, setGameData] = useState<Game>();
    const { i18n, t } = useTranslation();
    const { eyeTries } = useUserGames();

    useEffect(() => {
        const idUser = localStorage.getItem("_id");
        if (idUser) {
          findAllGamesUser(idUser);
        }
      }, []);

    useEffect(()=> {
        let arrayErrors = localStorage.getItem("arrayErrorsEye");
        if(!arrayErrors) {
            localStorage.setItem("arrayErrorsEye", JSON.stringify([]));
        } else {
            if (finishedEyeGame === false || finishedEyeGame === undefined) {
                setAnimesErrors(JSON.parse(arrayErrors))
            }
        }
    },[userGamesData])

    useEffect(()=>{
        if(animesErrors && animesErrors.length > 0 && finishedEyeGame === false) {
            localStorage.setItem("arrayErrorsEye", JSON.stringify(animesErrors));
        }
    }, [animesErrors])

    useEffect(()=>{
        const fetchData = async () => {
            if(userGamesData) {
                let loop = false;
                while(loop===false) {
                    loop = true;
                    await findEyeGame(userGamesData.eyeid)
                    setEyeSelected(userGamesData.eyeSelected)
                }
            }
        }
        fetchData();
    },[userGamesData])
    
    useEffect(()=>{
        if(gameData && userGamesData) {
            setPjName(gameData.names_game[userGamesData.eyeSelected])
        }
    },[gameData])

    const findEyeGame = async (id:any) => {
        try {
            const data = await findGameById(id)
            if (data) {
                setGameData(data);
                if(userGamesData) {
                    setFinishedEyeGame(userGamesData.finishedEye);
                    let dataTries = userGamesData.trieseye * 5;
                    if(dataTries >= 25) {
                        setGachasRecompensa(25)
                    } else {
                        setGachasRecompensa(50 - dataTries)
                    }

                    setStatusReward(userGamesData.statusRewardEye)
                }

                const eyeLocal = localStorage.getItem("eyeSelected");
                if (userGamesData && userGamesData.eyeSelected) {
                    localStorage.setItem("eyeSelected", userGamesData.eyeSelected.toString())
                } else if (userGamesData && !eyeLocal) {
                    const dataEyeSelected = await updateSelected(userGamesData.userid, "eye");
                    setUserGamesData(dataEyeSelected);
                    localStorage.setItem("eyeSelected", dataEyeSelected.eyeSelected)
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
                        <img className={finishedEyeGame ? "eye_img_solution" : "eye_game"} src={finishedEyeGame ? gameData?.eye_solution[eyeSelected] : gameData?.eye_game[eyeSelected]} alt="" />
                        :
                        <l-trefoil size="200" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
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
