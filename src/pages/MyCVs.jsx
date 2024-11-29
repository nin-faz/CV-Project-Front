import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import LoadingScreen from '../components/LoadingScreen.jsx';

function MyCVs() {
    const { token, user } = useContext(AuthContext);
    const [cvs, setCvs] = useState([]);
    const [recommendations, setRecommendations] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCVs = async () => {
            try {
                setIsLoading(true);

                // Récupérer tous les CVs avec leurs recommandations
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

                // Charger les recommandations pour chaque CV
                const updatedCVs = await Promise.all(
                    data.map(async (cv) => {
                        const recResponse = await fetch(
                            `https://cv-project-api.onrender.com/api/recommendation/cv/${cv._id}`,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );

                        if (!recResponse.ok) {
                            throw new Error('Erreur lors de la récupération des recommandations.');
                        }

                        const recData = await recResponse.json();
                        return { ...cv, recommendations: recData };
                    })
                );

                setCvs(updatedCVs);
            } catch (error) {
                console.error(error);
                toast.error('Erreur lors de la récupération des CVs.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCVs();
    }, [token, user]);

    const handleDeleteCV = async (id) => {
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteRecommendation = async (cvId, recId) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette recommandation ?');
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await fetch(`https://cv-project-api.onrender.com/api/recommendation/${recId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Échec de la suppression de la recommandation');
            }

            setRecommendations((prev) => ({
                ...prev,
                [cvId]: prev[cvId].filter((rec) => rec._id !== recId)
            }));
            console.log('Recommandation supprimée avec succès.');
            toast.success('Recommandation supprimée avec succès.');
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la suppression de la recommandation.');
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

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
                                        <button className="btn btn-danger" onClick={() => handleDeleteCV(cv._id)}>
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Recommandations */}
                            {cv.recommendations.length > 0 && (
                                <div className="mb-3">
                                    <h5>Recommandations:</h5>
                                    <ul className="list-group">
                                    {cv.recommendations.map((rec, index) => (
                                            <li
                                                key={index}
                                                className="list-group-item d-flex flex-column align-items-start"
                                            >
                                                <div className="row mb-1">
                                                    <div className="col text-start" style={{ width: '250px' }}>
                                                        <p className="mb-0 text-muted">
                                                            <strong>Le :</strong>{' '}
                                                            {format(new Date(rec.createdAt), 'dd/MM/yy à HH:mm', {
                                                                locale: fr
                                                            })}
                                                        </p>
                                                    </div>

                                                    <div className="col text-end">
                                                        {rec.userid && (
                                                            <p className="mb-0 text-muted">
                                                                <strong>Par :</strong> {rec.userid.firstname}{' '}
                                                                {rec.userid.lastname}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <span className="mt-2">{rec.description}</span>
                                                <button
                                                    className="btn btn-danger btn-sm align-self-end"
                                                    onClick={() => handleDeleteRecommendation(cv._id, rec._id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyCVs;
