import { Link, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Games.css';
import { useUserGachas } from "../Home";
import { findUserGames, findGameById, registerNewGameUser } from '../../../services/userGames';
import { GameData, Game } from '../../Interfaces/GamesUser';
import { Quests } from '../Quests/Quests';
import { findAllQuestUser } from '../../../services/userQuests';
import { unlockMode } from '../../../services/user';
import { useTranslation } from 'react-i18next';

import { PiImageBroken } from "react-icons/pi";
import { BiImage } from "react-icons/bi";
import { BiSolidMusic } from "react-icons/bi";
import { BiSolidPencil } from "react-icons/bi";
import { ImAccessibility } from "react-icons/im";
import { IoEye } from "react-icons/io5";
import { findUserById } from '../../../services/user';
import { UnlockModal } from './UnlockModal/UnlockModal';
import { FaLongArrowAltRight } from "react-icons/fa";

type ContextType = { 
  userGamesData: GameData | null;
  setUserGamesData: React.Dispatch<React.SetStateAction<number | null>>;
  imageTries: number | null;
  setImageTries: React.Dispatch<React.SetStateAction<number | null>>;

  siluetaTries: number | null;
  setSiluetaTries: React.Dispatch<React.SetStateAction<number | null>>;

  mode: number | null;
  unlock: boolean | null;
  setUnlock: React.Dispatch<React.SetStateAction<boolean | null>>;

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
  const { i18n, t } = useTranslation();

  const [userData, setUserData] = useState<any>();
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
  const [unlock, setUnlock] = useState<boolean>();

  const [index, setIndex] = useState("image");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("userData");
      if (user) {
        const parsedUser = JSON.parse(user);
        if (mode === 0 && mode !== null && parsedUser.unlockModes) {
          setUnlock(parsedUser.unlockModes[0])
        } else if (mode === 1 && mode !== null && parsedUser.unlockModes) {
          setUnlock(parsedUser.unlockModes[1])
        } else if (mode === 2 && mode !== null && parsedUser.unlockModes) {
          setUnlock(parsedUser.unlockModes[2])
        }
      }
    };
    
    fetchData()
  }, [mode]);

  useEffect(() => {
    const fetchData = async () => {
      const idUser = localStorage.getItem("_id");
      if (idUser) {
        let data = await findAllGamesUser(idUser);
        return data
      }
    }
    
    fetchData()
  }, []);

  const getUserData = async (userid: string) => {
    const user = await findUserById(userid);
    if (user) {
      setUserData(user);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const idUser = localStorage.getItem("_id");
      if (idUser) {
        await getUserData(idUser);
      }
    }
    
    fetchData()
  }, []);

  const findAllGamesUser = async (id: any) => {
    try {
      const data = await findUserGames(id);
      if (data && mode!==null) {
        setUserGamesData(data);
        setImageTries(data.triesimage[mode]);
        setSiluetaTries(data.triessilueta[mode]);
        setNameTries(data.triesname);
        setOpeningTries(data.triesopening[mode]);
        setEyeTries(data.trieseye[mode]);
        setPixelTries(data.triespixel[mode]);
        setResets(data.resets);

        if (data.triesimage === 0) {
          localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
          localStorage.setItem("arrayErrorsImageMedium", JSON.stringify([]));
          localStorage.setItem("arrayErrorsImageHard", JSON.stringify([]));
        } else if (data.triessilueta === 0) {
          localStorage.setItem("arrayErrorsSilueta", JSON.stringify([]));
          localStorage.setItem("arrayErrorsSiluetaMedium", JSON.stringify([]));
          localStorage.setItem("arrayErrorsSiluetaHard", JSON.stringify([]));
        } else if (data.triesname === 0) {
          localStorage.setItem("arrayErrorsName", JSON.stringify([]));
          localStorage.setItem("arrayTriesName", JSON.stringify([]));
          localStorage.setItem("localArrayColors", JSON.stringify([]));
        } else if (data.triesopening === 0) {
          localStorage.setItem("arrayErrorsOpening", JSON.stringify([]));
          localStorage.setItem("arrayErrorsOpeningMedium", JSON.stringify([]));
          localStorage.setItem("arrayErrorsOpeningHard", JSON.stringify([]));
        } else if (data.trieseye === 0) {
          localStorage.setItem("arrayErrorsEye", JSON.stringify([]));
          localStorage.setItem("arrayErrorsEyeMedium", JSON.stringify([]));
          localStorage.setItem("arrayErrorsEyeHard", JSON.stringify([]));
        } else if (data.triespixel === 0) {
          localStorage.setItem("arrayErrorsPixel", JSON.stringify([]));
          localStorage.setItem("arrayErrorsPixelMedium", JSON.stringify([]));
          localStorage.setItem("arrayErrorsPixelHard", JSON.stringify([]));
        }

      } else {
        localStorage.setItem("imgSelected", "");
        localStorage.setItem("siluetaSelected", "");
        localStorage.setItem("nameSelected", "");
        localStorage.setItem("openingSelected", "");
        localStorage.setItem("arrayTriesName", JSON.stringify([]));
        localStorage.setItem("localArrayColors", JSON.stringify([]));

        localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
        localStorage.setItem("arrayErrorsImageMedium", JSON.stringify([]));
        localStorage.setItem("arrayErrorsImageHard", JSON.stringify([]));

        localStorage.setItem("arrayErrorsSilueta", JSON.stringify([]));
        localStorage.setItem("arrayErrorsSiluetaMedium", JSON.stringify([]));
        localStorage.setItem("arrayErrorsSiluetaHard", JSON.stringify([]));

        localStorage.setItem("arrayErrorsName", JSON.stringify([]));

        localStorage.setItem("arrayErrorsOpening", JSON.stringify([]));
        localStorage.setItem("arrayErrorsOpeningMedium", JSON.stringify([]));
        localStorage.setItem("arrayErrorsOpeningHard", JSON.stringify([]));

        localStorage.setItem("arrayErrorsEye", JSON.stringify([]));
        localStorage.setItem("arrayErrorsEyeMedium", JSON.stringify([]));
        localStorage.setItem("arrayErrorsEyeHard", JSON.stringify([]));

        localStorage.setItem("arrayErrorsPixel", JSON.stringify([]));
        localStorage.setItem("arrayErrorsPixelMedium", JSON.stringify([]));
        localStorage.setItem("arrayErrorsPixelHard", JSON.stringify([]));
        try {
          const data = await registerNewGameUser(id);
          await findAllQuestUser(id);
          if (data) {
            setUserGamesData(data);
            setImageTries(data.triesimage[mode]);
            setSiluetaTries(data.triessilueta[mode]);
            setNameTries(data.triesname);
            setOpeningTries(data.triesopening[mode]);
            setEyeTries(data.trieseye[mode]);
            setPixelTries(data.triespixel[mode])
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

  const handleUnlockMode = async () => {
    const idUser = localStorage.getItem("_id");
    if (idUser) {
      const data = await unlockMode(idUser, mode)
      if(data) {
        setUserData(data)
        localStorage.setItem("userData", JSON.stringify(data));
        setUnlock(true);
      }
    }
  };

  return (
    <div className="Games">
      <div className='container-btns-modes'>
        <button 
          className={mode === 0 ? 'jaro-regular active-mode' :'jaro-regular' } 
          onClick={async () => await handleModeChange(0)}> 
            EASY
        </button>
        <button 
          className={mode === 1 ? 'jaro-regular active-mode' :'jaro-regular' } 
          onClick={async () => await handleModeChange(1)}> 
            NORMAL 
          </button>
        <button 
          className={mode === 2 ? 'jaro-regular active-mode' :'jaro-regular' } 
          onClick={async () => await handleModeChange(2)}> 
            HARD 
        </button>
      </div>
      <div className='section-games-modes'>

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
        <div className={mode !== undefined ? "section-games expanded" : "section-games"}>
          {userData && mode !== null && userData.unlockModes[mode] === false ? 
            <div className={`blocked-mode ${unlock ? 'hidden' : ''}`}>
              <h2 style={{ fontSize: "1.7rem", fontWeight: "normal" }}>
              {
                mode === 1 ? (
                  <>
                    {t('games.titleUnlockMode')} <span style={{ color: "#FFAA2A" }}>30.000</span> {t('games.titleUnlockModeMedium')}
                  </>
                ) : (
                  <>
                    {t('games.titleUnlockMode')} <span style={{ color: "#FFAA2A" }}>120.000</span> {t('games.titleUnlockModeHard')}
                  </>
                )
              }
              </h2>
              <div className='container-unblock-mode'>
                <img src='/unlock.png' style={{ height: "100%", width: "auto" }} className="icon-summon-nav" />
                <div className='cnt-button-unlock-modal'>
                  {
                    userData && userData.totalPower !== undefined ? (
                      <h3 style={{ fontSize: "1.7rem", fontWeight: "normal" }}>
                        {t('games.powerOf') +" "+ userData.username + " " }
                        <span style={{ color: "#FEAA2A" }}>{userData.totalPower.toLocaleString()}</span>
                      </h3>
                    ) : null
                  }
                  {
                    mode === 1 ? 
                      userData && userData.totalPower !== undefined ?
                        <button className={userData.totalPower > 30000 ? 'jaro-regular btn-unblock link-main' : "jaro-regular btn-unblock link-main blocked"} onClick={userData.totalPower > 30000 ? handleUnlockMode : undefined}>
                          {t('games.mediumButton')}
                        </button> 
                        :
                        <button className={"jaro-regular btn-unblock link-main blocked"} onClick={undefined}>
                          {t('games.mediumButton')}
                        </button> 
                      : 
                      userData && userData.totalPower !== undefined ?
                        <button className={userData.totalPower > 120000 ? 'jaro-regular btn-unblock link-main' : "jaro-regular btn-unblock link-main blocked"} onClick={userData.totalPower > 120000 ? handleUnlockMode : undefined}>
                          {t('games.hardButton')}
                        </button> 
                        : 
                        <button className={"jaro-regular btn-unblock link-main blocked"} onClick={undefined}>
                          {t('games.hardButton')}
                        </button> 
                  }
                </div>
              </div>
            </div>
            : <></>
          }
          <Outlet context={{ unlock, mode, findAllGamesUser, userGachas, setUserGachas, userGamesData, setUserGamesData, resets, setResets, nameTries, setNameTries, imageTries, setImageTries,pixelTries, setPixelTries, siluetaTries, setSiluetaTries, openingTries, setOpeningTries, eyeTries, setEyeTries, alerts, setAlerts }} />
        </div>
      </div>
      {/* <UnlockModal openModal={openModal} setOpenModal={setOpenModal} mode={mode} unlock={unlock} /> */}
    </div>
  );
};
