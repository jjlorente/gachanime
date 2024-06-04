import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { ContainerForm } from './components/ContainerForms/ContainerForm';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem("_id")) {
      navigate('/home');
    } else {
      navigate('/user');
    }
  }, [])

  return (
      <div className='App jaro-regular'>
          <Routes>

            <Route path="user" element={ <ContainerForm />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="/home" element={ <Home/> } />
          </Routes>
      </div>
  );
}

export default App;
