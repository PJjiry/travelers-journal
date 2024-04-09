import React, {ReactNode, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {Navigate} from 'react-router-dom';

const AuthWrapper: React.FC<{children:ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false); // Set loading to false after user state is determined
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    if (loading) {
        return <div className="loading">Loading...</div>; // Or your own custom loading component
    }

    return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AuthWrapper;