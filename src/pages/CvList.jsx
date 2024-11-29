import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../context/SearchContext.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';


function CvList() {
    const [cvs, setCvs] = useState([]); // Liste complète des CV
    const [cvsFiltered, setCvsFiltered] = useState([]); // Liste filtrée pour affichage
    const { searchTerm } = useContext(SearchContext);
    const [isLoading, setIsLoading] = useState(true);

    

    // Récupérer tous les CV
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (searchTerm === '') {
                    const response = await fetch('https://cv-project-api.onrender.com/api/cv');
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log('Liste des CV:', data);
                    setCvs(data);
                    setCvsFiltered(data);
                } else {
                    const response = await fetch(`https://cv-project-api.onrender.com/api/cv/name/${searchTerm}`);
                    console.log('Recherche 2:', response);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log('Liste des CV filtrés de :', searchTerm);
                    setCvs(data);
                    setCvsFiltered(data);
                }
            } catch (error) {
                console.error('Failed to fetch CVs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchTerm]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="container my-4">
            <h1 className="mb-4 text-center">Liste des CV</h1>
            <div className="row g-4">
                {cvsFiltered.length > 0 ? (
                    cvsFiltered.map((cv) => (
                        <div className="col-12 col-sm-6 col-md-4" key={cv._id}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {cv.firstname} {cv.lastname}
                                    </h5>
                                    <p className="card-text">{cv.description}</p>
                                    <a href={`/cv/${cv._id}`} className="btn btn-primary">
                                        Voir plus
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Aucun CV trouvé.</p>
                )}
            </div>
        </div>
    );
}

export default CvList;
