### **Lesson 5: Styling the Research Paper Search Engine App**

In this lesson, we will focus on styling the Research Paper Search Engine app to improve its user interface and user experience (UI/UX). We will cover how to add custom CSS for basic styling, and we’ll explore using CSS frameworks like **Bootstrap** to make the app look more polished and responsive.

---

### **Goals**:
- Style the search form, results list, and other UI elements.
- Learn how to apply custom CSS and utilize a CSS framework (Bootstrap) for faster and more responsive design.
- Ensure that the app is mobile-friendly and provides a clean, user-friendly interface.

---

### **Step 1: Setting Up Basic Styling with Custom CSS**

We’ll start by adding some basic custom styles to make the app more visually appealing. Let's create a `styles.css` file and use it to style the form, buttons, and the search results.

#### **1.1. Create a `styles.css` File**

Inside the `src` folder of your React project, create a new file called `styles.css`.

```css
/* styles.css */

/* Style the search form */
form {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Style the input field */
input {
    padding: 10px;
    font-size: 16px;
    width: 300px;
    border: 2px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    outline: none;
}

input:focus {
    border-color: #007bff;
}

/* Style the search button */
button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

/* Style the results list */
ul {
    list-style-type: none;
    padding: 0;
    max-width: 600px;
    margin: 20px auto;
}

li {
    background-color: #f9f9f9;
    padding: 20px;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Style the result title */
h2 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
}

/* Style the result description */
p {
    font-size: 16px;
    color: #666;
}

/* Style the result links */
a {
    color: #007bff;
    text-decoration: none;
    margin-right: 15px;
}

a:hover {
    text-decoration: underline;
}
```

#### **1.2. Update `Search.jsx` to Use the CSS File**

To apply these styles to our `Search.jsx` component, we need to import the `styles.css` file into the `App.js` or `Search.jsx` file.

```javascript
// App.js
import React from 'react';
import Search from './components/Search';
import './styles.css';  // Import the CSS file

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

#### **Explanation**:
- We’ve styled the form to make it centered and easy to interact with.
- The input field and button now have more padding and rounded corners, providing a modern look.
- The search results are displayed in clean, card-like containers with a shadow effect, making them more visually distinct.

---

### **Step 2: Adding a CSS Framework (Bootstrap)**

Using a CSS framework like **Bootstrap** can drastically speed up styling and make the app responsive across different devices without writing a lot of custom CSS. Bootstrap provides pre-styled components that we can easily integrate into our React app.

#### **2.1. Install Bootstrap**

To use Bootstrap in our project, we need to install it using npm.

```bash
npm install bootstrap
```

Then, import the Bootstrap CSS file into `index.js`.

```javascript
// index.js
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

#### **2.2. Update `Search.jsx` to Use Bootstrap Classes**

Now, we can update our `Search.jsx` component to use Bootstrap’s utility classes for better layout and styling. We’ll also make the form and search results more responsive.

```javascript
import React, { useState } from 'react';
import { scroll, extractInfo } from '../util/api.js';
import SearchResult from './SearchResult';
import { ClipLoader } from 'react-spinners';
import './styles.css';  // Our custom styles

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
        <div className="container mt-4">
            <form onSubmit={handleSearch} className="form-inline justify-content-center mb-4">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Search for works"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="form-control mr-2"
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>

            {loading && <ClipLoader size={35} color="#123abc" />}  {/* Loading spinner */}

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}  {/* Error message */}

            {!loading && results.length > 0 && (
                <ul className="list-group">
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

#### **Explanation**:
- **Bootstrap Grid**: The `container` class from Bootstrap centers the content, and `mt-4` adds margin-top for spacing.
- **Form Layout**: We use Bootstrap’s **form-inline** class to align the input field and button on the same line. The `form-control` and `btn btn-primary` classes style the input and button with default Bootstrap styles.
- **Responsive Layout**: By using Bootstrap’s built-in grid system and spacing classes (e.g., `mb-4` for margin-bottom), we ensure that the layout adjusts well across different screen sizes.

---

### **Step 3: Improving the Results List with Bootstrap**

Let’s update the **SearchResult** component to use Bootstrap’s card component for a more professional layout of the search results.

#### **3.1. Update `SearchResult.jsx`**

Here’s how you can make each search result look like a Bootstrap card:

```javascript
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
```

#### **Explanation**:
- We’ve used Bootstrap’s **card** component to wrap each search result in a clean card layout.
- The **card-title** and **card-text** classes help style the title and description.
- We’ve styled the links as buttons using Bootstrap’s **btn btn-primary** and **btn btn-secondary** classes, which provides a clear call-to-action for viewing and downloading results.

---

### **Step 4: Ensuring Mobile Responsiveness**

Bootstrap automatically makes the app responsive by providing flexible layout options. However, you can manually test the app on different screen sizes to ensure it looks good across

 all devices (mobile, tablet, desktop).

- Bootstrap’s **container**, **form-control**, and **btn** classes ensure that the layout adapts well to different screen widths.
- Use Chrome DevTools or another browser’s developer tools to simulate different screen sizes and test responsiveness.

---

### **Conclusion**:

In this lesson, you learned how to:
- Use custom CSS to style the search form, results, and buttons.
- Add **Bootstrap** to quickly style and make the app responsive.
- Utilize Bootstrap’s grid and utility classes to ensure a clean and professional layout.
  
Your app is now both functional and visually appealing, with a responsive design that works well on various devices.

In the next lesson, we’ll focus on final touches and deploying the app!