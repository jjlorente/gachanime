import './Nav.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { googleLogout  } from '@react-oauth/google';

export const Nav = () => {
  const navigate = useNavigate();
  interface User {
    _id: string;
    username: string;
    password: string;
    email: string;
    googleAccount: boolean;
    __v: number;
  }
  
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData: User = JSON.parse(userData);
      setUser(parsedUserData);
    }
  }, []);

  const [classNav, setClassNav] = useState("Nav");
  const [user, setUser] = useState<User>()
  const [activeIndex, setActiveIndex] = useState("main");
  
    
  const navItems = [
    { label: 'Inicio', link: 'main' },
    { label: 'Juegos', link: 'games' },
    { label: 'Misiones', link: 'quests' },
    { label: 'Invocar', link: 'summon' },
    { label: 'Colección', link: 'collection' },
    { label: 'Ajustes', link: 'settings' }
  ];

  const quests = <svg className={activeIndex === "quests" ? 'img-section-nav-active' : 'img-section-nav'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M16.667 18.333H3.333A.833.833 0 012.5 17.5v-15a.833.833 0 01.833-.833h13.334a.833.833 0 01.833.833v15a.833.833 0 01-.833.833zm-10-12.5V7.5h6.666V5.833H6.667zm0 3.334v1.666h6.666V9.167H6.667zm0 3.333v1.667h4.166V12.5H6.667z"></path></svg>
  const main = <svg className={activeIndex === "main" ? 'img-section-nav-active' : 'img-section-nav'} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"  viewBox="0 0 20 20"><path fill="currentColor" d="M17.5 16.667a.833.833 0 0 1-.833.833H3.333a.833.833 0 0 1-.833-.833V7.908a.83.83 0 0 1 .322-.658l6.666-5.185a.83.83 0 0 1 1.024 0l6.666 5.185a.83.83 0 0 1 .322.658z"></path></svg>
  const games = <svg className={activeIndex === "games" ? 'img-section-nav-active' : 'img-section-nav'} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20"><path fill="currentColor" d="m5.875 11.17 2.945 2.947-1.178 1.179 1.18 1.179-1.179 1.178-2.062-2.062-2.358 2.357-1.178-1.178 2.357-2.358L2.34 12.35l1.178-1.178 1.179 1.177zM2.5 2.5l2.955.003 9.848 9.848 1.179-1.178 1.178 1.178-2.062 2.062 2.357 2.358-1.178 1.178-2.358-2.357-2.062 2.062-1.179-1.178 1.179-1.18-9.855-9.853zm12.048 0 2.952.003.002 2.935-3.378 3.377-2.947-2.946z"></path></svg>
  const summon = <svg className={activeIndex === "summon" ? 'img-section-nav-active' : 'img-section-nav'}  xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 19"><path fill="currentColor" d="M8.997.667A8.333 8.333 0 0117.331 9v3.137a1.666 1.666 0 01-.922 1.49l-2.412 1.206v.834a2.5 2.5 0 01-2.353 2.496l-.188.004c.018-.091.03-.183.036-.275l.005-.142v-.417a1.667 1.667 0 00-1.541-1.662l-.125-.004H8.164a1.667 1.667 0 00-1.662 1.541l-.005.125v.417c0 .142.015.282.042.417h-.042a2.5 2.5 0 01-2.5-2.5v-.834l-2.411-1.206a1.666 1.666 0 01-.922-1.491V9A8.333 8.333 0 018.997.667zm-3.333 7.5a1.667 1.667 0 100 3.333 1.667 1.667 0 000-3.333zm6.667 0a1.667 1.667 0 100 3.333 1.667 1.667 0 000-3.333z"></path></svg>
  const collection = <svg className={activeIndex === "collection" ? 'img-section-nav-active' : 'img-section-nav'} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20"><path fill="currentColor" d="M13.333 1.667L17.5 5.833v11.674a.827.827 0 01-.828.826H3.327a.833.833 0 01-.827-.826V2.493c0-.456.37-.826.828-.826h10.005zm-2.059 10.371l1.842 1.842 1.179-1.178-1.842-1.841a3.334 3.334 0 10-6.2-1.904 3.333 3.333 0 005.021 3.081zm-.515-1.693a1.67 1.67 0 01-1.83.385 1.667 1.667 0 111.83-.385z"></path></svg>
  const settings = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" className={activeIndex === "settings" ? 'img-section-nav-active' : 'img-section-nav'}><path fill="currentColor" d="M5 6.755c.32 0 .621-.08.9-.24.28-.16.503-.375.667-.644a1.668 1.668 0 000-1.749 1.825 1.825 0 00-.666-.648c-.28-.16-.58-.24-.901-.24-.32 0-.619.08-.895.24a1.84 1.84 0 00-.66.649 1.668 1.668 0 000 1.748c.165.269.385.483.66.643.276.16.574.24.895.24zm3.838-1.262l1.073.817c.05.04.078.092.087.156a.277.277 0 01-.037.18L8.924 8.378a.224.224 0 01-.13.109.28.28 0 01-.179-.012l-1.27-.493c-.33.232-.622.396-.877.493l-.185 1.31a.304.304 0 01-.092.156.226.226 0 01-.154.06H3.963a.242.242 0 01-.234-.216l-.197-1.31a3.127 3.127 0 01-.864-.493l-1.283.493c-.132.056-.235.024-.309-.097L.039 6.647a.277.277 0 01-.037-.18.232.232 0 01.087-.157l1.086-.817A3.661 3.661 0 011.15 5c0-.216.008-.38.025-.493L.089 3.69a.232.232 0 01-.087-.156.277.277 0 01.037-.18l1.037-1.731c.074-.12.177-.153.309-.097l1.283.493a4.01 4.01 0 01.864-.493l.197-1.31A.242.242 0 013.963 0h2.074c.057 0 .109.02.154.06.045.04.076.092.092.156l.185 1.31c.321.12.613.285.877.493l1.27-.493a.28.28 0 01.18-.012.224.224 0 01.129.109l1.037 1.73a.277.277 0 01.037.18.232.232 0 01-.087.157l-1.073.817c.016.112.024.277.024.493 0 .216-.008.38-.024.493z"></path></svg>
  
  type NavItemLink = 'main' | 'games' | 'summon' | 'collection' | 'quests' | 'settings';

  const icons: Record<NavItemLink, JSX.Element> = {
    main: main,
    games: games,
    summon: summon,
    collection: collection,
    quests: quests,
    settings: settings
  };

  const onMouseEnterNav = () => {
    setClassNav("Nav container-nav-active")
  }

  const onMouseLeaveNav = () => {
    setClassNav("Nav")
  }

  const logOut = () => {
    googleLogout();
    console.log("Logout succes")
    localStorage.setItem("_id", "")
    localStorage.setItem("googleAccount", "")
    localStorage.setItem("userData", "")
    navigate("/")
  }

  return (
    <div className={classNav} onMouseEnter={onMouseEnterNav} onMouseLeave={onMouseLeaveNav}>

      <div>
        <span className={classNav === "Nav container-nav-active" ? "title-nav title-nav-active" : "title-nav"}>{classNav === "Nav container-nav-active" ? 'GACHANIME' : "G"}</span>
        <span className='spacer'></span>
        <div className={classNav === "Nav container-nav-active" ? "nav-items-active" : "nav-items"}>
          {navItems.map((item, index) => {
            return (
              <Link 
                to={item.link} 
                key={index} 
                className={`nav-section link-reset ${item.link === activeIndex ? 'nav-active' : ''}`} 
                onClick={() => setActiveIndex(item.link)}
              >
                {icons[item.link as NavItemLink]}
                {classNav === "Nav container-nav-active" ? <span className={activeIndex === item.link ? "span-section-nav-active color-active" : "span-section-nav-active color-inactive"}>{item.label}</span> : <span className='span-section-nav-inactive'>{item.label}</span> }
              </Link>
            );
          })}
        </div>
      </div>
      <div className='container-btn-logout'>
        <button onClick={logOut} className="logout-btn">
          {classNav === "Nav container-nav-active" ? <span className='span-active-logout'>Cerrar sesión</span> : <span className='span-inactive-logout'>Cerrar sesión</span>}
          <img className='svg-logout' src='../home/logout.svg'></img>
        </button>
      </div>
    </div>
  );
};
