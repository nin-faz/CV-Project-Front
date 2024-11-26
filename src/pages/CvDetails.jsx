import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function CvDetails() {
    const { id } = useParams();
    const [cv, setCv] = useState({});
    const { token } = useContext(AuthContext);

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
            } catch (error) {
                console.error('Failed to fetch CV details:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!cv) {
        return <div className="text-center my-5">Chargement...</div>;
    }

    return (
        <div className="container d-flex justify-content-center align-items-center ">
            <div className="card shadow-lg p-4" style={{ maxWidth: '700px', width: '100%' }}>
                <div className="row g-4">
                    {/* Informations principales */}
                    <div className="col-12">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h1 className="card-title text-primary fw-bold">
                                    CV de {cv.firstname} {cv.lastname}
                                </h1>
                                <p className="card-text text-muted">
                                    {' '}
                                    <span style={{ fontWeight: '700', fontSize: '20px' }}> Profil : </span>{' '}
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
    );
}

export default CvDetails;
