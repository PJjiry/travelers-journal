import {useEffect, useState} from 'react';
import {auth} from '../../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import classes from './Login.module.css';
import {useNavigate} from 'react-router-dom';

// Component for the login page...the first page the user sees when they visit the app
const Login = () => {

    // state to manage the email entered by the user
    const [email, setEmail] = useState<string>('');

    // state to manage the password entered by the user
    const [password, setPassword] = useState<string>('');

    // state to manage the error message if user enters invalid data
    const [error, setError] = useState<string>('');

    // state to manage the logged in status
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // using the navigate hook to redirect to the main page
    const navigate = useNavigate();

    // function to sign in the user...it uses the email and password entered by the user, if the user does not exist or the password is incorrect, it displays an error message
    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password); // Sign in the user with the email and password (firebase function)
            setIsLoggedIn(true); // Set isLoggedIn to true after successful login
        } catch (error) {
            setError('User does not exist or the password is incorrect.');
        }
    };

    // useEffect to redirect to the main page if the user is logged in
    useEffect(() => {
        if (isLoggedIn) {
            // Set a delay of 1.5 seconds before navigating to the main page
            const timer = setTimeout(() => {
                navigate('/');
            }, 1500);

            // Clear the timer when the component is unmounted
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate]);

    // render the login page with email and password input fields and a sign in button
    return (
        <div className={classes.loginPage}>
            <div className={classes.loginModal}>
                <h2>Login</h2>
                <input type="email" placeholder="Email"
                       onChange={e => {
                           setEmail(e.target.value)
                           setError('')
                       }}
                />
                <input type="password" placeholder="Password" onChange={e => {
                    setPassword(e.target.value)
                    setError('')
                }}/>
                <button onClick={signIn}>Sign In</button>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default Login;