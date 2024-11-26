import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
    // const [searchTerm, setSearchTerm] = useState('');

    // const handleSearch = () => {
    //     console.log(`Rechercher : ${searchTerm}`);
    //     // Ajoute ici la logique pour exécuter la recherche, par exemple, une API call.
    // };

    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        toast.success('Vous avez été déconnecté avec succès !');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm p-3">
            <div className="container-fluid">
                {/* Logo ou Titre */}
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
                                <Link className="nav-link" to="/cv-visibles">
                                    Creez un CV
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Barre de recherche */}
                    <div className="search-bar position-relative">
                        <input type="text" className="form-control search-input" placeholder="Rechercher des CV..." />
                        <FaSearch className="search-icon position-absolute" onClick={'handleSearch'} />
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
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="link"
                                        className="text-decoration-none text-dark d-flex align-items-center"
                                    >
                                        <FaUserCircle size={30} className="me-2" />
                                        <span>Mon Compte</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end">
                                        <Dropdown.Item as={Link} to="/profil">
                                            Mon Profil
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/mes-recommandations">
                                            Mes recommandations
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/parametres">
                                            Paramètres
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as={Link} to="/" onClick={handleLogout} >
                                            Déconnexion
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
