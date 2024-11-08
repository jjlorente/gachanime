import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { navItems, icons } from '../Nav/navConfig';
import { useTranslation } from 'react-i18next';
import { RiGamepadFill } from "react-icons/ri";
import { IoStorefrontSharp } from "react-icons/io5";
import { RiVipCrownFill } from "react-icons/ri";
import { GiMagicGate } from "react-icons/gi";

export const Header = (props: any) => {
  const [menu, setMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const toggleMenu = () => {
    setMenu(prevState => !prevState);
  };

  const handleSetActiveIndex = (index: string) => () => {
    props.setActiveIndex(index);
  };

  const logOut = () => {
    googleLogout();
    localStorage.setItem("_id", "");
    localStorage.setItem("googleAccount", "");
    localStorage.setItem("userData", "");
    navigate("/");
  };

  return (
    <div className='Header'>
      <div className='container-header'>
        <img
          src={menu ? "/home/close.png" : "/home/menu-header.svg"}
          alt="Image for toggle Menu Header"
          className="logo-menu"
          onClick={toggleMenu}
        />
        {menu ? (
          <div className='vertical-nav'>
            {navItems.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                className={`item-nav-vertical link-reset ${item.link === props.activeIndex ? 'nav-active' : ''}`}
                onClick={() => {handleSetActiveIndex(item.link); setMenu(false)}}
              >
                { item.link === "games" ? 
                    <RiGamepadFill style={{height:"25px", width: "25px"}}/>
                  :
                  item.link === "summon" ?
                    <GiMagicGate style={{height:"25px", width: "25px"}}/>
                  :
                  item.link === "market" ?
                    <IoStorefrontSharp style={{height:"25px", width: "25px"}}/>
                  :
                  item.link === "ranking" ?
                    <RiVipCrownFill style={{height:"25px", width: "25px"}}/>
                  :
                    icons[item.link as keyof typeof icons]
                }
                <span className={props.activeIndex === item.link ? "span-section-nav-active color-active" : "span-section-nav-active color-inactive"}>
                  {i18n.language === "en" ? item.labelEn :  item.labelEs}
                </span>
              </Link>
            ))}
            <div className='container-btn-logout'>
              <button onClick={logOut} className="logout-btn">
                <span className='span-active-logout'>{t('links.logOut')}</span>
                <img className='svg-logout' src='/home/logout.svg' alt="Image for logout user" />
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <Link
          to={"main"}
          className="link-reset"
          onClick={handleSetActiveIndex("main")}
        >
          <h1 className='title-header'>GACHANIME</h1>
        </Link>
        <Link
          to={"summon"}
          className="link-reset gachas-container"
          onClick={handleSetActiveIndex("summon")}
        >
          <span>{props.userGachas}</span>
          <img
            src='/home/summon-o.png'
            alt="Logo of Summon"
            className='logo-summon'
          />
        </Link>
      </div>
    </div>
  );
};
