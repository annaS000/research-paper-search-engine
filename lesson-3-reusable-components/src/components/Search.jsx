import React, { useState } from 'react';
import { scroll, extractInfo } from '../util/api.js';  // Import the utility functions
import SearchResult from './SearchResult.jsx';  // Import the new SearchResult component

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
            const processedResults = extractInfo(fetchedResults);
            setResults(processedResults);  // Update state with the processed results
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
                    onChange={(e) => setQuery(e.target.value)}  // Update the query as user types
                />
                <button type="submit">Search</button>
            </form>

            {/* Display loading text or an error message */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {/* Display search results by mapping over the results array */}
            <ul>
                {results.map((result, index) => (
                    <SearchResult
                        key={index}  // Unique key for each result
                        title={result.title}  // Pass title as a prop
                        description={result.description}  // Pass description as a prop
                        displayLink={result.displayLink}  // Pass display link as a prop
                        downloadLink={result.downloadLink}  // Pass download link as a prop
                    />
                ))}
            </ul>
        </div>
    );
}

export default Search;
