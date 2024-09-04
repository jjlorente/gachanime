import React from 'react'
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';

export const ProfileCard = (props:any) => {
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
                        <span className='profile-level'>LEVEL {props.dataUser.profileLevel}</span>
                    </div>
                    <span className='exp-profile'>{props.dataUser.profileExp} / {props.dataUser.profileExpNextLevel}</span>
                    <div className='container-power-name-profile'>
                        <span className='name-profile'>{props.dataUser.username}</span>
                        <div style={{display:"flex",justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                            <span className='power-profile'>PODER TOTAL</span>
                            {props.power ? Number(props.power).toLocaleString('es-ES') : '0'}
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
