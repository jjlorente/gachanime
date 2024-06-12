import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './GoogleLogin.css';
import { findGoogleUser } from '../../../services/user';

const Login = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = async (credentialResponse: any) => {
        console.log("Login Success: ", credentialResponse);
        let googleAccount = true;
        const token = credentialResponse.credential;
        const decoded: any = jwtDecode(token);
        console.log("Decoded JWT: ", decoded);
        let email = decoded.email;
        let username = decoded.name;
        try {
            const data = await findGoogleUser(username, email, googleAccount);
            if(data._id) {
              localStorage.setItem("_id", data._id)
              localStorage.setItem("googleAccount", data.googleAccount)
              navigate('/home');
            }
          } catch (error) {
            console.error('Error during Google user find:', error);
          }
    };
    
    const handleLoginError = () => {
        console.error("Login Failed");
    };

    return (
        <>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
                useOneTap
                text="continue_with"
                width="520px"
                size="medium"
                logo_alignment='center'
            />
        </>
    );
};

export default Login;

