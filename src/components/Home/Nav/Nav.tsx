import './Nav.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const navItems = [
    { label: 'INICIO', link: 'home' },
    { label: 'JUEGOS', link: 'games' },
    { label: 'INVOCAR', link: 'invocar' },
    { label: 'COLECCIÓN', link: 'collection' },
    { label: 'MISIONES', link: 'quests' },
    { label: 'AJUSTES', link: 'settings' }
  ];

  return (
    <div className='Nav'>
      {navItems.map((item, index) => {
        return (
          <Link 
            to={item.link} 
            key={index} 
            className={`nav-section ${index === activeIndex ? 'nav-active' : ''}`} 
            onClick={() => setActiveIndex(index)} // Set active item on click
          >
            {/* <img className='img-section-nav' src="./home/invocacion.png" alt={`${item.label} imagen`} /> */}
            <span className='span-section-nav'>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
