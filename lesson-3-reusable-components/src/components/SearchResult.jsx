import React from 'react';

// The SearchResult component receives props from the parent (Search) component
function SearchResult({ title, description, displayLink, downloadLink }) {
    return (
        <li>
            <h2>{title}</h2>  {/* Display the title of the research paper */}
            <p>{description}</p>  {/* Display the abstract or description */}
            <div>
                {/* Display a link to view more details about the paper */}
                <a href={displayLink} target="_blank" rel="noopener noreferrer">
                    View Details
                </a>
                {' | '}
                {/* Display a link to download the paper */}
                <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                    Download
                </a>
            </div>
        </li>
    );
}

export default SearchResult;
