import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import CvForm from '../../components/CvForm.jsx';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

function EditCv() {
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [cv, setCv] = useState(null);

    useEffect(() => {
        const fetchCv = async () => {
            try {
                const response = await fetch(`https://cv-project-api.onrender.com/api/cv/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch CV');
                }
                const data = await response.json();
                setCv(data.cv);
            } catch (error) {
                console.error(error);
                toast.error('Erreur lors de la récupération du CV.');
            }
        };

        fetchCv();
    }, [id, token]);

    const handleSubmit = async (values) => {
        try {
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

            const response = await fetch(`https://cv-project-api.onrender.com/api/cv/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(preparedValues),
            });
            if (!response.ok) {
                throw new Error('Failed to update CV');
            }
            console.log('CV mise à jour :', response);
            toast.success('CV mis à jour avec succès !');
            navigate('/my-cvs');
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la mise à jour du CV.');
        }
    };

    if (!cv) return <p>Chargement...</p>;

    return <CvForm initialValues={cv} onSubmit={handleSubmit} isEditing />;
}

export default EditCv;
