import {useEffect, useState} from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import classes from './Login.module.css';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth,email, password);
            setIsLoggedIn(true); // Set isLoggedIn to true after successful login
        } catch (error) {
            setError('User does not exist or the password is incorrect.');
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/'); // Redirect to main page if isLoggedIn is true
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className={classes.background}>
            <div className={classes.loginPage}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={e => {
                setEmail(e.target.value)
                setError('')
            }}
            />
            <input type="password" placeholder="Password" onChange={e => {
                setPassword(e.target.value)
                setError('')
            }} />
            <button onClick={signIn}>Sign In</button>
            {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default Login;