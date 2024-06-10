import './Home.css'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { Nav } from './Nav/Nav';

export const Home = () => {

  const [_id, set_Id] = useState<string>('');
  const [googleAccount, setGoogleAccount] = useState<boolean>(false);
  const [userData, setUserData] = useState<boolean>(false);

  const navigate = useNavigate();
  const clientId = "343896712510-niddt5vhrnapb2gep298evcio2m9jtd4.apps.googleusercontent.com"

  const onSuccessLogout = () => {
    console.log("Logout succes")
    localStorage.setItem("_id", "")
    localStorage.setItem("googleAccount", "")
    localStorage.setItem("userData", "")
    navigate("/")
  }

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
  }, []);

  return (
    <div className='Home'>
      <Nav />
      <Outlet />
    </div>
  )
}
