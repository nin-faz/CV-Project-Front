import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="text-center">
                <h1>Bienvenue, {user?.firstname || 'Invité'} !</h1>
                <p>Créez et gérez vos CV en quelques clics. Vous pouvez aussi consulter les CV publics disponibles.</p>
            </div>
        </div>
    );
}

export default Home;
