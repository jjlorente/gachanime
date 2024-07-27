import './Home.css'
import { useEffect, useState } from 'react'
import { Outlet, useOutletContext } from "react-router-dom";
import { Nav } from './Nav/Nav';
import { Header } from './Header/Header';
import { findGacha } from '../../services/gacha';
import { findUserById } from '../../services/user';
import { useNavigate, useLocation } from 'react-router-dom';

type ContextType = { 
  userGachas: Number | null;
  setUserGachas: React.Dispatch<React.SetStateAction<number | []>>;
  alerts: Array<string> | null;
  setAlerts: React.Dispatch<React.SetStateAction<Array<string> | []>>;
};

export function useUserGachas() {
  return useOutletContext<ContextType>();
}

export const Home = () => {
  //const [rewardAdvise, setRewardAdvise] = useState<Array<any>>([]);
  const [_id, set_Id] = useState<string>('');
  const [googleAccount, setGoogleAccount] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();
  const [userGachas, setUserGachas] = useState<any>(0);
  const [userThrows, setUserThrows] = useState<any>(0);
  const [alerts, setAlerts] = useState<Array<string>>([]);

  const [activeIndex, setActiveIndex] = useState<any>("main");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //UPDATE PAGE AT 00:00
    let now = new Date();
    const localTime = localStorage.getItem("time");
    let local = getYearMonthDay(now)
    if(!localTime) {
      localStorage.setItem("time", local.toString())
    } else {
      let localStorageTime = localTime.split(",").map(str => parseInt(str, 10));
      if(localStorageTime[0] < local[0] || localStorageTime[1] < local[1] || localStorageTime[2] < local[2]) {
        localStorage.setItem("time", local.toString())
        localStorage.removeItem("userData")
        localStorage.removeItem("arrayErrorsImage")
        localStorage.removeItem("imgSelected")
        localStorage.removeItem("alerts")
      } 
    }
  }, [location]);

  useEffect(() => {
    const path = location.pathname;
    const parts = path.split('/')[2];
    setActiveIndex(parts)
  }, [location])


  useEffect(() => {
    if(localStorage.getItem("_id")) {
      const idUser = localStorage.getItem("_id");
      if(idUser)
      set_Id(idUser)

      const googleAccountStorage = localStorage.getItem("googleAccount");
      if (googleAccountStorage) {
        setGoogleAccount(googleAccountStorage === 'true');
      }
    } else {
      navigate("/")
    }
  }, [])

  useEffect(() => {
    const idUser = localStorage.getItem("_id");
    if (idUser) {
      getGachasAndThrows(idUser);
      set_Id(idUser);
      getUserData(idUser);
    }

  }, [activeIndex]);

  function getYearMonthDay(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [ year, month, day ];
}

  const getUserData = async (userid: string) => {
    const user = await findUserById(userid);
    if (user) {
      setUserData(user);
      localStorage.setItem("userData", JSON.stringify(user));
    }
  }
  const getGachasAndThrows = async (userid: string) => {
    const dataGacha = await findGacha(userid);
    if (dataGacha) {
      setUserGachas(dataGacha.gachas)
      setUserThrows(dataGacha.throws)
    }
  }

  useEffect(()=>{
    let alertsNav = localStorage.getItem("alerts");
    if(alertsNav){
      let alertsArray = JSON.parse(alertsNav); 
      setAlerts(alertsArray);
    }
  },[]);

  return (
    <div className='Home'>
      <Header userData={userData} userGachas={userGachas} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
      <Nav userData={userData} userGachas={userGachas} activeIndex={activeIndex} setActiveIndex={setActiveIndex} alerts={alerts} setAlerts={setAlerts}/>
      <Outlet context={{ userGachas, setUserGachas, alerts, setAlerts }}/>
    </div>
  )
}