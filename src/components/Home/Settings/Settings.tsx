import { useUserGames } from '../Games/Games';
import './Settings.css'
import { useState, useEffect, useRef } from 'react';
import { findUserById } from '../../../services/user';
import { MdEdit } from "react-icons/md";

export const Settings = (props:any) => {
  const { userGamesData } = useUserGames();
  const [user, setUser] = useState<any>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(true);
    if(inputRef.current) {
      inputRef.current.focus();
    }
    document.getElementById("edit-username-input")?.focus()
  };

  useEffect(() => {

    const findUserData = async () => {
      try {
        let userId = localStorage.getItem("_id");
        if(userId){
          const userData = await findUserById(userId);
          setUser(userData)
        }
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };

    findUserData();
  }, []);

  return (
    <div className="Settings">
      <div className='section-settings'>
        <div className='container-picture-profile'>
          {user ?
            <>
              <span className='title-section-settings' style={{marginBottom:"-15px"}}>Foto de perfil</span>
              <div className='edit-picture'>
                <img className='img-marco' src={user.profilePicture}/>
                <div className='container-edit-picture'>
                  <button className='link-main jaro-regular' style={{maxHeight:"50px"}}>Editar foto de perfil</button>
                  <span>Debe ser JPEG, PNG o GIF y no puede exceder los 10 MB</span>
                </div>
              </div>
            </>
            :
            null
          }
          {user ?
            <>
              <span className='title-section-settings' style={{marginBottom:"-15px"}}>Configuración de usuario</span>
              <div className='edit-picture'>
                <div className='container-edit-username'>
                  <span style={{fontSize:"1.2rem"}}>Nombre de usuario </span>
                  <div className='edit-username'>
                    <input 
                      className='input-username jaro-regular' 
                      id='edit-username-input'
                      type="text" 
                      placeholder={user.username} 
                      ref={inputRef}
                      maxLength={14}
                    />
                  </div>
                </div>
              </div>
            </>
            :
            null
          }
          <>
            <span className='title-section-settings' style={{marginBottom:"-15px"}}>Idiomas</span>
            <div className='edit-picture'>
              <div className='container-edit-username'>
                <div className='edit-language'>
                  <img
                    alt="Spain"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
                    width={"70px"}
                  />
                  <span>Inglés</span>
                </div>
                <div className='edit-language'>
                  <img
                    alt="Spain"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg"
                    width={"70px"}
                  />
                  <span>Español</span>
                </div>
              </div>
            </div>
          </>

          <>
              <span className='title-section-settings' style={{marginBottom:"-15px"}}>Sonido</span>
              <div className='edit-picture'>
                <div className='container-edit-username'>
                  <div className='edit-language'>
                    <span>bandera</span>
                    <span>Español</span>
                  </div>
                  <div className='edit-language'>
                    <span>bandera</span>
                    <span>Español</span>
                  </div>
                </div>
              </div>
            </>
           

        </div>
      </div>
    </div>
  )
}
