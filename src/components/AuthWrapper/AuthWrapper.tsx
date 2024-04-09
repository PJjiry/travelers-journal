import React, {ReactNode, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {Navigate} from 'react-router-dom';

// Get the auth object from firebase
const auth = getAuth();

// AuthWrapper component the wraps the entire app and checks if the user is logged in
const AuthWrapper: React.FC<{ children: ReactNode }> = ({children}) => {
    // State to hold the user object
    const [user, setUser] = useState<User | null>(null);
    // State to hold loading status
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to the auth state change event provided by firebase
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Set the user state to the user object if user is logged in
            setLoading(false); // Set loading to false after user state is determined
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // If loading is true, display a loading message
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    // If user is logged in, display the children components, which are the other routes of the App
    return user ? <>{children}</> : <Navigate to="/login" replace/>;
};

export default AuthWrapper;