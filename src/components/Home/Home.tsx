import './Home.css';
import { useEffect, useState } from 'react';
import { Outlet, useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { Nav } from './Nav/Nav';
import { Header } from './Header/Header';
import { findUserById, getRank } from '../../services/user';
import { deleteAll } from '../../services/userGames';
import { updateWeekQuests } from '../../services/userQuests';
import { findGacha } from '../../services/gacha';
import { findDay, createDay, updateDay, updateWeek } from '../../services/day';
import { findUserQuests, registerNewQuestUser } from '../../services/userQuests';

import { useTranslation } from 'react-i18next';
import { find, finished } from '../../services/surveys';

type ContextType = { 
  userGachas: number | null;
  setUserGachas: React.Dispatch<React.SetStateAction<number | []>>;
  alerts: Array<string> | null;
  setAlerts: React.Dispatch<React.SetStateAction<Array<string> | []>>;
  activeIndex: string | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<string>>
};

export function useUserGachas() {
  return useOutletContext<ContextType>();
}

export const Home = () => {

  const { i18n, t } = useTranslation();
  const [_id, set_Id] = useState<string>('');
  const [googleAccount, setGoogleAccount] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();
  const [userGachas, setUserGachas] = useState<number>(0);
  const [userThrows, setUserThrows] = useState<number>(0);
  const [alerts, setAlerts] = useState<Array<string>>([]);
  const [activeIndex, setActiveIndex] = useState<string>("main");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkDay = async () => {
      try {
        const day = await findDay();
        return day.lastReset;
      } catch (error) {
        console.error('Error al obtener el día:', error);
        return null;
      }
    };

    const checkWeek = async () => {
      try {
        const day = await findDay();
        return day.resetWeek;
      } catch (error) {
        console.error('Error al obtener el día:', error);
        return null;
      }
    };

    const fetchData = async () => {
      const now = new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" });
      const dateInSpain = new Date(now);

      let dayDB = await checkDay();
      const local = getYearMonthDay(dateInSpain);

      if (dayDB) {
        dayDB = dayDB.split(",").map((str: any) => parseInt(str, 10));
        if (isDateOutdated(dayDB, local)) {
          //RESET DAILY, RESET DAY QUEST AND LOCALSTORGE
          await clearLocalStorage();
          await resetDaily();
          let day = await updateDay();
          localStorage.setItem("time", day.toString());
        } 
      }
      const idUser = localStorage.getItem("_id");
      if(idUser) {
        const data = await findUserQuests(idUser);
        if(!data) {
          registerNewQuestUser(idUser)
        }
      }

      let daySurvey = await find(); 
      if (daySurvey) {
        let expirationDate = daySurvey.expirationdDate.split(",").map((str: string) => parseInt(str, 10));
        let expirationYear = expirationDate[0];
        let expirationMonth = expirationDate[1] - 1;
        let expirationDay = expirationDate[2];
    
        let localDate = new Date();
        let localYear = localDate.getFullYear();
        let localMonth = localDate.getMonth();
        let localDay = localDate.getDate();
        
        if (isDateOutdatedSurvey(expirationYear, expirationMonth, expirationDay, localYear, localMonth, localDay)) {
          await finished();
        }
      }

      let weekDB = await checkWeek();
      if (weekDB) {
        weekDB = weekDB.split(",").map((str: any) => parseInt(str, 10));
        weekDB[2] = weekDB[2]-1
        if (isDateOutdated(weekDB, local)) {
          await resetWeek()
        } 
      }
    };
    fetchData();
  }, [location]);

  const clearLocalStorage = async () => {
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
  };

  function isDateOutdatedSurvey(expirationYear: number, expirationMonth: number, expirationDay: number, localYear: number, localMonth: number, localDay: number) {
    let expiration = new Date(expirationYear, expirationMonth, expirationDay);
    let local = new Date(localYear, localMonth, localDay);
  
    return expiration < local;
  }

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    setActiveIndex(path);
  }, [location]);

  useEffect(() => {
    const idUser = localStorage.getItem("_id");
    if (idUser) {
      set_Id(idUser);
      setGoogleAccount(localStorage.getItem("googleAccount") === 'true');
      getUserData(idUser);
      getGachasAndThrows(idUser);
    } else {
      navigate("/");
    }
  }, [activeIndex]);

  useEffect(() => {
    const alertsNav = localStorage.getItem("alerts");
    if (alertsNav) {
      setAlerts(JSON.parse(alertsNav));
    }
  }, []);

  const getYearMonthDay = (date: Date) => [date.getFullYear(), date.getMonth() + 1, date.getDate()];

  const isDateOutdated = (storedDate: number[], currentDate: number[]) => 
    storedDate[0] < currentDate[0] || storedDate[1] < currentDate[1] || storedDate[2] < currentDate[2];

  const getUserData = async (userid: string) => {
    const user = await findUserById(userid);
    if (user) {
      setUserData(user);
      i18n.changeLanguage(user.codeLan);
      localStorage.setItem("userData", JSON.stringify(user));
    }
  };

  const getGachasAndThrows = async (userid: string) => {
    const dataGacha = await findGacha(userid);
    if (dataGacha) {
      setUserGachas(dataGacha.gachas);
      setUserThrows(dataGacha.throws);
    }
  };

  const resetDaily = async () => {
    let userid = localStorage.getItem("_id");
    if(userid) {
      await deleteAll(userid, false);
    }
  };

  const resetWeek = async () => {
    let userid = localStorage.getItem("_id");
    if(userid) {
      await updateWeek();
    }
  };
  
  return (
    <div className='Home'>
      <Header userData={userData} userGachas={userGachas} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
      <Nav />
      <Outlet context={{ userGachas, setUserGachas, alerts, setAlerts, setActiveIndex }}/>
    </div>
  );
};
