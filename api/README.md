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

Let's break down the `Search.jsx` file into logical chunks and explain each part in detail.

### 1. **State Initialization and Imports**

```javascript
import React, { useState } from 'react';
import { scroll, extractInfo } from '../util/api.js';  // Import the utility functions

function Search() {
    const [query, setQuery] = useState('');      // State to hold the user's search query
    const [results, setResults] = useState([]);  // State to hold search results
    const [loading, setLoading] = useState(false);  // State to track loading status
    const [error, setError] = useState(null);    // State to track any error messages
```

#### **Explanation:**
- **Imports**:
  - **`scroll`**: This is the function from `api.js` that handles fetching and paginating results from the API.
  - **`extractInfo`**: This is the function that processes raw API data and extracts relevant information for display (e.g., titles, descriptions, links).

- **State Variables**:
  - **`query`**: Stores the user's search input. It's updated whenever the user types in the search box.
  - **`results`**: This array holds the results returned from the API after processing.
  - **`loading`**: A boolean flag that indicates whether the search is currently in progress. It helps display a loading message while the data is being fetched.
  - **`error`**: Stores any error messages that occur during the search (e.g., API issues), which can then be displayed to the user.

---

### 2. **Search URL Declaration**

```javascript
    const searchUrl = 'https://api.core.ac.uk/v3/search/works';  // The API URL for searching works
```

#### **Explanation:**
- **`searchUrl`**: This is the base URL of the API that will be used to perform the search queries. The `scroll` function from `api.js` will append the query and other parameters to this base URL to make API calls.

---

### 3. **Search Handler Function**

```javascript
    const handleSearch = async (e) => {
        e.preventDefault();  // Prevent the form from submitting and reloading the page
        setLoading(true);    // Set loading state to true while waiting for the API response
        setError(null);      // Clear any previous error messages
        setResults([]);      // Clear any previous results

        try {
            // Call the scroll function to fetch the results
            const fetchedResults = await scroll(searchUrl, query);
            // Process the results using the extractInfo function
            const processedResults = extractInfo(fetchedResults);
            setResults(processedResults);  // Update the results state with the processed data
        } catch (err) {
            setError(err.message);  // If an error occurs, store the error message
        } finally {
            setLoading(false);  // Set loading state to false once the request is finished
        }
    };
```

#### **Explanation:**
- **`handleSearch`**: This is the main function that is triggered when the user submits the search form.

- **Steps**:
  1. **Prevent default form behavior**: The form's default behavior is to submit and reload the page, which is prevented here to keep the search results on the same page.
  2. **Reset state**: Before initiating the search, it clears any existing results or errors and sets the `loading` flag to `true` to indicate that a search is in progress.
  3. **Fetch results**: It calls the `scroll` function from `api.js`, passing in the search URL and query. This function handles the pagination and fetches all relevant data from the API.
  4. **Process results**: Once the results are fetched, they are passed to the `extractInfo` function, which extracts the relevant fields (title, description, etc.) for display. The processed results are stored in the `results` state.
  5. **Error handling**: If an error occurs during the fetch process, the error message is caught and saved in the `error` state for display to the user.
  6. **Loading state**: The `loading` state is set back to `false` once the search process (either successful or failed) is completed.

---

### 4. **Search Form and UI**

```javascript
    return (
        <div>
            <form onSubmit={handleSearch}>  {/* Bind the search handler to the form */}
                <input
                    type="text"
                    placeholder="Search for works"  // Placeholder text in the input box
                    value={query}  // Bind the input value to the query state
                    onChange={(e) => setQuery(e.target.value)}  // Update the query state as the user types
                />
                <button type="submit">Search</button>  {/* Button to submit the form */}
            </form>
```

#### **Explanation:**
- **Form**:
  - The form contains an input field and a submit button.
  - **Input Field**: The input value is bound to the `query` state using `value={query}`. As the user types, the `onChange` handler updates the `query` state with the new input value.
  - **Submit Button**: The form is submitted when the user clicks the "Search" button or presses Enter. The `onSubmit` handler is linked to the `handleSearch` function, which initiates the API request.

---

### 5. **Loading and Error Handling**

```javascript
            {loading && <p>Loading...</p>}  {/* Show loading text if a search is in progress */}
            {error && <p>Error: {error}</p>}  {/* Show an error message if an error occurs */}
```

#### **Explanation:**
- **Loading Indicator**:
  - If `loading` is `true`, a "Loading..." message is displayed while waiting for the API to return the results.

- **Error Handling**:
  - If there is an error (i.e., if `error` is not `null`), an error message is displayed to inform the user of what went wrong during the search process.

---

### 6. **Displaying Results**

```javascript
            <ul>
                {results.map((result, index) => (
                    <li key={index}>  {/* Use index as the key for each result */}
                        <h2>{result.title}</h2>  {/* Display the title of the work */}
                        <p>{result.description}</p>  {/* Display the description/abstract */}
                        <div>
                            {/* Link to view details of the work */}
                            <a href={result.displayLink} target="_blank" rel="noopener noreferrer">
                                View Details
                            </a>
                            {' | '}
                            {/* Link to download the work */}
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
```

#### **Explanation:**
- **Results Display**:
  - The results are rendered inside an unordered list (`<ul>`).
  - **`results.map()`**: The `results` array is mapped over, and for each result, a list item (`<li>`) is created with the following content:
    - **Title**: The title of the work is displayed inside an `<h2>` tag.
    - **Description**: The abstract or description of the work is displayed inside a `<p>` tag.
    - **Links**: Two links are provided:
      - **"View Details"**: A link to the display page for the work. It opens in a new tab using `target="_blank"` with `rel="noopener noreferrer"` for security.
      - **"Download"**: A link to download the work.

- **Key Prop**: Each list item is given a unique `key` using the index of the result. In production code, using a unique ID for the key (if available) would be better, but here the index is sufficient for a list of results that do not dynamically update.

---

### **Summary:**

1. **State Management**: The component uses React's `useState` hook to manage the search query, results, loading state, and any errors that occur during the search.

2. **API Interaction**: The `handleSearch` function manages the search process. It triggers the API request by calling `scroll`, processes the results with `extractInfo`, and handles errors and loading states.

3. **User Interface**:
   - A form allows the user to enter a search query.
   - While waiting for results, a loading message is displayed.
   - If an error occurs (e.g., an API issue), an error message is shown.
   - The results, when returned, are displayed as a list of titles, descriptions, and links to view or download the works.

By breaking down the `Search.jsx` file into these chunks, we see how the component efficiently manages state, communicates with the API, and provides a responsive user interface to display results.

#### **api.js**

The `api.js` file contains the functions responsible for interacting with the CORE API.

```javascript
// api.js

// Helper function to add delay (with optional jitter)
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper function for random jitter
function getRandomJitter(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to query the API using fetch with exponential backoff and retry logic
export async function queryApi(searchUrl, query, scrollId = null, attempt = 1) {
    const MAX_RETRIES = 5; // Max retry attempts
    const headers = {
        Authorization: `Bearer ${process.env.REACT_APP_CORE_API_KEY}`,  // Use environment variables for the API key
    };

    // Construct the API URL, including scrollId if paginating
    let url = scrollId
        ? `${searchUrl}?q=${encodeURIComponent(query)}&limit=5&scrollId=${scrollId}`
        : `${searchUrl}?q=${encodeURIComponent(query)}&limit=5&scroll=true`;

    try {
        const response = await fetch(url, { headers });

        // Handle rate limiting (HTTP 429) by retrying with exponential backoff and jitter
        if (response.status === 429 && attempt <= MAX_RETRIES) {
            const delayTime = Math.min(3000 * Math.pow(2, attempt - 1), 30000) + getRandomJitter(0, 1000);
            console.warn(`Rate limited. Retrying in ${delayTime / 1000} seconds (Attempt ${attempt})...`);
            await delay(delayTime);
            return queryApi(searchUrl, query, scrollId, attempt + 1); // Retry with incremented attempt count
        }

        // Throw an error for other unsuccessful responses
        if (!response.ok) {
            throw new Error(`Failed to fetch results: ${response.statusText}`);
        }

        // Parse the response data as JSON
        const data = await response.json();
        return { data, elapsed: response.elapsed || 0 };
    } catch (error) {
        console.error('API request failed:', error.message);

        // If max retries are reached, return the error message
        if (attempt > MAX_RETRIES) {
            throw new Error('Max retries reached. Failed to fetch results.');
        }

        // Re-throw the error to be handled at the caller level
        throw error;
    }
}

// Function to handle paginated results (scrolling)
export async function scroll(searchUrl, query) {
    let allResults = [];
    let scrollId = null;

    // Loop to keep fetching results until no more are available
    while (true) {
        try {
            const { data } = await queryApi(searchUrl, query, scrollId);

            // If no data or results, break the loop
            if (!data || !data.results || data.results.length === 0) break;

            // Append the results to the accumulated list
            allResults = [...allResults, ...data.results];
            scrollId = data.scrollId; // Update scrollId for the next page
        } catch (error) {
            console.error('Failed to retrieve data:', error.message);
            break;
        }

        // Delay to avoid rate-limiting between requests
        await delay(3000);
    }

    return allResults; // Return all accumulated results
}

// Function to extract necessary information from API results
export function extractInfo(results) {
    if (!Array.isArray(results)) {
        console.error('Expected an array of results');
        return [];
    }

    // Extract relevant fields from each result
    return results.map((result) => {
        const title = result.title || "No title available";
        const description = result.abstract || "No description available";
        const displayLink = result.links.find(link => link.type === 'display')?.url || "#";
        const downloadLink = result.links.find(link => link.type === 'download')?.url || "#";

        return {
            title,
            description,
            displayLink,
            downloadLink,
        };
    });
}
```

Let's break down the `api.js` file into smaller, logical chunks and explain each part in detail.

### 1. **Delay Function with Optional Jitter**

```javascript
// Helper function to add delay (with optional jitter)
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper function for random jitter
function getRandomJitter(min, max) {
    return Math.random() * (max - min) + min;
}
```

#### **Explanation:**
- **`delay(ms)`**: This function returns a promise that resolves after `ms` milliseconds. It’s a way to pause the execution of code for a set amount of time, often used between retries to avoid overwhelming an API.
  
- **`getRandomJitter(min, max)`**: This function adds randomness (or **jitter**) to the delay. It generates a random number between `min` and `max`. Jitter helps prevent all retry requests from being made at the exact same time, reducing the chance of hitting rate limits again.

---

### 2. **Query Function with Exponential Backoff for Retries**

```javascript
// Function to query the API using fetch with exponential backoff and retry logic
export async function queryApi(searchUrl, query, scrollId = null, attempt = 1) {
    const MAX_RETRIES = 5; // Max retry attempts
    const headers = {
        Authorization: `Bearer ${process.env.REACT_APP_CORE_API_KEY}`,  // Use environment variables for the API key
    };

    // Construct the API URL, including scrollId if paginating
    let url = scrollId
        ? `${searchUrl}?q=${encodeURIComponent(query)}&limit=5&scrollId=${scrollId}`
        : `${searchUrl}?q=${encodeURIComponent(query)}&limit=5&scroll=true`;

    try {
        const response = await fetch(url, { headers });

        // Handle rate limiting (HTTP 429) by retrying with exponential backoff and jitter
        if (response.status === 429 && attempt <= MAX_RETRIES) {
            const delayTime = Math.min(3000 * Math.pow(2, attempt - 1), 30000) + getRandomJitter(0, 1000);
            console.warn(`Rate limited. Retrying in ${delayTime / 1000} seconds (Attempt ${attempt})...`);
            await delay(delayTime);
            return queryApi(searchUrl, query, scrollId, attempt + 1); // Retry with incremented attempt count
        }

        // Throw an error for other unsuccessful responses
        if (!response.ok) {
            throw new Error(`Failed to fetch results: ${response.statusText}`);
        }

        // Parse the response data as JSON
        const data = await response.json();
        return { data, elapsed: response.elapsed || 0 };
    } catch (error) {
        console.error('API request failed:', error.message);

        // If max retries are reached, return the error message
        if (attempt > MAX_RETRIES) {
            throw new Error('Max retries reached. Failed to fetch results.');
        }

        // Re-throw the error to be handled at the caller level
        throw error;
    }
}
```

#### **Explanation:**
- **`MAX_RETRIES`**: This defines the maximum number of times the API request will retry in case of failure (especially for rate limiting errors like `429`).
  
- **`headers`**: We set the headers for the API request, which includes an **Authorization** header with the API key. This API key is securely fetched from environment variables using `process.env.REACT_APP_CORE_API_KEY`.

- **URL Construction**:
  - The URL is dynamically built. If a `scrollId` is provided (for paginated requests), it’s included in the URL. Otherwise, the initial URL query is constructed with `scroll=true` to enable pagination.
  - The `limit=5` parameter limits the results to 5 items per request to avoid fetching too much data in one go.

- **`fetch(url, { headers })`**: This is the core part that performs the actual HTTP request to the API using `fetch`.

- **Handling Rate Limiting (429 Status)**:
  - If the API responds with a `429` (Too Many Requests), the function waits using exponential backoff and **jitter** to retry the request.
  - The retry delay grows exponentially: `3000 * Math.pow(2, attempt - 1)`. It also caps at 30 seconds to avoid excessive wait times.
  - **Jitter** adds a small random delay to make retries less predictable and to avoid overloading the server.

- **Retries and Error Handling**:
  - The function retries the request up to `MAX_RETRIES` times if rate limiting occurs.
  - If an error occurs and retries are exhausted, an error message is thrown, which the calling code can handle.

- **Response Parsing**:
  - If the response is successful (`response.ok` is true), the response data is parsed into JSON and returned along with any `elapsed` time (if available).

---

### 3. **Scroll Function for Paginated API Results**

```javascript
// Function to handle paginated results (scrolling)
export async function scroll(searchUrl, query) {
    let allResults = [];
    let scrollId = null;

    // Loop to keep fetching results until no more are available
    while (true) {
        try {
            const { data } = await queryApi(searchUrl, query, scrollId);

            // If no data or results, break the loop
            if (!data || !data.results || data.results.length === 0) break;

            // Append the results to the accumulated list
            allResults = [...allResults, ...data.results];
            scrollId = data.scrollId; // Update scrollId for the next page
        } catch (error) {
            console.error('Failed to retrieve data:', error.message);
            break;
        }

        // Delay to avoid rate-limiting between requests
        await delay(3000);
    }

    return allResults; // Return all accumulated results
}
```

#### **Explanation:**
- **Purpose**: This function is responsible for handling **pagination** (or "scrolling") in the API results. It continuously fetches more results until there are no more pages to fetch.

- **`scrollId`**: This is an identifier returned by the API after each request. It tells the API where to continue from when fetching the next page of results.

- **While Loop**:
  - The loop continues to make API requests as long as there are more results to fetch. After each request, the results are appended to the `allResults` array.
  - If no results are returned, the loop breaks.
  - After each request, the function waits 3 seconds before making another request (to avoid rate-limiting issues).

- **Error Handling**:
  - If any error occurs during a request, it logs the error message and breaks out of the loop.
  
- **Return Value**: The function returns all the results after fetching all available pages.

---

### 4. **Extract Information Function**

```javascript
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
        const downloadLink = result.links.find(link => link.type === 'download')?.url || "#";

        return {
            title,
            description,
            displayLink,
            downloadLink,
        };
    });
}
```

#### **Explanation:**
- **Purpose**: This function processes the raw results from the API and extracts only the relevant fields needed for display (e.g., title, description, and links).

- **Error Handling**: It first checks if the input (`results`) is an array. If it’s not, it logs an error and returns an empty array.

- **Mapping**:
  - For each `result` in the array, it attempts to extract:
    - **Title**: If the title is missing, it defaults to "No title available."
    - **Description**: If the abstract/description is missing, it defaults to "No description available."
    - **Display Link**: If no display link is found, it defaults to `"#"`.
    - **Download Link**: If no download link is found, it defaults to `"#"`.

- **Return Value**: The function returns a new array of objects, each containing the extracted information (title, description, displayLink, downloadLink).

---

### **Summary:**

1. **Delay and Retry Logic**: The `delay` and retry logic help manage rate-limiting by pausing between retries and progressively increasing the wait time for each attempt.

2. **`queryApi`**: This function performs the core API request, handles retries with backoff, and ensures that requests are retried up to a maximum limit in case of rate-limiting.

3. **`scroll`**: This function is used to handle pagination by continuously requesting more data until no more results are available, respecting the API’s rate limits between requests.

4. **`extractInfo`**: This function processes raw API results and extracts the fields that are relevant for display, ensuring that missing values are handled gracefully.

This approach ensures that the API is used efficiently and the application doesn’t overwhelm the server with too many requests in a short time, while handling potential errors and providing useful feedback for troubleshooting.

---

### **7. Summary**

In this lesson, we:
- Learned how to obtain and use an API key for the CORE API.
- Implemented a search functionality using React and the CORE API.
- Discussed the importance of managing request rates to avoid hitting rate limits.
- Extracted and displayed relevant information from the API response.

By following these steps, you now have a functional research paper search engine that can fetch and display results from the CORE API!
