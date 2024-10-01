import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './GoogleLogin.css';
import { findGoogleUser } from '../../../services/user';
import { findGacha, registerGacha } from '../../../services/gacha';
import { registerUserCard } from '../../../services/userCards';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const navigate = useNavigate();
    const [widthGoogle, setWidthGoogle] = useState("500px");
    const {i18n} = useTranslation();
    const handleLoginSuccess = async (credentialResponse: any) => {
        const googleAccount = true;
        const token = credentialResponse.credential;
        const decoded: any = jwtDecode(token);

        const email = decoded.email;
        const username = decoded.name;

        try {
            const data = await findGoogleUser(username, email, googleAccount);
            if (data._id) {
                try {
                    await findGacha(data._id);
                } catch (gachaError) {
                    await registerGacha(data._id, 100);
                    await registerUserCard(data._id);
                }
                localStorage.setItem("_id", data._id);
                localStorage.setItem("googleAccount", data.googleAccount);
                navigate('/home');
            }
        } catch (error) {
            console.error('Error during Google user find:', error);
        }
    };

    const handleLoginError = () => {
        console.error("Login Failed");
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 400) {
                setWidthGoogle("100px");
            } else if (window.innerWidth < 740) {
                setWidthGoogle("260px");
            } else {
                setWidthGoogle("500px");
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            useOneTap
            text="signin"
            width={widthGoogle}
            size="medium"
            logo_alignment='center'
            locale={i18n.language}
        />
    );
};

export default Login;
