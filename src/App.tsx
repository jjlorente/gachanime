import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Home } from './components/Home/Home';

function App() {
  return (
    <Router>
      <div className='App jaro-regular'>
          <Routes>
            <Route path="/" element={ <Login />} />
            <Route path="/home" element={ <Home />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
