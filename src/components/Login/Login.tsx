import React from 'react'
import { useState, useRef } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [inputText, setInputText] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const [showErrorLogin, setShowErrorLogin] = useState<string>("");

    function submitUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        fetch('http://localhost:3000/api/users/find', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if(data._id) {
                localStorage.setItem("_id", data._id)
                navigate('/home');
            } else {
                if(data.error === "Usuario no encontrado") {
                    setShowErrorLogin("Nombre de usuario incorrecto")
                    setUsername("")
                    setPassword("")
                    document.getElementById("username")?.focus()
                } else if(data.error === "Credenciales inválidas") {
                    setShowErrorLogin("Contraseña incorrecta")
                    setPassword("")
                    document.getElementById("password")?.focus()
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function registerUser() {
        navigate('register');
    }

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
        setInputText(event.target.id)
    }

    function handleBlur() {
        setInputText("event.target.id")
    }

    const handlePasswordToggle = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
        setShowPassword(!showPassword);
        setTimeout(() => {
        if (passwordRef.current) {
            const length = passwordRef.current.value.length;
            passwordRef.current.focus();
            passwordRef.current.setSelectionRange(length, length);
        }
        }, 0);
    };

    const handleUsernameChange = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const regex = /^[a-zA-Z0-9]*$/;
        if (regex.test(value)) {
            setUsername(value);
        }
    };

    const handlePasswordChange = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const regex = /^[a-zA-Z0-9]*$/;
        if (regex.test(value)) {
            setPassword(value);
        }
    };

    return (
        <>
            <form className='form-user' onSubmit={submitUser}>
                <div className='input-container'>
                {inputText === "username" ? <span className='span-input-focus'>Nombre de usuario</span> : ""}
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    placeholder={inputText === "username" ? "" : "Nombre de usuario"}
                    className='jaro-regular'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    maxLength={15}
                />
                </div>
                <div className='input-container'>
                {inputText === "password" ? <span className='span-input-focus'>Contraseña</span> : ""}
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    ref={passwordRef}
                    onChange={handlePasswordChange}
                    required
                    placeholder={inputText === "password" ? "" : "Contraseña"}
                    className='jaro-regular'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    maxLength={15}
                />
                <img className='btn-toggle-password' onClick={handlePasswordToggle} src={showPassword ? "./eye-2.png" : "./eye-1.png"} alt=""/>
                </div>
                {showErrorLogin ? 
                    <span className='span-error-login'>{showErrorLogin}</span> : <></>
                }
                <button className='btn-form jaro-regular' type='submit'>Iniciar sesión</button>
                <span className='span-reg'>¿No tienes cuenta? <span className='reg-btn' onClick={registerUser}>Regístrate</span></span>
            </form>
            <div className='container-spacer'>
                <span className='span-spacer'></span>
                <span className='span-text-spacer'>O</span>
                <span className='span-spacer'></span>
            </div>
            <button className='google-btn jaro-regular'>
                <img className='google-img' src="../google-logo.png" alt="google logo" />
                Continuar con Google
            </button>
        </>
    )
}
