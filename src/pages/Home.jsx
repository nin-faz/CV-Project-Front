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
        <div>
            <h1>Liste des CV</h1>
            <ul>
                {cvs.map((cv) => (
                    <li key={cv._id}>
                        <h2>
                            {cv.firstname} {cv.lastname}
                        </h2>
                        <p>{cv.description}</p>

                        <h3>Diplômes :</h3>
                        <ul>
                            {cv.diplomes.map((diplome) => (
                                <li key={diplome._id}>
                                    {diplome.title} - {diplome.school} ({diplome.year})
                                </li>
                            ))}
                        </ul>

                        <h3>Certifications :</h3>
                        <ul>
                            {cv.certifications.map((certification) => (
                                <li key={certification._id}>
                                    {certification.name} ({certification.year}) - {certification.issuedBy}
                                </li>
                            ))}
                        </ul>

                        <h3>Formations :</h3>
                        <ul>
                            {cv.formations.map((formation) => (
                                <li key={formation._id}>
                                    {formation.name} - {formation.institution} ({formation.year})
                                </li>
                            ))}
                        </ul>

                        <h3>Expériences professionnelles :</h3>
                        <ul>
                            {cv.jobs.map((job) => (
                                <li key={job._id}>
                                    {job.title} ({job.startYear} - {job.endYear})
                                </li>
                            ))}
                        </ul>

                        <h3>Missions :</h3>
                        <ul>
                            {cv.missions.map((mission) => (
                                <li key={mission._id}>
                                    {mission.name}: {mission.description}
                                </li>
                            ))}
                        </ul>

                        <h3>Compagnies :</h3>
                        <ul>
                            {cv.compagnies.map((company) => (
                                <li key={company._id}>
                                    {company.name} - {company.location} ({company.industry})
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
