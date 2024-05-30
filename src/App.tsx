import './App.css';
import React, { useState } from 'react';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [inputText, setInputText] = useState('');

  function submitUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Nombre de usuario:", username);
    console.log("Contraseña:", password);
  }

  function registerUser() {
    console.log("Nombre de usuario:", username);
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    console.log("Input enfocado:", event.target.id);
    setInputText(event.target.id)
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    setInputText("event.target.id")
  }

  return (
    <div className='App jaro-regular'>

      <div className='container-app'>

        <div className='container-title'>
          <h1 className="title jaro-regular">
            GACHANIME
          </h1>
          <img className='goku-up-img' src="./goku-sticker-1.png" alt="sticker goku" />
        </div>

        <div className='container-form'>
          {/* <img className='naruto-up-img' src="./naruto-sticker-1.png" alt="sticker naruto" /> */}
          <h2 className="jaro-regular" id='title-form'>¡Bienvenido a <span style={{color:"rgb(255, 170, 42)", margin:"0", padding:"0"}}>GACHANIME</span>!</h2>

          <form className='form-user' onSubmit={submitUser}>
            <div className='input-container'>
              {inputText === "username" ? <span className='span-input-focus'>Nombre de usuario</span> : ""}
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder={inputText === "username" ? "" : "Nombre de usuario"}
                className='jaro-regular'
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className='input-container'>
              {inputText === "password" ? <span className='span-input-focus'>Contraseña</span> : ""}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={inputText === "password" ? "" : "Contraseña"}
                className='jaro-regular'
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <button className='btn-form jaro-regular' type='submit'>Iniciar sesión</button>
            <span className='span-reg'>¿No tienes cuenta? <span className='reg-btn' onClick={registerUser}>Regístrate</span></span>
          </form>
          <div className='container-spacer'>
            <span className='span-spacer'></span>
            <span className='span-text-spacer'>O</span>
            <span className='span-spacer'></span>
          </div>
          <button className='google-btn'>
            <img className='google-img' src="./google-logo.png" alt="google logo" />
            Continuar con Google
          </button>
        </div>

      </div>

    </div>
  )
}

export default App
