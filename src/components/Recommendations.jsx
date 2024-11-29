import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function Recommendations({ recommendations = [] }) {
    if (!recommendations || recommendations.length === 0) {
        return <p className="text-muted">Aucune recommandation disponible.</p>;
    }

    return (
        <ul className="list-group mb-4">
            {recommendations.map((rec, index) => (
                <li key={index} className="list-group-item" style={{ textAlign: 'left' }}>
                    <div className="row mb-3">
                        <div className="col text-start">
                            <p className="mb-0 text-muted">
                                <strong>Le :</strong>{' '}
                                {format(new Date(rec.createdAt), 'dd/MM/yy à HH:mm', {
                                    locale: fr
                                })}
                            </p>
                        </div>

                        <div className="col text-end">
                            {rec.userid && (
                                <p className="mb-0 text-muted">
                                    <strong>Par :</strong> {rec.userid.firstname} {rec.userid.lastname}
                                </p>
                            )}
                        </div>
                    </div>

                    <span>{rec.description}</span>
                </li>
            ))}
        </ul>
    );
}

Recommendations.propTypes = {
    recommendations: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            userid: PropTypes.shape({
                firstname: PropTypes.string,
                lastname: PropTypes.string
            })
        })
    ).isRequired
};

export default Recommendations;
