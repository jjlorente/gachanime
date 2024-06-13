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
    // Function to start gapi client
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

    // Ensure gapi is loaded before attempting to initialize
    if (gapi && gapi.load) {
      gapi.load('client:auth2', start);
    } else {
      console.error("GAPI script not loaded correctly");
    }
  }, []);

  return (
    <div className='App jaro-regular'>
      <Routes>
        <Route path="auth" element={<ContainerForm />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="home" element={<Home />} >
          <Route index element={<Navigate to="main" />} />
          <Route path="*" element={<Navigate to="/main" replace />}/>
          <Route path='main' element={<Main />} />
          <Route path='games' element={<Games />} />
          <Route path="summon" element={<Summon />} />
          <Route path="collection" element={<Collection />} />
          <Route path="quests" element={<Quests />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="auth" replace />}/>
      </Routes>
    </div>
  );
}

export default App;
