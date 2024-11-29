import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { SearchContext } from '../context/SearchContext.jsx';
import ToggleButton from './ToggleButton.jsx';

import 'react-toastify/dist/ReactToastify.css';

function Header() {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        console.log('Déconnexion');
        toast.success('Vous avez été déconnecté avec succès !');
    };

    const {searchTerm, setSearchTerm} = useContext(SearchContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm p-3">
            <div className="container-fluid">
                <Link className="navbar-brand text-primary fw-bold" to="/">
                    CV Builder
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Menu principal (aligné à gauche) */}
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Accueil
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cv-visibles">
                                CV Visibles
                            </Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/create-cv">
                                    Creez un CV
                                </Link>
                            </li>
                        )}
                        <li className="nav-item py-2">
                            <ToggleButton />
                        </li>
                    </ul>

                    {/* Barre de recherche */}
                    <div className="search-bar position-relative me-3 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Rechercher des CV..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch
                            className="search-icon position-absolute"
                            style={{ cursor: 'pointer', right: '10px' }} // Style pour rendre la loupe cliquable
                        />
                    </div>

                    {/* Authentification (aligné à droite) */}
                    <ul className="navbar-nav ms-auto">
                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Connexion
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary text-white" to="/register">
                                        Inscription
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="link"
                                    className="text-decoration-none text-dark d-flex align-items-center"
                                >
                                    <FaUserCircle size={30} className="me-2" />
                                    <span>Mon Compte</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end">
                                    <Dropdown.Item as={Link} to="/profile">
                                        Mon Profil
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/my-cvs">
                                        Mes CV
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/edit-password">
                                        Modifier mon mot de passe
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/mes-recommandations">
                                        Mes recommandations
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="#">
                                        Paramètres
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as={Link} to="/" onClick={handleLogout}>
                                        Déconnexion
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
