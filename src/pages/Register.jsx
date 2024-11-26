import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

function Register() {
    const navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center text-primary mb-4">Inscription</h2>

                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={Yup.object({
                        firstname: Yup.string()
                            .max(15, 'Le prénom doit contenir 15 caractères ou moins')
                            .required('Le prénom est obligatoire'),
                        lastname: Yup.string()
                            .max(15, 'Le nom doit contenir 15 caractères ou moins')
                            .required('Le nom est obligatoire'),
                        email: Yup.string()
                            .email('Adresse email invalide')
                            .required('L\'email est obligatoire'),
                        password: Yup.string()
                            .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
                            .required('Le mot de passe est obligatoire'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
                            .required('La confirmation du mot de passe est obligatoire'),
                    })}
                    onSubmit={async (values) => {
                        try {
                            const response = await fetch(
                                'https://cv-project-api.onrender.com/api/auth/register',
                                {
                                    method: 'POST',
                                    body: JSON.stringify(values),
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                }
                            );
                            const data = await response.json();
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status} ${data.error}`);
                            }
                            toast.success('Compte créé avec succès !');
                            navigate('/login');
                        } catch (error) {
                            console.error('Échec de l\'inscription :', error);
                            toast.error('Échec de l\'inscription. Vérifiez vos informations.');
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="firstname" className="form-label text-start d-block">
                                    Prénom
                                </label>
                                <Field
                                    name="firstname"
                                    type="text"
                                    className="form-control"
                                    placeholder="Entrez votre prénom"
                                />
                                <ErrorMessage
                                    name="firstname"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="lastname" className="form-label text-start d-block">
                                    Nom de famille
                                </label>
                                <Field
                                    name="lastname"
                                    type="text"
                                    className="form-control"
                                    placeholder="Entrez votre nom"
                                />
                                <ErrorMessage
                                    name="lastname"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-start d-block">
                                    Adresse Email
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Entrez votre email"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-start d-block">
                                    Mot de passe
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Entrez votre mot de passe"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="form-label text-start d-block">
                                    Confirmer le mot de passe
                                </label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirmez votre mot de passe"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Inscription...' : 'S\'inscrire'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="mt-3 text-center">
                    <p className="mb-0">
                        Vous avez déjà un compte ?{' '}
                        <a href="/login" className="text-primary fw-bold">
                            Connectez-vous
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
