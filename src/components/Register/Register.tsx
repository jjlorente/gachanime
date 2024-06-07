import React from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { GoogleLogin } from 'react-google-login';
import validator from 'validator'

export const Register = () => {

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

  const clientId = "343896712510-niddt5vhrnapb2gep298evcio2m9jtd4.apps.googleusercontent.com"
  const onSuccess = (res: any) => {
      let email = res.profileObj.email;
      let username = res.profileObj.name;
      let googleAccount = true;

      fetch('http://localhost:3000/api/users/findGoogle', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, googleAccount }),
      })
      .then(response => response.json())
      .then(data => {
          if(data._id) {
              localStorage.setItem("_id", data._id)
              localStorage.setItem("googleAccount", data.googleAccount)
              navigate('/home');
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

  const onFailure = (res: any) => {
      console.log("Login failed", res)
  }

  const submitUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let googleAccount = false;
    if (password !== passwordRepeat) {
      setShowErrorLogin("Contraseña repetida incorrecta")
      setPasswordRepeat("")
      document.getElementById("passwordRepeat")?.focus()
    } else if(!emailCheck(email)) {
      setShowErrorLogin("Correo electronico invalido")
      setEmail("")
      document.getElementById("email")?.focus()
    } else {
      fetch('http://localhost:3000/api/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, googleAccount }),
      })
      .then(response => response.json())
      .then(data => {
        if(data._id) {
          localStorage.setItem("_id", data._id)
          localStorage.setItem("googleAccount", data.googleAccount)
          navigate('/home');
        } else {
          if(data.error === "Nombre de usuario en uso") {
            setShowErrorLogin("Nombre de usuario en uso")
            setUsername("")
            setPassword("")
            setPasswordRepeat("")
            document.getElementById("username")?.focus()
          } else if(data.error === "Credenciales inválidas") {
            setShowErrorLogin("Contraseña incorrecta")
            setPassword("")
            setPasswordRepeat("")
            document.getElementById("password")?.focus()
          } else if(data.error === "Correo electrónico en uso") {
            setShowErrorLogin("Correo electrónico en uso")
            setEmail("")
            setPassword("")
            setPasswordRepeat("")
            document.getElementById("email")?.focus()
          }
        }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
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
        {inputText === "email" ? <span className='span-input-focus'>Correo electrónico</span> : ""}
        <input
          type="email"
          name='email'
          id="email"
          value={email}
          onChange={handleInputChange}
          required
          placeholder={inputText === "email" ? "" : "Correo electrónico"}
          className='jaro-regular'
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={45}
        />
      </div>
      <div className='input-container'>
        {inputText === "username" ? <span className='span-input-focus'>Nombre de usuario</span> : ""}
        <input
          type="text"
          id="username"
          name='username'
          value={username}
          onChange={handleInputChange}
          required
          placeholder={inputText === "username" ? "" : "Nombre de usuario"}
          className='jaro-regular'
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={15}
          minLength={5}
        />
      </div>
      <div className='input-container'>
        {inputText === "password" ? <span className='span-input-focus'>Contraseña</span> : ""}
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name='password'
          value={password}
          ref={passwordRef}
          onChange={handleInputChange}
          required
          placeholder={inputText === "password" ? "" : "Contraseña"}
          className='jaro-regular'
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={15}
          minLength={6}
        />
        <img id='passwordRef' className='btn-toggle-password' onClick={handlePasswordToggle} src={showPassword ? "../eye-2.png" : "../eye-1.png"} alt=""/>
      </div>
      <div className='input-container'>
        {inputText === "passwordRepeat" ? <span className='span-input-focus'>Repite la contraseña</span> : ""}
        <input
          type={showPasswordRepeat ? "text" : "password"}
          id="passwordRepeat"
          name='passwordRepeat'
          value={passwordRepeat}
          ref={passwordRepeatRef}
          onChange={handleInputChange}
          required
          placeholder={inputText === "passwordRepeat" ? "" : "Repite la contraseña"}
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
      <button className='btn-form jaro-regular' type='submit'>Registrarse</button>
      <span className='span-reg'>¿Ya tienes una cuenta? <span className='reg-btn' onClick={logInUser}>Inicia sesión</span></span>
    </form>
    <div className='container-spacer'>
        <span className='span-spacer'></span>
        <span className='span-text-spacer'>O</span>
        <span className='span-spacer'></span>
    </div>
    <GoogleLogin
      clientId={clientId}
      buttonText="Continuar con Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      className="google-btn jaro-regular"
    />
  </>
  )
}
