import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { ContainerForm } from './components/ContainerForms/ContainerForm';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("_id");

    if (userId) {
      navigate('/home');
    }
    
  }, []);


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
