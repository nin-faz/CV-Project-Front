import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    return <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>{children}</SearchContext.Provider>;
};

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { SearchContext, SearchProvider };
