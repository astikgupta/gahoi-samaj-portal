import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkValidSession = async () => {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                try {
                    const parsedUser = JSON.parse(userInfo);
                    // Fetch latest to get updated age and approval status
                    const { data } = await axios.get('http://localhost:5000/api/auth/me', {
                        headers: { Authorization: `Bearer ${parsedUser.token}` }
                    });
                    const updatedUser = { ...parsedUser, ...data };
                    setUser(updatedUser);
                    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
                } catch (err) {
                    console.error('Session expired or invalid', err);
                    localStorage.removeItem('userInfo');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkValidSession();
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    };

    const register = async (userData) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/register', userData);
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
