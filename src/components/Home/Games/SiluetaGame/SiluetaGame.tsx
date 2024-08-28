import { Resets } from '../ResetsComponent/Resets'
import './SiluetaGame.css'
import { useUserGames } from '../Games';
import { useState, useEffect } from 'react';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { useUserGachas } from "../../Home";
import { Input } from '../InputComponent/Input';
import { findGameById, updateSelected } from '../../../../services/userGames';
import { Game } from '../../../Interfaces/GamesUser';
import { useLocation } from 'react-router-dom';

export const SiluetaGame = (props: any) => {
    const [finishedSiluetaGame, setFinishedSiluetaGame] = useState<boolean>();
    const { userGamesData, setUserGamesData } = useUserGames();
    const [gachasRecompensa, setGachasRecompensa] = useState<number>();
    const [statusReward, setStatusReward] = useState<number>(0);
    const [animesErrors, setAnimesErrors] = useState<Array<string>>([]);
    const [pjName, setPjName] = useState<string>();
    const [siluetaSelected, setSiluetaSelected] = useState<number>();
    const [gameData, setGameData] = useState<Game>();
    const location = useLocation();

    useEffect(()=> {
        let arrayErrors = localStorage.getItem("arrayErrorsSilueta");
        if(!arrayErrors) {
            localStorage.setItem("arrayErrorsSilueta", JSON.stringify([]));
        } else {
            if (finishedSiluetaGame === false || finishedSiluetaGame === undefined) {
                setAnimesErrors(JSON.parse(arrayErrors))
            }
        }
    },[userGamesData])

    useEffect(()=>{
        if(animesErrors && animesErrors.length > 0 && finishedSiluetaGame === false) {
            localStorage.setItem("arrayErrorsSilueta", JSON.stringify(animesErrors));
        }
    }, [animesErrors])

    useEffect(()=>{
        if(userGamesData) {
            findSiluetaGame(userGamesData.siluetaid)
            setSiluetaSelected(userGamesData.siluetaSelected)
        }
    },[userGamesData])

    useEffect(()=>{
        if(gameData && userGamesData) {
            setPjName(gameData.names_game[userGamesData.siluetaSelected])
        }
    },[gameData])

    const findSiluetaGame = async (id:any) => {
        try {
            const data = await findGameById(id)
            if (data) {
                setGameData(data);
                if(userGamesData) {
                    setFinishedSiluetaGame(userGamesData.finishedSilueta);
                    let dataTries = userGamesData.triessilueta * 40;
                    if(dataTries>= 400) {
                        setGachasRecompensa(100)
                    } else {
                        setGachasRecompensa(500-dataTries)
                    }

                    setStatusReward(userGamesData.statusRewardSilueta)
                }
                const randomIndex = Math.floor(Math.random() * data.silueta_game.length);
                const siluetaLocal = localStorage.getItem("siluetaSelected");

                if (userGamesData && userGamesData.siluetaSelected) {
                    localStorage.setItem("siluetaSelected", userGamesData.siluetaSelected.toString())
                    console.log(userGamesData.siluetaSelected)
                    await updateSelected(userGamesData.userid, userGamesData.siluetaSelected, "silueta");
                } else if (userGamesData && userGamesData.siluetaSelected === undefined && !siluetaLocal) {
                    const dataSiluetaSelected = await updateSelected(userGamesData.userid, randomIndex, "silueta");
                    setUserGamesData(dataSiluetaSelected);
                    localStorage.setItem("siluetaSelected", randomIndex.toString())
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container-imagegame'>      

            <Resets title={"¿De que personaje es la silueta?"} game={"silueta"} finishedGame={finishedSiluetaGame} findGame={findSiluetaGame}/>

            <div className='container-image-center'>
                
                <div className='section-image-center image-center-game' style={{backgroundColor:"white", border:"solid black 2px"}}>        
                    {siluetaSelected !== undefined ? 
                        <img className='img-game' width={"auto"} height={"100%"} src={finishedSiluetaGame ? gameData?.silueta_solution[siluetaSelected] : gameData?.silueta_game[siluetaSelected]} alt="" />
                        :
                        <l-trefoil size="200" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
                    }       
                </div>
                
                <TriesReward statusReward={statusReward} setStatusReward={setStatusReward} finishedGame={finishedSiluetaGame} setGachasRecompensa={setGachasRecompensa} gachasRecompensa={gachasRecompensa} game={"silueta"}/>
            
            </div>
            
            <div className='container-imagegame-input'>
                <span className='span-info-image'>Cada intento fallido pierdes 20 gachas de la recompensa final.</span>

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
