import {useEffect, useState} from 'react';
import {auth} from '../../firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import classes from './Login.module.css';
import {useNavigate} from 'react-router-dom';
import {FirebaseError} from 'firebase/app';

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

    // state to manage the mode of the login page (sign-up or login)
    const [mode, setMode] = useState<string>('sign-up');

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

    // function to sign up the user...it uses the email and password entered by the user, if the user already exists, it displays an error message
    const signUp = async () => {
        if (email === '' || password === '') {
            setError('Please enter email and password.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password); // Create a new user with the email and password (firebase function)
            setIsLoggedIn(true); // Set isLoggedIn to true after successful sign up
        } catch (error) {
            const firebaseError = error as FirebaseError;
            switch (firebaseError.code) {
                case 'auth/email-already-in-use':
                    setError('Email already in use.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email.');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Operation not allowed.');
                    break;
                case 'auth/weak-password':
                    setError('Weak password. Enter at least 6 characters.');
                    break;
                default:
                    setError('An unknown error occurred.');
            }
        }
    };

    // useEffect to redirect to the main page if the user is logged in
    useEffect(() => {
        if (isLoggedIn) {
            // Set a delay of 1.5 seconds before navigating to the main page
            const timer = setTimeout(() => {
                navigate('/');
            }, 2000);

            // Clear the timer when the component is unmounted
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate]);

    // render the login page with email and password input fields and a sign in button if the mode is login otherwise render the sign up page with email and password input fields and a sign up button
    return (
        <div className={classes.loginPage}>
            <div className={classes.loginModal}>
                {mode === 'login' ? <><h2>Login</h2>
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
                        <p className={classes.changeModeText}>You do not have any account? Sign up!</p>
                        <button onClick={() => {
                            setMode('sign-up')
                            setError('')
                        }
                        }>Sign up
                        </button>
                    </>
                    :
                    <><h2>Sign Up</h2>
                        <input type="email" placeholder="Email"
                               onChange={e => {
                                   setEmail(e.target.value)
                                   setError('')
                               }}
                        />
                        <input type="password" placeholder="Password" onChange={e => {
                            setPassword(e.target.value)
                            setError('')
                        }
                        }/>
                        <button onClick={signUp}>Sign Up</button>
                        {error && <p>{error}</p>}
                        <p className={classes.changeModeText}>Do you already have an account? Login in to the app!</p>
                        <button onClick={() => {
                            setMode('login')
                            setError('')
                        }}>Login
                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default Login;