import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('https://cv-project-api.onrender.com/api/user/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: values.newPassword
                })
            });

            if (response.status === 403) {
                throw new Error("Mot de passe identique à l'ancien, veuillez le changer.");
            } else if (response.status === 400) {
                throw new Error('Le mot de passe doit contenir au moins une majuscule et un chiffre.');
            } else if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du mot de passe');
            }

            // Déconnexion après mise à jour du mot de passe
            logout();
            console.log('Mot de passe mis à jour avec succès');
            toast.success('Mot de passe mis à jour avec succès. Veuillez vous reconnecter.');
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">Changer de mot de passe</h2>
                <Formik
                    initialValues={{
                        newPassword: '',
                        confirmPassword: ''
                    }}
                    validationSchema={Yup.object({
                        newPassword: Yup.string()
                            .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
                            .required('Nouveau mot de passe requis'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('newPassword'), null], 'Les mots de passe doivent correspondre')
                            .required('La confirmation du mot de passe est obligatoire')
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Nouveau mot de passe */}
                            <div className="form-group mb-4">
                                <label htmlFor="newPassword">Nouveau mot de passe :</label>
                                <Field
                                    className="form-control"
                                    type="password"
                                    name="newPassword"
                                    placeholder="Entrez votre nouveau mot de passe"
                                />
                                <ErrorMessage name="newPassword" component="div" style={{ color: 'red' }} />
                            </div>

                            {/* Confirmation du mot de passe */}
                            <div className="form-group mb-4">
                                <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
                                <Field
                                    className="form-control"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirmez votre mot de passe"
                                />
                                <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
                            </div>

                            <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Mise à jour...' : 'Changer le mot de passe'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ChangePassword;
