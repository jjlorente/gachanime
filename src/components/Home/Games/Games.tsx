import { Link, Outlet, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Games.css';
import { useUserGachas } from "../Home";
import { findUserGames, findGameImageById, registerNewGameUser } from '../../../services/userGames';
import { GameData, Game } from '../../Interfaces/GamesUser';

type ContextType = { 
  userGamesData: GameData | null;
  setUserGamesData: React.Dispatch<React.SetStateAction<number | null>>;
  imageTries: number | null;
  setImageTries: React.Dispatch<React.SetStateAction<number | null>>;
  resets: number | null;
  setResets: React.Dispatch<React.SetStateAction<number | null>>;
};

export function useUserGames() {
  return useOutletContext<ContextType>();
}

export const Games = (props: any) => {
  const { userGachas, setUserGachas, alerts, setAlerts } = useUserGachas();

  const [userGamesData, setUserGamesData] = useState<GameData>();
  const [imageTries, setImageTries] = useState<number>(0);
  const [resets, setResets] = useState<number>(5);

  const [index, setIndex] = useState("image");

  const findAllGamesUser = async (id: any) => {
    try {
      const data = await findUserGames(id);
      if (data) {
        setUserGamesData(data);
        setImageTries(data.triesimage);
        setResets(data.resets);
        if (data.triesimage === 0) {
          localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
        }
      } else {
        localStorage.setItem("imgSelected", "");
        localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
        try {
          const data = await registerNewGameUser(id);
          if (data) {
            setUserGamesData(data);
            setImageTries(data.triesimage);
            setResets(data.resets);
          }
        } catch (error: any) {
          console.error('Error:', error);
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      if (error === "Games no encontradas") {
        console.log("Games no encontradas");
      }
    }
  };

  useEffect(() => {
    const idUser = localStorage.getItem("_id");

    if (idUser) {
      findAllGamesUser(idUser);
    }

  }, [index]);

  return (
    <div className="Games">
      <div className='nav-games'>
        <Link
          to="image"
          className={index === "image" ? "active-game link-reset link-game" : "link-reset link-game"}
          onClick={() => { setIndex("image"); }}
        >
          ANIME
        </Link>
        <Link
          to="name"
          className={index === "name" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"}
          onClick={() => { setIndex("name"); }}
        >
          GAME
        </Link>
        <Link
          to="silueta"
          className={index === "silueta" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"}
          onClick={() => { setIndex("silueta"); }}
        >
          GAME
        </Link>
        <Link
          to="adivinanza"
          className={index === "adivinanza" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"}
          onClick={() => { setIndex("adivinanza"); }}
        >
          GAME
        </Link>
      </div>
      <div className='section-games'>
        <Outlet context={{ userGachas, setUserGachas, userGamesData, setUserGamesData, resets, setResets, imageTries, setImageTries, alerts, setAlerts }} />
      </div>
    </div>
  );
};
