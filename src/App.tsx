import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { ContainerForm } from './components/ContainerForms/ContainerForm';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { Games } from './components/Home/Games/Games';
import { Quests } from './components/Home/Quests/Quests';
import { Settings } from './components/Home/Settings/Settings';
import { Main } from './components/Home/Main/Main';
import { Summon } from './components/Home/Summon/Summon';
import { Collection } from './components/Home/Collection/Collection';
import { Summoning } from './components/Home/Summon/Summoning/Summoning';
import { NameGame } from './components/Home/Games/NameGame/NameGame';
import { ImageGame } from './components/Home/Games/ImageGame/ImageGame';
import backgroundImage from './assets/image.jpg'
import { SiluetaGame } from './components/Home/Games/SiluetaGame/SiluetaGame';
import { OpeningGame } from './components/Home/Games/OpeningGame/OpeningGame';
import { EyeGame } from './components/Home/Games/EyeGame/EyeGame';
function App() {
  const navigate = useNavigate();
  const clientId = "343896712510-niddt5vhrnapb2gep298evcio2m9jtd4.apps.googleusercontent.com"

  useEffect(() => {
    const userId = localStorage.getItem("_id");

    if (userId) {
      navigate('/home/main');
    }
    
  }, []);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      }).then(() => {
        console.log("GAPI client initialized successfully");
      }).catch((error: any) => {
        console.error("Error initializing GAPI client", error);
      });
    }

    if (gapi && gapi.load) {
      gapi.load('client:auth2', start);
    } else {
      console.error("GAPI script not loaded correctly");
    }
  }, []);

  return (
    <div className='App jaro-regular' style={{backgroundImage:"url('/images/anime-sky.jpg')"}}>
      <Routes>

        <Route path="auth" element={<ContainerForm />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="home" element={<Home />} >
          <Route index element={<Navigate to="main" />} />
          <Route path="*" element={<Navigate to="/main" replace />}/>
          <Route path='main' element={<Main />} />

          <Route path='games' element={<Games />} >
            <Route index element={<Navigate to="image" />} />
            <Route path='name' element={<NameGame />} />
            <Route path='image' element={<ImageGame />} />
            <Route path='silueta' element={<SiluetaGame />} />
            <Route path='opening' element={<OpeningGame />} />
            <Route path='eyes' element={<EyeGame />} />
          </Route>

          <Route path="summon" element={<Summon />} />
          <Route path="collection" element={<Collection />} />
          <Route path="quests" element={<Quests />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="auth" replace />}/>
        <Route path="summoning" element={<Summoning />} />

      </Routes>
    </div>
  );
}

export default App;
