import React, { useState } from 'react';

const mockResults = [
  { id: 1, title: 'Understanding Quantum Computing' },
  { id: 2, title: 'Advances in Machine Learning' },
  { id: 3, title: 'The Impact of Climate Change on Agriculture' },
];

function SearchForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate fetching results based on the query
    setResults(mockResults);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for research papers"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <p>Your search query: {query}</p>

      {/* Render the search results */}
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <h1>Research Paper Search Engine</h1>
      <SearchForm />
    </div>
  );
}

export default App;
