import React from 'react';
import { Field, Form, FieldArray, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

CvForm.propTypes = {
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired
};

function CvForm({ initialValues, onSubmit, isEditing }) {
    const validationSchema = Yup.object({
        firstname: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        lastname: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        description: Yup.string().max(200, 'Must be 200 characters or less').required('Required'),
        diplomes: Yup.array().of(
            Yup.object({
                title: Yup.string().required('Required'),
                school: Yup.string().required('Required'),
                year: Yup.number().required('Required').typeError('Must be a valid year')
            })
        ),
        certifications: Yup.array().of(
            Yup.object({
                name: Yup.string().required('Required'),
                issuedBy: Yup.string().required('Required'),
                year: Yup.number().required('Required').typeError('Must be a valid year')
            })
        ),
        formations: Yup.array().of(
            Yup.object({
                name: Yup.string().required('Required'),
                institution: Yup.string().required('Required'),
                year: Yup.number().required('Required').typeError('Must be a valid year')
            })
        ),
        jobs: Yup.array().of(
            Yup.object({
                title: Yup.string().required('Required'),
                startYear: Yup.number().required('Required').typeError('Must be a valid year'),
                endYear: Yup.number().required('Required').typeError('Must be a valid year')
            })
        ),
        missions: Yup.array().of(
            Yup.object({
                name: Yup.string().required('Required'),
                description: Yup.string().required('Required')
            })
        ),
        compagnies: Yup.array().of(
            Yup.object({
                name: Yup.string().required('Required'),
                location: Yup.string().required('Required'),
                industry: Yup.string().required('Required')
            })
        ),
        visible: Yup.boolean().required('Required')
    });

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-4" style={{ maxWidth: '700px', width: '100%' }}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form>
                            {/* Visibilité */}
                            <div className="form-group mb-4">
                                <label className="d-flex align-items-center">
                                    <Field
                                        type="checkbox"
                                        name="visible"
                                        className="form-check-input me-2"
                                        checked={values.visible}
                                        onChange={() => setFieldValue('visible', !values.visible)}
                                    />
                                    Rendre ce CV visible
                                </label>
                            </div>

                            {/* Prénom */}
                            <div className="form-group mb-4">
                                <label htmlFor="firstname">Prénom:</label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="firstname"
                                    placeholder="Enter your first name"
                                />
                                <ErrorMessage style={{ color: 'red' }} name="firstname" component="div" />
                            </div>

                            {/* Nom */}
                            <div className="form-group mb-4">
                                <label htmlFor="lastname">Nom:</label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="lastname"
                                    placeholder="Enter your last name"
                                />
                                <ErrorMessage style={{ color: 'red' }} name="lastname" component="div" />
                            </div>

                            {/* Description */}
                            <div className="form-group mb-4">
                                <label htmlFor="description">Description:</label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="description"
                                    placeholder="Enter a short description"
                                />
                                <ErrorMessage style={{ color: 'red' }} name="description" component="div" />
                            </div>

                            {/* Diplômes */}
                            <FieldArray name="diplomes">
                                {({ push, remove }) => (
                                    <div className="form-group">
                                        <label>Diplômes:</label>
                                        <div>
                                            {values.diplomes.map((_, index) => (
                                                <div key={index} className="position-relative mb-3">
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`diplomes[${index}].title`}
                                                        placeholder="Titre"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`diplomes[${index}].school`}
                                                        placeholder="École"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`diplomes[${index}].year`}
                                                        placeholder="Année"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger position-absolute"
                                                        style={{ top: 0, right: 0 }}
                                                        onClick={() => remove(index)}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-2"
                                            onClick={() => push({ title: '', school: '', year: '' })}
                                        >
                                            + Ajouter un diplôme
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            {/* Certifications */}
                            <FieldArray name="certifications">
                                {({ push, remove }) => (
                                    <div className="form-group mt-4">
                                        <label>Certifications:</label>
                                        <div>
                                            {values.certifications.map((_, index) => (
                                                <div key={index} className="position-relative mb-3">
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`certifications[${index}].name`}
                                                        placeholder="Nom"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`certifications[${index}].issuedBy`}
                                                        placeholder="Émis par"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`certifications[${index}].year`}
                                                        placeholder="Année"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger position-absolute"
                                                        style={{ top: 0, right: 0 }}
                                                        onClick={() => remove(index)}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-2"
                                            onClick={() => push({ name: '', issuedBy: '', year: '' })}
                                        >
                                            + Ajouter une certification
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            {/* Formations */}
                            <FieldArray name="formations">
                                {({ push, remove }) => (
                                    <div className="form-group mt-4">
                                        <label>Formations:</label>
                                        <div>
                                            {values.formations.map((_, index) => (
                                                <div key={index} className="position-relative mb-3">
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`formations[${index}].name`}
                                                        placeholder="Nom"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`formations[${index}].institution`}
                                                        placeholder="Institution"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`formations[${index}].year`}
                                                        placeholder="Année"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger position-absolute"
                                                        style={{ top: 0, right: 0 }}
                                                        onClick={() => remove(index)}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-2"
                                            onClick={() => push({ name: '', institution: '', year: '' })}
                                        >
                                            + Ajouter une formation
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            {/* Jobs */}
                            <FieldArray name="jobs">
                                {({ push, remove }) => (
                                    <div className="form-group mt-4">
                                        <label>Jobs:</label>
                                        <div>
                                            {values.jobs.map((_, index) => (
                                                <div key={index} className="position-relative mb-3">
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`jobs[${index}].title`}
                                                        placeholder="Titre"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`jobs[${index}].startYear`}
                                                        placeholder="Année de début"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`jobs[${index}].endYear`}
                                                        placeholder="Année de fin"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger position-absolute"
                                                        style={{ top: 0, right: 0 }}
                                                        onClick={() => remove(index)}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-2"
                                            onClick={() => push({ title: '', startYear: '', endYear: '' })}
                                        >
                                            + Ajouter un job
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            {/* Missions */}
                            <FieldArray name="missions">
                                {({ push, remove }) => (
                                    <div className="form-group mt-4">
                                        <label>Missions:</label>
                                        <div>
                                            {values.missions.map((_, index) => (
                                                <div key={index} className="position-relative mb-3">
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`missions[${index}].name`}
                                                        placeholder="Nom"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`missions[${index}].description`}
                                                        placeholder="Description"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger position-absolute"
                                                        style={{ top: 0, right: 0 }}
                                                        onClick={() => remove(index)}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-2"
                                            onClick={() => push({ name: '', description: '' })}
                                        >
                                            + Ajouter une mission
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            {/* Entreprises */}
                            <FieldArray name="compagnies">
                                {({ push, remove }) => (
                                    <div className="form-group mt-4">
                                        <label>Entreprises:</label>
                                        <div>
                                            {values.compagnies.map((_, index) => (
                                                <div key={index} className="position-relative mb-3">
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`compagnies[${index}].name`}
                                                        placeholder="Nom"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`compagnies[${index}].location`}
                                                        placeholder="Lieu"
                                                    />
                                                    <Field
                                                        className="form-control mb-2"
                                                        name={`compagnies[${index}].industry`}
                                                        placeholder="secteur d'activité"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger position-absolute"
                                                        style={{ top: 0, right: 0 }}
                                                        onClick={() => remove(index)}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-2"
                                            onClick={() => push({ name: '', location: '', industry: '' })}
                                        >
                                            + Ajouter une entreprise
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            <button className="btn btn-success mt-4" type="submit" disabled={isSubmitting}>
                                {isEditing ? 'Mettre à jour le CV' : 'Créer le CV'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CvForm;
