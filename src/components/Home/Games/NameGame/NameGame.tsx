import { Resets } from '../ResetsComponent/Resets'
import './NameGame.css'
import { findGameById, updateSelected } from '../../../../services/userGames';
import { useUserGames } from '../Games';
import { useState, useEffect } from 'react';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { useUserGachas } from "../../Home";
import { Input } from '../InputComponent/Input';
import { Game } from '../../../Interfaces/GamesUser';
import { useLocation } from 'react-router-dom';

export const NameGame = () => {
  const { userGamesData, setUserGamesData } = useUserGames();
  const [gameData, setGameData] = useState<Game>();
  const [finishedNameGame, setFinishedNameGame] = useState<boolean>();
  const [gachasRecompensa, setGachasRecompensa] = useState<number>();
  const [statusReward, setStatusReward] = useState<number>(0);
  const [pjName, setPjName] = useState<string>();
  const [nameSelected, setNameSelected] = useState<number>();

  const findNameGame = async (id:any) => {
    try {
      const data = await findGameById(id)
      if (data) {
        setGameData(data);

        if(userGamesData) {
          setFinishedNameGame(userGamesData.finishedName);
          let dataTries = userGamesData.triesname * 40;
          if(dataTries>= 400) {
              setGachasRecompensa(100)
          } else {
              setGachasRecompensa(500-dataTries)
          }
          setStatusReward(userGamesData.statusRewardName)
        }
        const randomIndex = Math.floor(Math.random() * data.names_game.length);
        const nameLocal = localStorage.getItem("nameSelected");
        
        if (userGamesData && userGamesData.nameSelected) {
          localStorage.setItem("nameSelected", userGamesData.nameSelected.toString())
        } else if (userGamesData && userGamesData.nameSelected === undefined && !nameLocal) {
          const dataNameSelected = await updateSelected(userGamesData.userid, randomIndex, "name");
          setUserGamesData(dataNameSelected);
          localStorage.setItem("nameSelected", randomIndex.toString())
        }
      }
    } catch (error: any) {
        console.error('Error:', error);
    }
  };

  useEffect(()=>{
    if(userGamesData) {
      findNameGame(userGamesData.nameid)
      setNameSelected(userGamesData.nameSelected)
    }
  },[userGamesData])

  useEffect(()=>{
    if(gameData && userGamesData) {
      setPjName(gameData.names_game[userGamesData.nameSelected])
    }
  },[gameData])

  return (

    <div className='container-imagegame'>      

      <Resets title={"¡Adivina el personaje del día!"} game={"name"} finishedGame={false} findGame={findNameGame}/>
      <span>{pjName}</span>
    </div>

  )
}
