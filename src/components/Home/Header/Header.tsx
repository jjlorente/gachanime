import './Header.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Header = (props: any) => {

  const [menu, setMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenu(prevState => !prevState);
  };

  const handleSetActiveIndex = (index: string) => () => {
    props.setActiveIndex(index);
  };

  return (
    <div className='Header'>
      <div className='container-header'>
        <img src="../home/menu-header.svg" alt="Logo" className="logo-menu" onClick={toggleMenu} />
        {menu ? 
        <div>

        </div>
        : 
        <></>
        }
        <Link 
          to={"main"} 
          className="link-reset title-header"
          onClick={handleSetActiveIndex("main")}
        >
          <h1>GACHANIME</h1>
        </Link>

        <Link 
          to={"summon"}
          className="link-reset gachas-container"
          onClick={handleSetActiveIndex("summon")}
        >
          <span>{props.userGachas}</span>
        </Link>

      </div>
    </div>
  )
}
