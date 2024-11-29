import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import Recommendations from '../components/Recommendations';

function CvDetails() {
    const { id } = useParams();
    const [cv, setCv] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [recommendationDescription, setRecommendationDescription] = useState('');
    const [showRecommendationInput, setShowRecommendationInput] = useState(false);
    const { token, user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://cv-project-api.onrender.com/api/cv/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCv(data.cv);
                console.log('CV details:', data);

                await fetchRecommendations();
                console.log('Recommendations:', data.cv.recommendations);
            } catch (error) {
                console.error('Failed to fetch CV details:', error);
            }
        };

        fetchData();
    }, [id]);

    const fetchRecommendations = async () => {
        try {
            const response = await fetch(`https://cv-project-api.onrender.com/api/recommendation/cv/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const data = await response.json();
            setRecommendations(data || []);
        } catch (error) {
            console.error('Erreur lors de la récupération des recommandations :', error);
        }
    };

    const handleAddRecommendation = async () => {
        try {
            if (!recommendationDescription.trim()) {
                toast.error('Veuillez entrer une recommandation.');
                return;
            }

            const response = await fetch(`https://cv-project-api.onrender.com/api/recommendation/cv/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    description: recommendationDescription,
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l’ajout de la recommandation.');
            }

            console.log('Recommendation ajouté:');
            toast.success('Recommandation ajoutée avec succès.');

            setRecommendationDescription(``);
            setShowRecommendationInput(false);

            fetchRecommendations();
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de l’ajout de la recommandation.');
        }
    };

    const isOwnCv = cv.userid === user.id;

    if (!cv) {
        return <div className="text-center my-5">Chargement...</div>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                {/* Colonne gauche : Détails du CV */}
                <div className="col-lg-8">
                    <div className="card shadow-lg p-4 mb-4">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="card shadow-sm border-0">
                                    <div className="card-body">
                                        <h1 className="card-title text-primary fw-bold">
                                            CV de {cv.firstname} {cv.lastname}
                                        </h1>
                                        <p className="card-text text-muted">
                                            <span style={{ fontWeight: '700', fontSize: '20px' }}>Profil :</span>{' '}
                                            {cv.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {[
                                {
                                    title: 'Diplômes',
                                    items: cv.diplomes,
                                    render: (item) => `${item.title} - ${item.school} (${item.year})`
                                },
                                {
                                    title: 'Certifications',
                                    items: cv.certifications,
                                    render: (item) => `${item.name} (${item.year}) - ${item.issuedBy}`
                                },
                                {
                                    title: 'Formations',
                                    items: cv.formations,
                                    render: (item) => `${item.name} - ${item.institution} (${item.year})`
                                },
                                {
                                    title: 'Expériences professionnelles',
                                    items: cv.jobs,
                                    render: (item) => `${item.title} (${item.startYear} - ${item.endYear})`
                                },
                                {
                                    title: 'Missions',
                                    items: cv.missions,
                                    render: (item) => `${item.name}: ${item.description}`
                                },
                                {
                                    title: 'Compagnies',
                                    items: cv.compagnies,
                                    render: (item) => `${item.name} - ${item.location} (${item.industry})`
                                }
                            ].map(
                                (section, index) =>
                                    section.items &&
                                    section.items.length > 0 && (
                                        <div className="col-12" key={index}>
                                            <div className="card shadow-sm border-0">
                                                <div className="card-body">
                                                    <h3 className="card-title text-primary">{section.title}</h3>
                                                    <ul className="list-group list-group-flush">
                                                        {section.items.map((item, idx) => (
                                                            <li key={idx} className="list-group-item">
                                                                {section.render(item)}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </div>

                {/* Colonne droite : Recommandations */}
                <div className="col-lg-4">
                    <div className="card shadow-lg p-4" style={{ width: '110%'}}>
                        <div className="card-body">
                            <h3 className="card-title text-primary">Recommandations</h3>
                            <Recommendations recommendations={recommendations || []} />

                            {/* Ajouter une recommandation si ce n'est pas notre CV */}
                            {!isOwnCv && (
                                <>
                                    {!showRecommendationInput ? (
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={() => setShowRecommendationInput(true)}
                                        >
                                            Ajouter une recommandation
                                        </button>
                                    ) : (
                                        <>
                                            <textarea
                                                className="form-control mb-2"
                                                placeholder="Ajoutez une recommandation"
                                                value={recommendationDescription}
                                                onChange={(e) => setRecommendationDescription(e.target.value)}
                                            />
                                            <button
                                                className="btn btn-success w-100 mb-2"
                                                onClick={handleAddRecommendation}
                                            >
                                                Valider la recommandation
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary w-100"
                                                onClick={() => setShowRecommendationInput(false)}
                                            >
                                                Annuler
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CvDetails;
