import React, { useState } from 'react';
import { scroll, extractInfo } from '../util/api.js';  // Import the utility functions

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchUrl = 'https://api.core.ac.uk/v3/search/works';

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const fetchedResults = await scroll(searchUrl, query);
            const processedResults = extractInfo(fetchedResults);  // No need to map again
            setResults(processedResults);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for works"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <h2>{result.title}</h2>
                        <p>{result.description}</p>
                        <div>
                            <a href={result.displayLink} target="_blank" rel="noopener noreferrer">
                                View Details
                            </a>
                            {' | '}
                            <a href={result.downloadLink} target="_blank" rel="noopener noreferrer">
                                Download
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
