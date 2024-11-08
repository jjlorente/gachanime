import './Settings.css'
import { useState, useEffect, useRef } from 'react';
import { findUserById, updateUser, updateUserLan } from '../../../services/user';
import EditProfilePicture from './EditProfilePicture/EditProfilePicture';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const [user, setUser] = useState<any>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [valueInput, setValueInput] = useState<string>("");
  const [errorInput, setErrorInput] = useState<string>("");
  const { i18n, t } = useTranslation();


  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setValueInput(event.target.value)
      setErrorInput("")
    }
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

  const handleSaveUsername = async () => {
    try {
      const data = await updateUser(user._id, "", valueInput, 60)
      if (data) {
        setUser(data);
        setValueInput("")
      }
    } catch (error: any) {
        handleLoginError(error);
    }
  };  

  const updateLan = async (code: string) => {
    try {
      const data = await updateUserLan(user._id, code)
      if(data)
        i18n.changeLanguage(code);
    } catch (error: any) {
      console.log(error)
    }
  };  

  const handleLoginError = (error: any) => {
    switch (error.message) {
      case "Username already taken":
        setErrorInput(t('settings.errorName'));
        setValueInput("")
        document.getElementById("edit-username-input")?.focus()
        break;
      default:
        setErrorInput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="Settings">
      <div className='section-settings'>
        <div className='container-picture-profile'>
          {user ?
            <>
              <EditProfilePicture user={user} setUser={setUser}/>
            </>
            :
            null
          }
          {user ?
            <>
              <span className='title-section-settings' style={{marginBottom:"-15px"}}>{t('settings.configUser')}</span>
              <div className='edit-username-cnt'>
                <div className='container-edit-username'>
                  <span style={{fontSize:"1.1rem"}}>{t('settings.nameUser')}</span>
                  <div className='edit-username'>
                    <input 
                      className='input-username jaro-regular' 
                      id='edit-username-input'
                      type="text"
                      value={valueInput}
                      placeholder={user.username} 
                      ref={inputRef}
                      maxLength={14}
                      onChange={handleChangeInput}
                    />
                  </div>
                  {
                    errorInput ?
                    <span style={{color:"#ff4747"}}>{errorInput}</span>
                    :
                    null
                  }
                </div>
                {valueInput && (
                  <div className='cnt-buttons-flex-1'>
                    <button style={{ backgroundColor: "#31ae31", maxHeight:"40px" }} className='link-main jaro-regular btn-flex-1' onClick={handleSaveUsername}>{t('settings.apply')}</button>
                    <button style={{ backgroundColor: "#ff4d4d", maxHeight:"40px" }} className='link-main jaro-regular btn-flex-1' onClick={()=>{setValueInput("")}}>{t('settings.cancel')}</button>
                  </div>
                )}
              </div>
            </>
            :
            null
          }
          <>
            <span className='title-section-settings' style={{marginBottom:"-15px"}}>{t('settings.languages')}</span>
            <div className='edit-picture'>
              <div className='container-edit-username'>
                <div 
                  onClick={() => updateLan("en")}
                  className='edit-language' 
                  style={{ backgroundColor: i18n.language === "en" ? "rgb(75 137 252)" : "" }}
                >
                  <img
                    alt="Spain"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
                    width={"50px"}
                  />
                  <span>{t('settings.spanEnglish')}</span>
                </div>
                <div 
                  onClick={() => updateLan("es")}
                  className='edit-language' 
                  style={{ backgroundColor: i18n.language === "es" ? "rgb(75 137 252)" : "" }}
                >
                  <img
                    alt="Spain"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg"
                    width={"50px"}
                  />
                  <span style={{fontSize:"1.2rem"}}>{t('settings.spanSpanish')}</span>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  )
}
