import { Outlet } from 'react-router-dom';
import "./ContainerForm.css"

export const ContainerForm = () => {
  return (
    <div className='container-app'>
      <div className='container-title'>
          <h1 className="title jaro-regular">
            GACHANIME
          </h1>
          <img className='goku-up-img' src="../goku-sticker-1.png" alt="sticker goku" />
      </div>
      <div className='container-form'>
        <h2 className="jaro-regular" id='title-form'>¡Bienvenido a <span style={{color:"rgb(255, 170, 42)", margin:"0", padding:"0"}}>GACHANIME</span>!</h2>
        <Outlet />
      </div>
    </div>
  )
}
