// Nav.tsx
import './Nav.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { navItems, icons } from './navConfig';
import { User } from '../../Interfaces/User';

export const Nav = (props: any) => {

  const navigate = useNavigate(); 
  const location = useLocation();
  const [classNav, setClassNav] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeIndex, setActiveIndex] = useState("main");

  useEffect(() => {
    let path = location.pathname.split("/")[2];
    setActiveIndex(path)
  }, [location]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData: User = JSON.parse(userData);
      setUser(parsedUserData);
    }
  }, [classNav]);

  const onToggleMenu = () => {
    setClassNav(!classNav);
  }

  const svgMenu = (
    <svg 
      className={classNav ? 'toggle-section-nav-active' : 'toggle-section-nav'} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20">
      <path fill="currentColor" d="M4 16V4H2v12h2zM13 15l-1.5-1.5L14 11H6V9h8l-2.5-2.5L13 5l5 5-5 5z"></path>
    </svg>
  );

  const logOut = () => {
    googleLogout();
    console.log("Logout successful");
    localStorage.removeItem("_id");
    localStorage.removeItem("googleAccount");
    localStorage.removeItem("userData");
    navigate("/");
  }

  return (
    <div className={classNav ? "Nav Nav-active" : "Nav"}>
      <div>
        <div className="toggle-section link-reset" onClick={onToggleMenu}>
          {classNav ? user?.username : ""}{svgMenu}
        </div>
        <div className={classNav ? "nav-items-active" : "nav-items"}>
          {navItems.map((item, index) => (
            <Link 
              to={item.link} 
              key={index} 
              className={`nav-section link-reset ${item.link === activeIndex ? 'nav-active' : ''}`} 
              onClick={() => setActiveIndex(item.link)}
            >
              {icons[item.link as keyof typeof icons]}
              {classNav ? (
                <span className={activeIndex === item.link ? "span-section-nav-active color-active" : "span-section-nav-active color-inactive"}>
                  {item.label}
                </span>
              ) : (
                <span className='span-section-nav-inactive'>{item.label}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className='container-btn-logout'>
        <button onClick={logOut} className="logout-btn">
          {classNav ? <span className='span-active-logout'>Cerrar sesión</span> : <span className='span-inactive-logout'>Cerrar sesión</span>}
          <img className='svg-logout' src='../../home/logout.svg' alt="logout" />
        </button>
      </div>
    </div>
  );
};
