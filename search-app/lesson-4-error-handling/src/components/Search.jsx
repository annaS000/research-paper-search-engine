import React, { useState } from 'react';
import { scroll, extractInfo } from '../util/api.js';
import SearchResult from './SearchResult';
import { ClipLoader } from 'react-spinners';  // Optional: Spinner for loading state

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
            setResults(processedResults);
        } catch (err) {
            setError("Something went wrong. Please try again later.");
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

            {loading && <ClipLoader size={35} color="#123abc" />}  {/* Spinner while loading */}

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}  {/* Error message */}

            {!loading && results.length > 0 && (
                <ul>
                    {results.map((result, index) => (
                        <SearchResult
                            key={index}
                            title={result.title}
                            description={result.description}
                            displayLink={result.displayLink}
                            downloadLink={result.downloadLink}
                        />
                    ))}
                </ul>
            )}

            {!loading && results.length === 0 && query && <p>No results found.</p>}
        </div>
    );
}

export default Search;
