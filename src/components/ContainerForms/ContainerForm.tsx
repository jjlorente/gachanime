import { Outlet } from 'react-router-dom';
import "./ContainerForm.css"
import { useTranslation } from 'react-i18next';

export const ContainerForm = () => {
  const { t } = useTranslation();
  return (
    <div className='container-app'>
      <div className='background-login-img'></div>
      <div className='container-title'>
        <h1 className="title jaro-regular">
          GACHANIME
        </h1>
        <span className="eslogan-title jaro-regular" style={{marginTop:"-.8rem", color:"white"}}>
          {t('login.eslogan')} 
        </span>
        <img className='goku-up-img' src="../goku-sticker-1.png" alt="Sticker of Goku, from Dragon Ball" />
      </div>
      <div className='container-form'>
        <h2 className="jaro-regular" id='title-form'>
          {t('login.titleLogin')} <span style={{color:"rgb(255, 170, 42)", margin:"0", padding:"0"}}>GACHANIME</span>!
        </h2>
        <Outlet />
      </div>
    </div>
  )
}
