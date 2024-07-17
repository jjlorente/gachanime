import './Home.css'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Nav } from './Nav/Nav';
import { Header } from './Header/Header';
import { findGacha } from '../../services/gacha';
import { useNavigate, useLocation } from 'react-router-dom';

export const Home = () => {

  const [_id, set_Id] = useState<string>('');
  const [googleAccount, setGoogleAccount] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();
  const [userGachas, setUserGachas] = useState<any>(0);
  const [userThrows, setUserThrows] = useState<any>(0);

  const [activeIndex, setActiveIndex] = useState<any>("main");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const parts = path.split('/'); // Divide la ruta por '/'
    const lastPart = parts[parts.length - 1]; 
    setActiveIndex(lastPart)
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
      fetch(`http://localhost:3000/api/users/findById?id=${idUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setUserData(data);
          localStorage.setItem("userData", JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [activeIndex]);

  const getGachasAndThrows = async (userid: string) => {
    const dataGacha = await findGacha(userid);
    if (dataGacha) {
      setUserGachas(dataGacha.gachas)
      setUserThrows(dataGacha.throws)
    }
  }

  return (
    <div className='Home'>
      <Header userData={userData} userGachas={userGachas} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
      <Nav userData={userData} userGachas={userGachas} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
      <Outlet />
    </div>
  )
}
