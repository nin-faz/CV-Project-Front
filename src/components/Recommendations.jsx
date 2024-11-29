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
                <li key={index} className="list-group-item">
                    <p>{rec.description}</p>
                    {rec.userid && (
                        <p className="text-muted">Par: {rec.userid.firstname} {rec.userid.lastname}</p>
                    )}
                        <p>Le {format(new Date(rec.createdAt), 'dd MMMM yyyy', { locale: fr })}</p>                </li>
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
