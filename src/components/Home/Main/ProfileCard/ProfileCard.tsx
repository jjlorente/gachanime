import React from 'react'
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ProfileCard = (props:any) => {
  const { i18n, t } = useTranslation();

  return (
    <>
        {
            props.dataUser ?
        
            <div className='estandarte-container'>
                <div className='estandarte'>
                    <div style={{position:"relative", display:"flex", justifyContent:"center", cursor:"pointer"}} className="link-settings-hover">
                        <img className='img-marco' src={props.dataUser.profilePicture}>
                        </img>
                        <Link to={"/home/settings"} className='edit-route-image' ><MdEdit/></Link>
                        <span className='profile-level'>{t('user-card.level')} {props.dataUser.profileLevel}</span>
                    </div>
                    <span className='exp-profile'>{props.dataUser.profileExp} / {props.dataUser.profileExpNextLevel}</span>
                    <div className='container-power-name-profile'>
                        <span className='name-profile'>{props.dataUser.username}</span>
                        <div style={{display:"flex",justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                            <span className='power-profile'>{t('user-card.power')}</span>
                            {props.power ? Number(props.power).toLocaleString('es-ES') : 'Calculating...'}
                        </div>
                    </div>
                </div>
            </div>

            :

            null
        }
    </>
  )
}
