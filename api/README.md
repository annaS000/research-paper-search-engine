### **Lesson 3: Integrating the CORE API**

Now that we’ve built a simple search form and simulated search results, it’s time to integrate the **CORE API** to fetch real research paper data based on the user's input. This lesson will teach you how to make HTTP requests in React, handle asynchronous data, and display the results from a live API.

---

## **Step 1: Understanding the CORE API**

Before we start coding, let’s understand what the CORE API does and how we’ll use it in our app.

- **What is CORE API**: The CORE API provides access to a large repository of open-access research papers. We’ll use the API to search for papers based on user input and retrieve metadata such as title, authors, abstract, and links to full-text articles.

- **Documentation**: You can explore the official documentation [here](https://core.ac.uk/services#api). We’ll be using the **articles search endpoint**, which allows us to search for research papers by keyword.

---

### **Step 2: Get an API Key**

1. **Sign up for the CORE API**:
   - Go to the [CORE API page](https://core.ac.uk/services#api) and sign up for a free API key.
   - After signing up, you’ll receive an API key that will be used to authenticate requests to the API.

2. **Save Your API Key**:
   - Store your API key in a safe place, as you’ll need to use it in the app. In real-world projects, never hardcode your API keys directly in the code that is pushed to GitHub or deployed.

---

### **Step 3: Installing Axios**

We’ll use **Axios** to make HTTP requests in our React app. While React has built-in tools for making requests (like `fetch`), **Axios** is often preferred because of its cleaner syntax and better error handling.

#### **Why Axios?**
- Axios simplifies HTTP requests.
- It has automatic transformation of JSON data.
- It supports request/response interceptors, making it more customizable than the native `fetch`.

#### **Steps to Install Axios**:
1. In your terminal, navigate to your project folder and run:
   ```bash
   npm install axios
   ```
   This will add Axios to your project dependencies.

2. Import Axios in your `SearchForm` component:
   ```javascript
   import axios from 'axios';
   ```

---

### **Step 4: Fetching Data from the CORE API**

Now that Axios is installed, let’s update the form submission to fetch real data from the CORE API.

---

#### **Steps to Make an API Request**:

1. **Update the `handleSubmit` function** to fetch data:
   ```jsx
   function SearchForm() {
     const [query, setQuery] = useState('');
     const [results, setResults] = useState([]);
     const [error, setError] = useState(null);
     const [loading, setLoading] = useState(false);

     const API_KEY = 'YOUR_API_KEY'; // Replace with your CORE API key

     const handleInputChange = (e) => {
       setQuery(e.target.value);
     };

     const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true);  // Start loading
       setError(null);    // Clear any previous errors

       try {
         const response = await axios.get(
           `https://core.ac.uk:443/api-v2/articles/search/${query}?apiKey=${API_KEY}`
         );
         setResults(response.data.data);  // Assuming response.data.data contains the search results
       } catch (error) {
         setError('Failed to fetch results. Please try again.');
       } finally {
         setLoading(false);  // Stop loading once the request is done
       }
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

         {loading && <p>Loading...</p>}  {/* Show loading spinner */}
         {error && <p>{error}</p>}       {/* Show error message if there's an error */}

         {/* Render the search results */}
         <ul>
           {results.map((result) => (
             <li key={result.id}>
               <h3>{result.title}</h3>
               <p>{result.description}</p>
               <a href={result.downloadUrl} target="_blank" rel="noopener noreferrer">
                 Full Text
               </a>
             </li>
           ))}
         </ul>
       </div>
     );
   }
   ```

---

### **Explanation**:

1. **Managing State**:
   - We introduce two additional pieces of state:
     - `loading`: To show a loading spinner while waiting for the API response.
     - `error`: To handle errors, such as network issues or bad requests.

2. **The `handleSubmit` Function**:
   - We make an HTTP GET request to the CORE API using **Axios** inside the `handleSubmit` function.
   - The URL uses **template literals** (`${query}`) to insert the user's search term into the API request URL.
   - If the request is successful, we store the results in the `results` state using `setResults()`.
   - If the request fails, we catch the error and display an error message by setting the `error` state.

3. **Error Handling**:
   - If an error occurs (e.g., network failure or invalid API key), we display an error message to the user using the `error` state.
   - **Why It's Important**: Handling errors gracefully is a key part of building robust production applications. You never want your app to crash silently or provide poor user feedback if something goes wrong.

4. **Loading State**:
   - We use the `loading` state to show a "Loading..." message while the API call is being made.
   - **Why It's Important**: Providing feedback to users while waiting for data improves the user experience, especially when dealing with slower network conditions or large datasets.

5. **Displaying the Results**:
   - We map over the `results` array and render a list of research papers. Each list item includes the title, description, and a link to the full-text article.

---

### **Step 5: Testing the API Integration**

1. **Run the Application**:
   - Start your React app by running:
     ```bash
     npm start
     ```
   - You should now be able to search for research papers. If everything works correctly, you’ll see real search results from the CORE API displayed in your app.

2. **Check the Console for Errors**:
   - If there are issues with the API key or the request, check your browser’s developer console for error messages. If the request fails, ensure that your API key is correctly set and that the query is valid.

---

### **Step 6: Best Practices for Handling API Keys in Production**

#### **Why This Is Important**:
When deploying applications, it’s critical not to hardcode sensitive information like API keys directly into your codebase. This can lead to security issues, especially if your project is stored in a public GitHub repository.

#### **Best Practices**:

1. **Use Environment Variables**:
   - Instead of hardcoding the API key directly in your code, use environment variables to store sensitive data.
   - **How to Do This**:
     - Create a `.env` file in the root of your project and add your API key like this:
       ```bash
       REACT_APP_CORE_API_KEY=your_api_key_here
       ```
     - Then, in your `App.js` or `SearchForm.js` file, access the API key like this:
       ```javascript
       const API_KEY = process.env.REACT_APP_CORE_API_KEY;
       ```
   - **Why It's Important**: Environment variables keep sensitive data out of your source code and make it easier to change settings when deploying to different environments (e.g., staging, production).

2. **Never Push API Keys to GitHub**:
   - Add `.env` to your `.gitignore` file to ensure your environment variables are not pushed to version control.
   - If using GitHub or other public repositories, **always** ensure that your API keys are not exposed.

---

### **Step 7: Generalizing These Concepts for Other APIs**

The patterns used to integrate the CORE API can be generalized to other APIs in various types of applications:

1. **API Integration**:
   - Whether fetching movie data, weather information, or financial data, the process of making HTTP requests using Axios or `fetch` is consistent across applications. The same principles apply: make the request, handle loading and errors, and render the results.

2. **Handling State**:
   - Using `useState` to manage loading, error, and data states is a common React pattern when working with APIs. This structure can be reused for any form of data fetching, from user login requests to complex dashboards with real-time data.

3. **Error Handling**:
   - Whether you’re dealing with form submissions or external API requests, error handling is crucial for building reliable applications. Learning how to catch errors and give user-friendly feedback is essential for creating production-ready apps.

4. **Environment Variables**:
   - Using environment variables is a best practice for managing sensitive data (like API keys) in any application. This applies to any API-based app, including those fetching data for e-commerce, social media, or financial services.

---

### **Next Steps**

In the next lesson, we’ll break down our app into **reusable components**

 and clean up the code structure, which will help keep our app organized and scalable as we add more features.

Let me know if you're ready to move on to **Lesson 4: Creating Reusable Components for Results** or if you have any questions about this part of the lesson!