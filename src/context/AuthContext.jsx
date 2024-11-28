import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('token') ?? null);

    const login = (value) => {
        localStorage.setItem('token', value.token);
        localStorage.setItem('user', JSON.stringify(value.user));
        setToken(value.token);
        setUser(value.user);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { AuthContext, AuthProvider };
