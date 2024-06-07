import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { ContainerForm } from './components/ContainerForms/ContainerForm';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

function App() {
  const navigate = useNavigate();
  const clientId = "343896712510-niddt5vhrnapb2gep298evcio2m9jtd4.apps.googleusercontent.com"

  useEffect(() => {
    const userId = localStorage.getItem("_id");

    if (userId) {
      navigate('/home');
    }
    
  }, []);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start)
  }, [])

  return (
    <div className='App jaro-regular'>
      <Routes>
        <Route path="auth" element={<ContainerForm />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="home" element={<Home />} />
        <Route path="*" element={<Navigate to="auth" replace />}/>
      </Routes>
    </div>
  );
}

export default App;
