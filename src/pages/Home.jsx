import React, { useState, useEffect } from 'react';

function Home() {
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://cv-project-api.onrender.com/api/cv');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Data:', data);
                setCvs(data);
            } catch (error) {
                console.error('Failed to fetch CVs:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container my-4">
            <h1 className="mb-4 text-center">Liste des CV</h1>
            <div className="row g-4">
                {cvs.map((cv) => (
                    <div className="col-12 col-sm-6 col-md-4" key={cv._id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {cv.firstname} {cv.lastname}
                                </h5>
                                <p className="card-text">{cv.description}</p>
                                <a href={`/cv/${cv._id}`} className="btn btn-primary">
                                    Voir plus
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
