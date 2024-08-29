import './Home.css';
import { useEffect, useState } from 'react';
import { Outlet, useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { Nav } from './Nav/Nav';
import { Header } from './Header/Header';
import { findUserById } from '../../services/user';
import { deleteAll } from '../../services/userGames';
import { findGacha } from '../../services/gacha';

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
    const now = new Date();
    const localTime = localStorage.getItem("time");
    const local = getYearMonthDay(now);

    if (!localTime) {
      localStorage.setItem("time", local.toString());
    } else {
      const localStorageTime = localTime.split(",").map(str => parseInt(str, 10));
      if (isDateOutdated(localStorageTime, local)) {
        resetDaily();
        localStorage.setItem("time", local.toString());
        clearLocalStorage();
      } 
    }
  }, [location]);

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

  const clearLocalStorage = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("arrayErrorsImage");
    localStorage.removeItem("arrayErrorsSilueta");
    localStorage.removeItem("arrayErrorsOpening");
    localStorage.removeItem("nameSelected");
    localStorage.removeItem("siluetaSelected");
    localStorage.removeItem("openingSelected");
    localStorage.removeItem("imgSelected");
    localStorage.removeItem("alerts");
  };

  const getUserData = async (userid: string) => {
    const user = await findUserById(userid);
    if (user) {
      setUserData(user);
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
    await deleteAll();
  };

  return (
    <div className='Home'>
      <Header userData={userData} userGachas={userGachas} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
      <Nav userData={userData} userGachas={userGachas} activeIndex={activeIndex} setActiveIndex={setActiveIndex} alerts={alerts} setAlerts={setAlerts}/>
      <Outlet context={{ userGachas, setUserGachas, alerts, setAlerts, setActiveIndex }}/>
    </div>
  );
};
