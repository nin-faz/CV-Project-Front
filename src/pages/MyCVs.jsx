import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function MyCVs() {
    const { token, user } = useContext(AuthContext);
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        const fetchCVs = async () => {
            try {
                const response = await fetch(`https://cv-project-api.onrender.com/api/cv/me/${user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
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
    }, [token, user]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce CV ?');
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await fetch(`https://cv-project-api.onrender.com/api/cv/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Échec de la suppression du CV');
            }

            setCvs((prevCvs) => prevCvs.filter((cv) => cv._id !== id));
            console.log('CV supprimé avec succès.');
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
                            <div className="card shadow-sm mb-4">
                                <div className="card-body">
                                    <h4 className="card-title">
                                        {cv.firstname} {cv.lastname}
                                    </h4>
                                    <p className="card-text">{cv.description}</p>

                                    {/* Diplômes */}
                                    {cv.diplomes.length > 0 && (
                                        <div className="mb-3">
                                            <h5>Diplômes:</h5>
                                            <ul className="list-group">
                                                {cv.diplomes.map((diplome, index) => (
                                                    <li key={index} className="list-group-item">
                                                        {diplome.title} - {diplome.school} ({diplome.year})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Certifications */}
                                    {cv.certifications.length > 0 && (
                                        <div className="mb-3">
                                            <h5>Certifications:</h5>
                                            <ul className="list-group">
                                                {cv.certifications.map((certification, index) => (
                                                    <li key={index} className="list-group-item">
                                                        {certification.name} ({certification.year}) -{' '}
                                                        {certification.issuedBy}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Formations */}
                                    {cv.formations.length > 0 && (
                                        <div className="mb-3">
                                            <h5>Formations:</h5>
                                            <ul className="list-group">
                                                {cv.formations.map((formation, index) => (
                                                    <li key={index} className="list-group-item">
                                                        {formation.name} - {formation.institution} ({formation.year})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Expériences professionnelles */}
                                    {cv.jobs.length > 0 && (
                                        <div className="mb-3">
                                            <h5>Expériences professionnelles:</h5>
                                            <ul className="list-group">
                                                {cv.jobs.map((job, index) => (
                                                    <li key={index} className="list-group-item">
                                                        {job.title} ({job.startYear} - {job.endYear})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Missions */}
                                    {cv.missions.length > 0 && (
                                        <div className="mb-3">
                                            <h5>Missions:</h5>
                                            <ul className="list-group">
                                                {cv.missions.map((mission, index) => (
                                                    <li key={index} className="list-group-item">
                                                        {mission.name}: {mission.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Compagnies */}
                                    {cv.compagnies.length > 0 && (
                                        <div className="mb-3">
                                            <h5>Compagnies:</h5>
                                            <ul className="list-group">
                                                {cv.compagnies.map((company, index) => (
                                                    <li key={index} className="list-group-item">
                                                        {company.name} - {company.location} ({company.industry})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Boutons */}
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/edit-cv/${cv._id}`} className="btn btn-outline-primary">
                                            Modifier
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(cv._id)}>
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
