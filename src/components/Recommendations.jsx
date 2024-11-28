import React from 'react';
import PropTypes from 'prop-types';

function Recommendations({ recommendations = [] }) {
    if (!recommendations || recommendations.length === 0) {
        return <p className="text-muted">Aucune recommandation disponible.</p>;
    }

    return (
        <ul className="list-group mb-4">
            {recommendations.map((rec, index) => (
                <li key={index} className="list-group-item">
                    {rec.description}
                </li>
            ))}
        </ul>
    );
}


Recommendations.propTypes = {
    recommendations: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Recommendations;
