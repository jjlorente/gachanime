// Nav.tsx
import './Nav.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { navItems, icons } from './navConfig';
import { User } from '../../Interfaces/User';
import { useTranslation } from 'react-i18next';
import { RiGamepadFill } from "react-icons/ri";
import { IoStorefrontSharp } from "react-icons/io5";
import { RiVipCrownFill } from "react-icons/ri";
import { GiMagicGate } from "react-icons/gi";

export const Nav = () => {
  const { i18n, t } = useTranslation();
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
    localStorage.clear()
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
            key={item.link} 
            className={`nav-section link-reset ${item.link === activeIndex ? 'nav-active' : ''}`} 
            onClick={() => setActiveIndex(item.link)}
          >
            {
              /* {
                props.alerts.length > 0 && 
                props.alerts.map((alert:string) => (
                  alert === item.link ? 
                    <span className='alert-nav' key={alert}></span> 
                    :
                    null
                ))
              } */
            }
            { item.link === "games" ? 
                <RiGamepadFill className='nav-icon' style={{height:"28px", width: "28px",marginLeft:"1px"}}/>
              :
              item.link === "summon" ?
                <GiMagicGate className='nav-icon' style={{height:"28px", width: "28px",marginLeft:"1px"}}/>
              :
              item.link === "market" ?
                <IoStorefrontSharp className='nav-icon' style={{height:"28px", width: "28px",marginLeft:"1px"}}/>
              :
              item.link === "ranking" ?
                <RiVipCrownFill className='nav-icon' style={{height:"28px", width: "28px",marginLeft:"1px"}}/>
              :
                icons[item.link as keyof typeof icons]
            }
            {classNav ? (
              <span key={index+"span-nav"} className={activeIndex === item.link ? "span-section-nav-active color-active" : "span-section-nav-active color-inactive"}>
                {i18n.language === "en" ? item.labelEn :  item.labelEs}
              </span>
            ) : (
              <span key={index+"span-nav-inactive"} className='span-section-nav-inactive'>{i18n.language === "en" ? item.labelEn :  item.labelEs}</span>
            )}
          </Link>
        ))}

        </div>
      </div>
      <div className='container-btn-logout'>
        <button onClick={logOut} className="logout-btn">
          {classNav ? <span className='span-active-logout'>{t('links.logOut')}</span> : <span className='span-inactive-logout'>{t('links.logOut')}</span>}
          <img className='svg-logout' src='/home/logout.svg' alt="Logout image for user" />
        </button>
      </div>
    </div>
  );
};
