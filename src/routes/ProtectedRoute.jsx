import React, { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            toast.warn('Vous devez être connecté pour accéder à cette page.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, []);

    return user ? children : <Navigate to="/login" />;
};


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
