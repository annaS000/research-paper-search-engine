// SearchResult.jsx
import React from 'react';

function SearchResult({ title, description, displayLink, downloadLink }) {
    return (
        <li className="list-group-item">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={displayLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        View Details
                    </a>
                    <a href={downloadLink} className="btn btn-secondary ml-2" target="_blank" rel="noopener noreferrer">
                        Download
                    </a>
                </div>
            </div>
        </li>
    );
}

export default SearchResult;
