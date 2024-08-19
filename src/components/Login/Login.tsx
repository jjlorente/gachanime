import React, { useState, useRef } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './GoogleLogin/GoogleLogin';
import { findUser } from '../../services/user';

export const Login: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputText, setInputText] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showErrorLogin, setShowErrorLogin] = useState<string>("");

    const submitUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const googleAccount = false;

        try {
            const data = await findUser(username, password, googleAccount);
            if ('_id' in data) {
                localStorage.setItem("_id", data._id);
                localStorage.setItem("googleAccount", String(data.googleAccount));
                navigate('/home');
            }
        } catch (error: any) {
            handleLoginError(error);
        }
    };

    const handleLoginError = (error: any) => {
        switch (error.message) {
            case "Usuario no encontrado":
                setShowErrorLogin("Nombre de usuario incorrecto");
                setUsername("");
                setPassword("");
                document.getElementById("username")?.focus();
                break;
            case "Credenciales inválidas":
                setShowErrorLogin("Contraseña incorrecta");
                setPassword("");
                document.getElementById("password")?.focus();
                break;
            default:
                setShowErrorLogin(`Error during user find: ${error.message}`);
        }
    };

    const registerUser = () => navigate('/auth/register');

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => setInputText(event.target.id);

    const handleBlur = () => setInputText("");

    const handlePasswordToggle = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
        setShowPassword(!showPassword);
        focusPasswordInput();
    };

    const focusPasswordInput = () => {
        setTimeout(() => {
            if (passwordRef.current) {
                const length = passwordRef.current.value.length;
                passwordRef.current.focus();
                passwordRef.current.setSelectionRange(length, length);
            }
        }, 0);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[a-zA-Z0-9]*$/.test(value)) {
            setUsername(value);
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[a-zA-Z0-9]*$/.test(value)) {
            setPassword(value);
        }
    };

    return (
        <>
            <form className='form-user' onSubmit={submitUser}>
                <div className='input-container'>
                    {inputText === "username" && <span className='span-input-focus'>Nombre de usuario</span>}
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
                    {inputText === "password" && <span className='span-input-focus'>Contraseña</span>}
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
                    <img
                        className='btn-toggle-password'
                        onClick={handlePasswordToggle}
                        src={showPassword ? "../eye-2.png" : "../eye-1.png"}
                        alt=""
                    />
                </div>
                {showErrorLogin && <span className='span-error-login'>{showErrorLogin}</span>}
                <button className='btn-form jaro-regular' type='submit'>Iniciar sesión</button>
                <span className='span-reg'>¿No tienes cuenta? <span className='reg-btn' onClick={registerUser}>Regístrate</span></span>
            </form>
            <div className='container-spacer'>
                <span className='span-spacer'></span>
                <span className='span-text-spacer'>O</span>
                <span className='span-spacer'></span>
            </div>
            <GoogleLogin />
        </>
    );
};
