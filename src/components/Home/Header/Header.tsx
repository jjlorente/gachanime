import './Header.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout  } from '@react-oauth/google';
import { navItems, icons } from '../Nav/navConfig';

export const Header = (props: any) => {
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    console.log("HEADER")
  },[])

  const toggleMenu = () => {
    setMenu(prevState => !prevState);
  };

  const handleSetActiveIndex = (index: string) => () => {
    props.setActiveIndex(index);
  };

  const logOut = () => {
    googleLogout();
    console.log("Logout succes")
    localStorage.setItem("_id", "")
    localStorage.setItem("googleAccount", "")
    localStorage.setItem("userData", "")
    navigate("/")
  }

  const navigate = useNavigate();
  return (
    <div className='Header'>
      <div className='container-header'>
        <img src={menu ? "../home/close.png" : "../home/menu-header.svg"} alt="Logo" className="logo-menu" onClick={toggleMenu} />
        {menu ? 
          <div className='vertical-nav'>
            {navItems.map((item, index) => {
              return (
                <Link 
                  to={item.link} 
                  key={index} 
                  className={`item-nav-vertical link-reset ${item.link === props.activeIndex ? 'nav-active' : ''}`} 
                  onClick={() => props.setActiveIndex(item.link)}
                >
                  {icons[item.link as keyof typeof icons]}
                  <span className={props.activeIndex === item.link ? "span-section-nav-active color-active" : "span-section-nav-active color-inactive"}>{item.label}</span>
                </Link>
              );
            })}
            <div className='container-btn-logout'>
              <button onClick={logOut} className="logout-btn">
                <span className='span-active-logout'>Cerrar sesión</span>
                <img className='svg-logout' src='../home/logout.svg'></img>
              </button>
            </div>
          </div>
          : 
          <></>
        }
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
          <img src='../../home/summon-o.png' alt="Logo Summon" className='logo-summon'></img>
        </Link>

      </div>
    </div>
  )
}
