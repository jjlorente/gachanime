import { Link, Outlet } from 'react-router-dom'
import { useEffect,useState } from 'react'
import './Games.css'
import { useUserGachas } from "../Home";

export const Games = (props:any) => {
  const { userGachas, setUserGachas } = useUserGachas();

  useEffect(()=> {
    console.log(userGachas, setUserGachas)
  },[])

  const [index, setIndex] = useState("image")

  return (
    <div className="Games">
      <div className='nav-games'>
        <Link 
          to="image" 
          className={index === "image" ? "active-game link-reset link-game " : "link-reset link-game"} 
          onClick={()=>{setIndex("image")}}
        >
          ANIME
        </Link>
        <Link 
          to="name" 
          className={index === "name" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"} 
          onClick={()=>{setIndex("name")}}
        >
          PERSONAJE
        </Link>
        <Link 
          to="name" 
          className={index === "silueta" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"} 
          onClick={()=>{setIndex("silueta")}}
        >
          SILUETA
        </Link>
        <Link 
          to="name" 
          className={index === "adivinanza" ? "active-game link-reset link-game inactive-game" : "link-reset link-game inactive-game"} 
          onClick={()=>{setIndex("adivinanza")}}
        >
          ADIVINANZA
        </Link>
      </div>
      <div className='section-games'>
        <Outlet context={{ userGachas, setUserGachas }}/>
      </div>
    </div>
  )
}
