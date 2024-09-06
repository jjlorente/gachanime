import React from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import validator from 'validator'
import { registerUser } from '../../services/user';
import { registerGacha } from '../../services/gacha';
import GoogleLogin from '../Login/GoogleLogin/GoogleLogin';
import { registerUserCard } from '../../services/userCards';
import { useTranslation } from 'react-i18next';

export const Register = () => {
  const {i18n, t} = useTranslation();
  const navigate = useNavigate();
  
  const [inputName, setInputName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [inputText, setInputText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);

  const [showErrorLogin, setShowErrorLogin] = useState<string>("");

  const submitUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let googleAccount = false;
    if (password !== passwordRepeat) {
      setShowErrorLogin(t('login.repeatedPassword'))
      setPasswordRepeat("")
      document.getElementById("passwordRepeat")?.focus()
    } else if(!emailCheck(email)) {
      setShowErrorLogin(t('login.errorMail'))
      setEmail("")
      document.getElementById("email")?.focus()
    } else {
      try {
        const data = await registerUser(username, password, email, googleAccount);
        if(data._id) {
          const dataGacha = await registerGacha(data._id, 100);
          const userCard = await registerUserCard(data._id);
          console.log(dataGacha)
          localStorage.setItem("_id", data._id)
          localStorage.setItem("googleAccount", data.googleAccount)
          navigate('/home');
        }
      } catch (error: any) {
        if(error.message === "Nombre de usuario en uso") {
          setShowErrorLogin(t('login.repeatedUsername'))
          setUsername("")
          setPassword("")
          setPasswordRepeat("")
          document.getElementById("username")?.focus()
        } else if(error.message === "Credenciales inválidas") {
          setShowErrorLogin(t('login.wrongPass'))
          setPassword("")
          setPasswordRepeat("")
          document.getElementById("password")?.focus()
        } else if(error.message === "Correo electrónico en uso") {
          setShowErrorLogin(t('login.repeatedMail'))
          setEmail("")
          setPassword("")
          setPasswordRepeat("")
          document.getElementById("email")?.focus()
        }
      }
    }
  }

  const logInUser =()=>  {
    navigate('/auth');
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setInputText(event.target.id)
    setInputName(event.target.id)
  }

  const handleBlur = () => {
    setInputText("event.target.id")
  }

  const handlePasswordToggle = (event: React.MouseEvent<HTMLImageElement>) => {
      event.preventDefault();
      const target = event.target as HTMLImageElement;

      setTimeout(() => {
        if(target.id === "passwordRef") {
          if (passwordRef.current) {
            setShowPassword(!showPassword);
            const length = passwordRef.current.value.length;
            passwordRef.current.focus();
            passwordRef.current.setSelectionRange(length, length);
          }
        } else if (target.id === "passwordRepeatRef") {
          if (passwordRepeatRef.current) {
            setShowPasswordRepeat(!showPasswordRepeat);
            const length = passwordRepeatRef.current.value.length;
            passwordRepeatRef.current.focus();
            passwordRepeatRef.current.setSelectionRange(length, length);
          }
        }
      }, 0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
  
    if (inputName === "username") {
      if (alphanumericRegex.test(value)) {
        setUsername(value);
      }
    } else if (inputName === "password") {
      if (alphanumericRegex.test(value)) {
        setPassword(value);
      }
    } else if (inputName === "passwordRepeat") {
      if (alphanumericRegex.test(value)) {
        setPasswordRepeat(value);
      }
    } else if (inputName === "email") {
      setEmail(value);
    }
  };

  const emailCheck = (email: string) => {
    if (validator.isEmail(email)) {
      return true
    }
    return false
  };

  return (
  <>
    <form className='form-user' onSubmit={submitUser}>
      <div className='input-container'>
        {inputText === "email" ? <span className='span-input-focus'>{t('login.mail')}</span> : ""}
        <input
          type="email"
          name='email'
          id="email"
          value={email}
          onChange={handleInputChange}
          required
          placeholder={inputText === "email" ? "" : t('login.mail')}
          className='jaro-regular'
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={45}
        />
      </div>
      <div className='input-container'>
        {inputText === "username" ? <span className='span-input-focus'>{t('login.username')}</span> : ""}
        <input
          type="text"
          id="username"
          name='username'
          value={username}
          onChange={handleInputChange}
          required
          placeholder={inputText === "username" ? "" : t('login.username')}
          className='jaro-regular'
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={15}
          minLength={5}
        />
      </div>
      <div className='input-container'>
        {inputText === "password" ? <span className='span-input-focus'>{t('login.password')}</span> : ""}
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name='password'
          value={password}
          ref={passwordRef}
          onChange={handleInputChange}
          required
          placeholder={inputText === "password" ? "" : t('login.password')}
          className='jaro-regular'
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={15}
          minLength={6}
        />
        <img id='passwordRef' className='btn-toggle-password' onClick={handlePasswordToggle} src={showPassword ? "../eye-2.png" : "../eye-1.png"} alt=""/>
      </div>
      <div className='input-container'>
        {inputText === "passwordRepeat" ? <span className='span-input-focus'>{t('login.repeatPass')}</span> : ""}
        <input
          type={showPasswordRepeat ? "text" : "password"}
          id="passwordRepeat"
          name='passwordRepeat'
          value={passwordRepeat}
          ref={passwordRepeatRef}
          onChange={handleInputChange}
          required
          placeholder={inputText === "passwordRepeat" ? "" : t('login.repeatPass')}
          className='jaro-regular'
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={15}
          minLength={6}
        />
        <img id='passwordRepeatRef' className='btn-toggle-password' onClick={handlePasswordToggle} src={showPasswordRepeat ? "../eye-2.png" : "../eye-1.png"} alt=""/>
      </div>
      {showErrorLogin ? 
        <span className='span-error-login'>{showErrorLogin}</span> : <></>
      }
      <button className='btn-form jaro-regular' type='submit'>{t('login.registerButton')}</button>
      <span className='span-reg'>{t('login.alReadyAcc')} <span className='reg-btn' onClick={logInUser}>{t('login.login')}</span></span>
    </form>
    <div className='container-spacer'>
        <span className='span-spacer'></span>
        <span className='span-text-spacer'>{t('login.or')}</span>
        <span className='span-spacer'></span>
    </div>
    <GoogleLogin />
  </>
  )
}
