import './Nav.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Assuming the second item is active by default

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
        let itemStyle = {};

        // Apply border radius to the item above the active one
        if (index === activeIndex - 1) {
          itemStyle = { ...itemStyle, borderRadius: '0 0 20px 0' };
        }

        // Apply border radius to the active item
        if (index === activeIndex) {
          itemStyle = { ...itemStyle, borderRadius: '20px 0 20px 0', borderTop: '1px solid #34a0ff' };
        }

        // Apply border radius to the item below the active one
        if (index === activeIndex + 1) {
          itemStyle = { ...itemStyle, borderRadius: '0 20px 0 0', borderTop: '1px solid #34a0ff' };
        }

        if (index === navItems.length - 1) {
          itemStyle = { ...itemStyle, borderBottom: '0px' };
        }

        return (
          <Link 
            to={item.link} 
            key={index} 
            className={`nav-section ${index === activeIndex ? 'nav-active' : ''}`} 
            style={itemStyle}
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
