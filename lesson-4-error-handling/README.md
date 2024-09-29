Let's proceed with **Lesson 4: Error Handling and Loading States**. In this lesson, we'll focus on improving the user experience by handling errors and adding loading states. This will help ensure that users are informed when the app is fetching data or if something goes wrong (e.g., when there’s a problem with the API request).

### **Lesson 4: Error Handling and Loading States**

#### **Goals**:
- Implement error handling for API calls to handle scenarios like network failures or invalid requests.
- Display a loading indicator when data is being fetched to improve user experience.
- Ensure the app provides useful feedback to the user during long or unsuccessful searches.

---

### **Step 1: Adding a Loading State**

In React, managing a loading state while fetching data ensures users know that something is happening in the background. This helps prevent confusion, especially when the API request takes time.

#### **1.1. Update the `Search.jsx` Component**

1. We'll add a loading spinner or text while the search is being processed.
2. We'll also ensure that the UI reflects that loading is in progress by conditionally rendering based on the state.

```javascript
import React, { useState } from 'react';
import { scroll, extractInfo } from '../util/api.js';
import SearchResult from './SearchResult';

function Search() {
    // State hooks to manage input, results, loading, and errors
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state

    const searchUrl = 'https://api.core.ac.uk/v3/search/works';

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading to true when the request starts
        setError(null);  // Clear previous errors
        setResults([]);  // Clear previous results

        try {
            const fetchedResults = await scroll(searchUrl, query);  // Fetch data
            const processedResults = extractInfo(fetchedResults);  // Process data
            setResults(processedResults);  // Update state with results
        } catch (err) {
            setError(err.message);  // Handle any errors
        } finally {
            setLoading(false);  // Stop loading once the request is complete
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

            {/* Conditional rendering: Show loading text if fetching data */}
            {loading && <p>Loading...</p>}

            {/* Show error message if an error occurs */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {/* Display results only when data is available and not loading */}
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

            {/* Provide feedback when no results are found */}
            {!loading && results.length === 0 && query && <p>No results found.</p>}
        </div>
    );
}

export default Search;
```

#### **Explanation**:
- We’ve added a **loading state** (`loading`) to indicate when the app is waiting for data from the API.
- When a search is submitted (`handleSearch`), the app sets the loading state to `true`. This triggers a conditional rendering that shows a loading message ("Loading...") while the API request is in progress.
- After the API call completes, we set `loading` to `false`, and the results (or any error messages) are displayed accordingly.

---

### **Step 2: Adding Error Handling**

Handling errors gracefully is critical in creating a robust user experience. We want to ensure users are notified when something goes wrong (e.g., network issues or incorrect API responses).

#### **2.1. Update Error Handling Logic in `Search.jsx`**

We already have basic error handling implemented using a `try-catch` block, but let's expand on it to provide clearer feedback to the user. Here’s how we handle errors:

- We store the error message in the `error` state.
- If an error occurs, we display a message to the user with some styling (e.g., in red text).

```javascript
const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state
    setError(null);  // Clear previous errors
    setResults([]);  // Clear previous results

    try {
        const fetchedResults = await scroll(searchUrl, query);  // Fetch data from API
        const processedResults = extractInfo(fetchedResults);  // Process results
        setResults(processedResults);  // Update state with new results
    } catch (err) {
        // If an error occurs during the API request, set the error state
        setError("Something went wrong. Please try again later.");
    } finally {
        setLoading(false);  // Turn off the loading state
    }
};
```

#### **Explanation**:
- If the API call fails, the error message "Something went wrong. Please try again later." is shown to the user.
- You can customize this error message based on different error types, such as handling 404 responses or API rate-limiting errors differently.

---

### **Step 3: Enhancing User Feedback with Empty Results**

A common edge case is when a search query returns no results. Users should be informed if their search did not match any records. We handle this by checking if the results array is empty and providing a corresponding message.

```javascript
{!loading && results.length === 0 && query && <p>No results found.</p>}
```

#### **Explanation**:
- This conditional block checks if the results array is empty after a search and displays a "No results found" message.
- This ensures users receive feedback even when there’s no data to show.

---

### **Step 4: Customizing the Loading State**

You can further enhance the loading state by adding a spinner or a more elaborate loading animation. For simplicity, we are using plain text here, but you can easily integrate third-party libraries like **React Spinners**.

For example, you can replace the loading message with a spinner:

1. Install a spinner library:
   ```bash
   npm install react-spinners
   ```

2. Update the loading state to display the spinner:

```javascript
import { ClipLoader } from 'react-spinners';  // Import a spinner

{loading && <ClipLoader size={35} color="#123abc" />}  // Show spinner when loading
```

This would replace the plain text "Loading..." with a more visually appealing spinner.

---

### **Final Version of `Search.jsx`**:

```javascript
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
```

---

### **Key Concepts**:

1. **Loading States**:
   - A loading state improves user experience by informing the user that data is being fetched.
   - Using a spinner or loading message helps avoid confusion during long waits for data.

2. **Error Handling**:
   - It’s crucial to provide feedback when things go wrong. Displaying an error message allows users to know why