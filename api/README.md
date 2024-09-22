### Lesson: Implementing a Research Paper Search Engine with React

In this lesson, we will walk through the process of creating a research paper search engine using React and the [CORE API](https://core.ac.uk). The project will allow users to search for academic papers by keywords, retrieve relevant results, and display details such as the paper title, abstract, and links to view or download the paper.

By the end of this lesson, you will have a working application that can:
1. Search for research papers using the CORE API.
2. Display the search results in a user-friendly way.
3. Handle loading states, errors, and pagination via API scroll.

We'll also discuss how to get an API key, the importance of limiting request rates to avoid overloading the API, and how to process and extract the API response data for display.

---

### **1. Setting Up the Project**

Before diving into the code, ensure you have the following set up:

- Node.js and npm installed.
- A basic `React` project created using `create-react-app` or another setup method.

You will need an API key from CORE to make requests to their API.

### **2. Obtaining a CORE API Key**

1. Visit the [CORE website](https://core.ac.uk) and sign up for an account if you don’t have one.
2. Navigate to the API section and request an API key. This key will allow you to access the research papers through the CORE API.
3. Once you have the API key, you’ll need to include it in your project to authenticate API requests. You can either store it in an environment variable (`.env` file) or directly in the code (not recommended for production).

### **3. Limiting Request Rate to Avoid API Rate Limits**

API providers often impose rate limits to prevent overloading their servers. The CORE API is no exception. To avoid exceeding the limit:
- Use a delay between subsequent requests (e.g., 3 seconds).
- Ensure you don't make unnecessary requests, especially in a loop or continuous scrolling context.
- Handle "429 Too Many Requests" responses gracefully by retrying the request after a delay.

### **4. Understanding the API Response Structure**

The CORE API returns a JSON object with several fields, including the results of the query and a `scrollId` for pagination. To display the search results properly, you’ll need to extract key pieces of information such as:
- The title of the paper.
- The abstract or description.
- Links to view and download the paper.

### **5. Project Structure**

Here is an overview of the project structure:

```
/src
  /components
    - Search.jsx
  /util
    - api.js
  - App.js
```

### **6. Code Explanation**

Now, let's dive into the code.

#### **App.js**
The `App.js` component serves as the root of the application and renders the `Search` component.

```jsx
// App.js
import React from 'react';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <h1>Research Paper Search Engine</h1>
      <Search />
    </div>
  );
}

export default App;
```

This file is straightforward. It contains the title of the page and renders the `Search` component.

#### **Search.jsx**

The `Search.jsx` component contains the search form and logic to handle fetching and displaying results.

```jsx
// Search.jsx
import React, { useState } from 'react';
import { scroll, extractInfo } from '../util/api.js';  // Import the utility functions

function Search() {
    const [query, setQuery] = useState(''); // State for user input
    const [results, setResults] = useState([]); // State to store API results
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null); // State for errors

    const searchUrl = 'https://api.core.ac.uk/v3/search/works'; // CORE API endpoint

    // Handle form submission and search
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Show loading spinner
        setError(null); // Reset any previous errors
        setResults([]); // Clear previous results

        try {
            // Fetch results from the API
            const fetchedResults = await scroll(searchUrl, query);
            const processedResults = extractInfo(fetchedResults);  // Extract relevant data from the results
            setResults(processedResults);  // Set the results in state
        } catch (err) {
            setError(err.message);  // Set error message if API call fails
        } finally {
            setLoading(false);  // Hide loading spinner after request completes
        }
    };

    return (
        <div>
            {/* Search form */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for works"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update query state on input change
                />
                <button type="submit">Search</button>
            </form>

            {/* Display loading message */}
            {loading && <p>Loading...</p>}

            {/* Display error message */}
            {error && <p>Error: {error}</p>}

            {/* Display search results */}
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
```

- **State Management**: The component uses React's `useState` to manage the search query, results, loading state, and error messages.
- **API Request**: On form submission, the `scroll` function is called to fetch results from the API.
- **Display Logic**: Results are displayed as a list with the title, description, and links to view or download the paper.

#### **api.js**

The `api.js` file contains the functions responsible for interacting with the CORE API.

```javascript
// api.js

// Function to query the API, with optional scrollId for pagination
export async function queryApi(searchUrl, query, scrollId = null) {
    const headers = {
        Authorization: `Bearer ${"B8Z........JNSw"}`,  // Replace with your API key
    };

    // Construct the URL for the API request
    let url = scrollId
      ? `${searchUrl}?q=${encodeURIComponent(query)}&limit=5&scrollId=${scrollId}`  // If scrolling, include scrollId
      : `${searchUrl}?q=${encodeURIComponent(query)}&limit=5&scroll=true`;  // Initial request with scroll enabled

    try {
        const response = await fetch(url, { headers });

        // Handle "Too Many Requests" error (rate limit)
        if (response.status === 429) {
            console.warn('Too many requests. Retrying after delay...');
            await delay(3000);  // Wait 3 seconds before retrying
            return queryApi(searchUrl, query, scrollId);  // Retry the request
        }

        if (!response.ok) {
            throw new Error('Failed to fetch results');  // Handle general API errors
        }

        const data = await response.json();  // Parse the response data
        return { data, elapsed: response.elapsed || 0 };  // Return data and response time
    } catch (error) {
        console.error('Error fetching data:', error);  // Log and return error
        return { data: null, error: error.message };
    }
}

// Helper function to add a delay between requests
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to handle pagination (scrolling through results)
export async function scroll(searchUrl, query) {
    let allResults = [];
    let scrollId = null;  // Scroll ID for pagination

    while (true) {
        const { data, error } = await queryApi(searchUrl, query, scrollId);

        if (error || !data || !data.results) {
            console.error('Failed to retrieve data:', error);
            break;
        }

        scrollId = data.scrollId;  // Update the scrollId for the next page of results
        const results = data.results;
        if (results.length === 0) break;  // Stop if no more results

        allResults = [...allResults, ...results];  // Append new results
        await delay(3000);  // Delay between requests to avoid rate limits
    }

    return allResults;  // Return all collected results
}

// Function to extract relevant information from API results
export function extractInfo(results) {
    if (!Array.isArray(results)) {
        console.error('Expected an array of results');
        return [];
    }

    // Map over the results to extract the necessary fields
    return results.map((result) => {
        const title = result.title || "No title available";
        const description = result.abstract || "No description available";
        const displayLink = result.links.find(link => link.type === 'display')?.url || "#";
        const downloadLink = result.links.find(link => link.type === 'download')?.

url || "#";

        return {
            title,
            description,
            displayLink,
            downloadLink,
        };
    });
}
```

- **`queryApi`**: Handles the main API request logic, including rate limiting and pagination.
- **`scroll`**: Manages scrolling/pagination by repeatedly calling `queryApi` to fetch subsequent pages of results.
- **`extractInfo`**: Extracts key information (title, description, links) from the API response for rendering in the UI.

---

### **7. Summary**

In this lesson, we:
- Learned how to obtain and use an API key for the CORE API.
- Implemented a search functionality using React and the CORE API.
- Discussed the importance of managing request rates to avoid hitting rate limits.
- Extracted and displayed relevant information from the API response.

By following these steps, you now have a functional research paper search engine that can fetch and display results from the CORE API!