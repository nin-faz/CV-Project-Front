import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '85vh' }}>
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center text-primary mb-4">Connexion</h2>

                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Adresse email invalide').required("L'email est obligatoire"),
                        password: Yup.string()
                            .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
                            .required('Le mot de passe est obligatoire')
                    })}
                    onSubmit={async (values) => {
                        try {
                            const response = await fetch('https://cv-project-api.onrender.com/api/auth/login', {
                                method: 'POST',
                                body: JSON.stringify(values),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });

                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }

                            const { user } = await response.json();
                            const { firstname, lastname, email, token } = user;

                            login({
                                user: {
                                    firstname,
                                    lastname,
                                    email
                                },
                                token
                            });

                            toast.success('Vous êtes connectés !');
                            navigate('/');
                        } catch (error) {
                            console.error('Échec de la connexion :', error);
                            toast.error('Échec de la connexion. Vérifiez vos informations.');
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-start d-block">
                                    Adresse Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Entrez votre email"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-start d-block">
                                    Mot de passe
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Entrez votre mot de passe"
                                />
                                <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                                {isSubmitting ? 'Connexion...' : 'Se connecter'}
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Lien vers l'inscription */}
                <div className="mt-3 text-center">
                    <p className="mb-0">
                        Pas encore de compte ?{' '}
                        <a href="/register" className="text-primary fw-bold">
                            Inscrivez-vous
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
