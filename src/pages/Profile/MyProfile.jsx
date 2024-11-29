import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function MyProfile() {
    const { token, user, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    const navigate = useNavigate();

    // Charger les données du profil utilisateur
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('https://cv-project-api.onrender.com/api/user/me', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du profil');
                }

                const data = await response.json();
                setProfile(data); // Mettre à jour le profil avec les données reçues
                console.log('Profil récupéré:', data);
            } catch (error) {
                console.error(error);
                toast.error('Impossible de charger vos informations.');
            }
        };

        fetchProfile();
    }, [token]);

    const handleSubmit = async (values) => {
        try {
            const isEmailChanged = values.email !== user.email;

            const response = await fetch('https://cv-project-api.onrender.com/api/user/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du profil');
            }

            if (isEmailChanged) {
                toast.dismiss();
                logout();
                console.log('Profil mis à jour avec succès ! Redirection au Login');
                toast.success('Profil mis à jour avec succès. Veuillez vous reconnecter.');
                navigate('/login');
            } else {
                console.log('Profil mis à jour avec succès !');
                toast.success('Profil mis à jour avec succès.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la mise à jour du profil.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="card shadow-lg p-4" style={{ maxWidth: '700px', width: '100%' }}>
                <Formik
                    initialValues={{
                        firstname: profile.firstname || '',
                        lastname: profile.lastname || '',
                        email: profile.email || ''
                    }}
                    enableReinitialize={true} // Permet de réinitialiser Formik lorsque profile change
                    validationSchema={Yup.object({
                        firstname: Yup.string()
                            .max(15, 'Doit contenir 15 caractères ou moins')
                            .required('Prénom requis'),
                        lastname: Yup.string().max(20, 'Doit contenir 20 caractères ou moins').required('Nom requis'),
                        email: Yup.string().email('Email invalide').required('Email requis')
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Prénom */}
                            <div className="form-group mb-4">
                                <label htmlFor="firstname">Prénom:</label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="firstname"
                                    placeholder="Entrez votre prénom"
                                />
                                <ErrorMessage name="firstname" component="div" style={{ color: 'red' }} />
                            </div>

                            {/* Nom */}
                            <div className="form-group mb-4">
                                <label htmlFor="lastname">Nom:</label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="lastname"
                                    placeholder="Entrez votre nom"
                                />
                                <ErrorMessage name="lastname" component="div" style={{ color: 'red' }} />
                            </div>

                            {/* Email */}
                            <div className="form-group mb-4">
                                <label htmlFor="email">Email:</label>
                                <Field
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="Entrez votre email"
                                />
                                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                            </div>

                            <button className="btn btn-primary mt-4" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default MyProfile;
