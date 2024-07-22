import { Link, Outlet } from 'react-router-dom'
import './Games.css'

export const Games = (props:any) => {
  return (
    <div className="Games">
      <div className='nav-games'>
        <Link 
          to="name" 
          className={`link-reset link-game`} 
        >
          Adivina el personaje
        </Link>
        <Link 
          to="image" 
          className={`link-reset link-game`} 
        >
          Adivina el anime
        </Link>
      </div>
      <div className='section-games'>
        <Outlet/>
      </div>
    </div>
  )
}
