import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Games.css';
import { useUserGachas } from "../Home";
import { findUserGames, findGameById, registerNewGameUser } from '../../../services/userGames';
import { GameData, Game } from '../../Interfaces/GamesUser';
import { Quests } from '../Quests/Quests';
import { findAllQuestUser } from '../../../services/userQuests';

import { PiImageBroken } from "react-icons/pi";
import { BiImage } from "react-icons/bi";
import { BiSolidMusic } from "react-icons/bi";
import { BiSolidPencil } from "react-icons/bi";
import { ImAccessibility } from "react-icons/im";
import { IoEye } from "react-icons/io5";

type ContextType = { 
  userGamesData: GameData | null;
  setUserGamesData: React.Dispatch<React.SetStateAction<number | null>>;
  imageTries: number | null;
  setImageTries: React.Dispatch<React.SetStateAction<number | null>>;

  siluetaTries: number | null;
  setSiluetaTries: React.Dispatch<React.SetStateAction<number | null>>;

  mode: number | null;

  eyeTries: number | null;
  setEyeTries: React.Dispatch<React.SetStateAction<number | null>>;
  nameTries: number | null;
  setNameTries: React.Dispatch<React.SetStateAction<number | null>>;
  pixelTries: number | null;
  setPixelTries: React.Dispatch<React.SetStateAction<number | null>>;
  openingTries: number | null;
  setOpeningTries: React.Dispatch<React.SetStateAction<number | null>>;
  resets: number | null;
  setResets: React.Dispatch<React.SetStateAction<number | null>>;
  findAllGamesUser: (id: any) => Promise<void>;
};

export function useUserGames() {
  return useOutletContext<ContextType>();
}

export const Games = (props: any) => {
  const { userGachas, setUserGachas, alerts, setAlerts } = useUserGachas();
  const [userGamesData, setUserGamesData] = useState<GameData>();
  const [imageTries, setImageTries] = useState<number>(0);

  const [siluetaTries, setSiluetaTries] = useState<number>(0)

  const [nameTries, setNameTries] = useState<number>(0);
  const [pixelTries, setPixelTries] = useState<number>(0);
  const [openingTries, setOpeningTries] = useState<number>(0);
  const [eyeTries, setEyeTries] = useState<number>(0);

  const [resets, setResets] = useState<number>(10);
  const [mode, setMode] = useState<number>(0);

  const [index, setIndex] = useState("image");

  const findAllGamesUser = async (id: any) => {
    try {
      const data = await findUserGames(id);
      if (data && mode!==null) {
        setUserGamesData(data);
        setImageTries(data.triesimage);
        setSiluetaTries(data.triessilueta[mode]);
        setNameTries(data.triesname);
        setOpeningTries(data.triesopening);
        setEyeTries(data.trieseye);
        setPixelTries(data.triespixel);
        setResets(data.resets);

        if (data.triesimage === 0) {
          localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
        } else if (data.triessilueta === 0) {
          localStorage.setItem("arrayErrorsSilueta", JSON.stringify([]));
        } else if (data.triesname === 0) {
          localStorage.setItem("arrayErrorsName", JSON.stringify([]));
          localStorage.setItem("arrayTriesName", JSON.stringify([]));
          localStorage.setItem("localArrayColors", JSON.stringify([]));
        } else if (data.triesopening === 0) {
          localStorage.setItem("arrayErrorsOpening", JSON.stringify([]));
        } else if (data.trieseye === 0) {
          localStorage.setItem("arrayErrorsEye", JSON.stringify([]));
        } else if (data.triespixel === 0) {
          localStorage.setItem("arrayErrorsPixel", JSON.stringify([]));
        }

      } else {
        localStorage.setItem("imgSelected", "");
        localStorage.setItem("siluetaSelected", "");
        localStorage.setItem("nameSelected", "");
        localStorage.setItem("openingSelected", "");
        localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
        localStorage.setItem("arrayTriesName", JSON.stringify([]));
        localStorage.setItem("localArrayColors", JSON.stringify([]));

        localStorage.setItem("arrayErrorsSilueta", JSON.stringify([]));
        localStorage.setItem("arrayErrorsSiluetaMedium", JSON.stringify([]));
        localStorage.setItem("arrayErrorsSiluetaHard", JSON.stringify([]));

        localStorage.setItem("arrayErrorsName", JSON.stringify([]));
        localStorage.setItem("arrayErrorsOpening", JSON.stringify([]));
        localStorage.setItem("arrayErrorsEye", JSON.stringify([]));  
        localStorage.setItem("arrayErrorsPixel", JSON.stringify([]));  
        try {
          const data = await registerNewGameUser(id);
          await findAllQuestUser(id);
          if (data) {
            setUserGamesData(data);
            setImageTries(data.triesimage);
            setSiluetaTries(data.triessilueta[mode]);
            setNameTries(data.triesname);
            setOpeningTries(data.triesopening);
            setEyeTries(data.trieseye);
            setPixelTries(data.triespixel)
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

  const location = useLocation();
  useEffect(() => {
    if(location) {
      let path = location.pathname.split("/")[3];
      setIndex(path)
    }

  }, [location]);

  const handleModeChange = async (newMode: number) => {
    setMode(newMode);
  };

  return (
    <div className="Games">
      <div>
        <button onClick={async () => await handleModeChange(0)}> Easy Mode </button>
        <button onClick={async () => await handleModeChange(1)}> Medium Mode </button>
        <button onClick={async () => await handleModeChange(2)}> Hard Mode </button>
      </div>
      <div className='nav-games'>
        <Link
          to="image"
          key={"image"}
          className={index === "image" ? "active-game link-reset link-game" : "link-reset link-game"}
          onClick={() => { setIndex("image"); }}
        >
          <BiImage fontSize={"2rem"}/>
        </Link>
        <Link
          to="silueta"
          key={"silueta"}
          className={index === "silueta" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"}
          onClick={() => { setIndex("silueta"); }}
        >
          <ImAccessibility fontSize={"1.4rem"}/>
        </Link>
        <Link
          to="name"
          key={"name"}
          className={index === "name" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"}
          onClick={() => { setIndex("name"); }}
        >
          <BiSolidPencil fontSize={"1.4rem"}/>
        </Link>
        <Link
          to="opening"
          key={"opening"}
          className={index === "opening" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"}
          onClick={() => { setIndex("adivinanza"); }}
        >
          <BiSolidMusic fontSize={"1.4rem"}/>
        </Link>
        <Link
          to="eyes"
          key={"eyes"}
          className={index === "eyes" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"}
          onClick={() => { setIndex("eyes"); }}
        >
          <IoEye fontSize={"1.4rem"}/>
        </Link>
        <Link
          to="pixel"
          key={"pixel"}
          className={index === "pixel" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"}
          onClick={() => { setIndex("pixel"); }}
        >
          <PiImageBroken fontSize={"1.4rem"}/>
        </Link>
      </div>
      <div className='section-games'>
        <Outlet context={{ mode, findAllGamesUser, userGachas, setUserGachas, userGamesData, setUserGamesData, resets, setResets, nameTries, setNameTries, imageTries, setImageTries,pixelTries, setPixelTries, siluetaTries, setSiluetaTries, openingTries, setOpeningTries, eyeTries, setEyeTries, alerts, setAlerts }} />
      </div>
    </div>
  );
};
