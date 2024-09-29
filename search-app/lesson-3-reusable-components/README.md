Great! Now that we've integrated the CORE API in **Lesson 2**, let's move on to **Lesson 3** of the project, where we focus on **Creating Reusable Components for Results**. In this lesson, we'll refactor the application so that it’s easier to maintain and scale by breaking down the search results into reusable components. This approach aligns with React best practices for component-based architecture.

### **Lesson 4: Creating Reusable Components for Results**

#### **Goals**:
- Learn how to break down the app into smaller, reusable components.
- Pass data between components using `props` in React.
- Ensure the app is modular and maintainable by separating concerns.

---

### **Step 1: Creating a `SearchResult` Component**

In this step, we'll create a new component called `SearchResult`. This component will handle displaying individual search results, making the main `Search` component cleaner and more focused on business logic (fetching data and managing state).

#### **File: `SearchResult.jsx`**

1. **Create a New File**: Inside the `components` directory, create a file named `SearchResult.jsx`.

2. **Component Code**:

```javascript
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
```

#### **Explanation**:
- The `SearchResult` component accepts props (`title`, `description`, `displayLink`, `downloadLink`) that are passed from the parent component (`Search.jsx`).
- It displays the paper's title, description, and provides links to view or download the paper.
- The `target="_blank"` ensures that the links open in a new tab, and `rel="noopener noreferrer"` is added for security.

---

### **Step 2: Refactor the `Search` Component**

Now, we’ll refactor the `Search.jsx` file to use the new `SearchResult` component, simplifying the code for readability and maintainability.

#### **Updated `Search.jsx`**:

```javascript
import React, { useState } from 'react';
import { scroll, extractInfo } from '../util/api.js';  // Import the utility functions
import SearchResult from './SearchResult';  // Import the new SearchResult component

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
```

#### **Explanation**:
- The code now imports the `SearchResult` component.
- Inside the `<ul>` element, instead of repeating the code to display each result, we use the `SearchResult` component and pass down the relevant data (`title`, `description`, `displayLink`, and `downloadLink`) as props.
- This results in cleaner and more maintainable code. If we ever need to change the way a single result is displayed, we can do so inside `SearchResult.jsx` without modifying the `Search` component.

---

### **Step 3: Test the Component**

With the new `SearchResult` component in place, test the app to ensure everything works as expected:
1. Run the app using `npm start`.
2. Perform a search, and verify that the results are displayed correctly using the `SearchResult` component.

You should see the same results as before, but now the app is more modular and easier to manage.

---

### **Step 4: Component Reusability**

The benefit of using a component like `SearchResult` is that it can now be reused anywhere in your app where you need to display similar results. For instance, if later in the project we want to show a "related works" section, we can reuse this component with minimal effort.

---

### **Key Concepts to Understand**:

1. **Component Reusability**:
   - Breaking down your app into smaller components helps in making the app modular and reusable. The `SearchResult` component is a perfect example of this approach.
   - With reusability, we avoid repeating the same code in multiple places, which reduces the chance of bugs and makes future updates easier.

2. **Passing Props**:
   - Props are how we pass data from one component (parent) to another (child). In this lesson, the `Search` component passed search result data as props to the `SearchResult` component.
   - This is a core feature of React’s component-based architecture, making it easy to share data between components.

3. **Simplifying the Parent Component**:
   - Refactoring the `Search` component allows it to focus on the logic of fetching and managing the results while leaving the display logic to `SearchResult`.
   - This separation of concerns is crucial in building scalable and maintainable applications.

---

### **Next Steps**:
Now that we have refactored our app with reusable components, we're ready to move on to **Lesson 4: Error Handling and Loading States**, where we’ll improve the user experience by handling potential issues such as failed API requests and displaying loading indicators while waiting for data.

Let me know when you're ready to proceed, or if you have any questions about this lesson!