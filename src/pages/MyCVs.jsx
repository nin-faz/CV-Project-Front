import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function MyCVs() {
    const { token, user } = useContext(AuthContext);
    const [cvs, setCvs] = useState([]);

    console.log("user", user);

    useEffect(() => {
        const fetchCVs = async () => {
            try {
                const response = await fetch(`https://cv-project-api.onrender.com/api/cv/me/${user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur HTTP : ' + response.status);
                }

                const data = await response.json();
                setCvs(data);
            } catch (error) {
                console.error(error);
                toast.error('Erreur lors de la récupération des CVs.');
            }
        };

        fetchCVs();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://cv-project-api.onrender.com/api/cv/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Échec de la suppression du CV');
            }

            setCvs((prevCvs) => prevCvs.filter((cv) => cv._id !== id));
            toast.success('CV supprimé avec succès.');
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la suppression du CV.');
        }
    };

    return (
        <div className="container my-5">
            <h1>Mes CVs</h1>
            {cvs.length === 0 ? (
                <p>Aucun CV disponible.</p>
            ) : (
                <div className="row">
                    {cvs.map((cv) => (
                        <div className="col-md-6 col-lg-4" key={cv._id}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h4 className="card-title">{cv.firstname} {cv.lastname}</h4>
                                    <p className="card-text">{cv.description}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/edit-cv/${cv._id}`} className="btn btn-outline-primary">
                                            Modifier
                                        </Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(cv._id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyCVs;
