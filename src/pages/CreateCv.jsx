import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import CvForm from '../components/CvForm.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateCv() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            // Convertir les années en integer
            const preparedValues = {
                ...values,
                diplomes: values.diplomes.map((diplome) => ({
                    ...diplome,
                    year: parseInt(diplome.year, 10) || null,
                })),
                certifications: values.certifications.map((certification) => ({
                    ...certification,
                    year: parseInt(certification.year, 10) || null,
                })),
                formations: values.formations.map((formation) => ({
                    ...formation,
                    year: parseInt(formation.year, 10) || null,
                })),
                jobs: values.jobs.map((job) => ({
                    ...job,
                    startYear: parseInt(job.startYear, 10) || null,
                    endYear: parseInt(job.endYear, 10) || null,
                })),
            };

            console.log('Prepared values:', JSON.stringify(preparedValues, null, 2));

            const response = await fetch('https://cv-project-api.onrender.com/api/cv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(preparedValues),
            });
            console.log('Response:', response);

            if (!response.ok) {
                throw new Error('Failed to create CV');
            }
            toast.success('CV créé avec succès !');
            navigate('/CVs');
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la création du CV.');
        }
    };

    return <CvForm initialValues={{ firstname: '', lastname: '', description: '', diplomes: [], certifications: [], formations: [], jobs: [], missions: [], compagnies: [], visible: true }} onSubmit={handleSubmit} />;
}

export default CreateCv;
