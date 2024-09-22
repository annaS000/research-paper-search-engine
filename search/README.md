# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Great! Let's dive into **Lesson 2: Building the Search Functionality** in detail. This is a critical part of our application where users can type in a keyword or phrase, and we'll eventually use this input to fetch results from the CORE API. However, for now, we'll build the search form, manage the state of the input, and simulate the display of search results. This lesson will introduce important React concepts that can be applied to various types of applications.

---

## **Lesson 2: Building the Search Functionality**

### **Step 1: Create a Simple Search Form**

#### **Why This Is Important:**
In almost every application, users interact with forms to input data. Whether it's a search bar, login form, or registration page, understanding how forms work in React is essential. In React, we manage form input through **controlled components**, which means the value of the input is controlled by the state.

---

#### **Steps to Implement the Search Form**:

1. **Open your project folder** (where we initialized the React app).
   
2. **Navigate to the `src` directory** and open `App.js`.

3. **Remove the boilerplate code** from the default `App.js` file and create a new functional component:
   ```jsx
   import React, { useState } from 'react';

   function App() {
     return (
       <div className="App">
         <h1>Research Paper Search Engine</h1>
         <SearchForm />
       </div>
     );
   }

   export default App;
   ```

4. **Create a new component for the search form** inside `App.js` or in a separate file. Here, we'll keep it in the same file for simplicity:
   ```jsx
   function SearchForm() {
     const [query, setQuery] = useState('');

     const handleInputChange = (e) => {
       setQuery(e.target.value);
     };

     const handleSubmit = (e) => {
       e.preventDefault();
       console.log('Search Query:', query);
     };

     return (
       <form onSubmit={handleSubmit}>
         <input
           type="text"
           placeholder="Search for research papers"
           value={query}
           onChange={handleInputChange}
         />
         <button type="submit">Search</button>
       </form>
     );
   }
   ```

---

### **Explanation**:

1. **The `SearchForm` Component**:
   - We define the `SearchForm` component where the user will input their search query.
   
2. **State Management with `useState`**:
   - We are using the `useState` hook to manage the search input.
   - `const [query, setQuery] = useState('');` creates a state variable `query` that stores the input value, and `setQuery` is a function that updates it.
   - **Why It's Important**: In React, components manage their own state, and any user input should update the state so the component can respond accordingly. You can read more about **useState** in the official documentation [here](https://reactjs.org/docs/hooks-state.html).

3. **Handling User Input**:
   - We create a `handleInputChange` function that updates the `query` state every time the user types something in the input field. This makes our input a **controlled component**.
   - **Why It's Important**: Controlled components allow us to keep the UI and state in sync. This pattern can be reused in forms for login, registration, and other user inputs.

4. **Handling Form Submission**:
   - We create a `handleSubmit` function that prevents the default form submission behavior (which would refresh the page) using `e.preventDefault()`. Instead, we log the query to the console.
   - **Why It's Important**: Preventing the default behavior is common when handling forms in React so you can process the data in the background (e.g., making an API call).

#### **Run the App**:
If you run the app (`npm start`), you should now see a simple form with a search input and a button. When you type something and click "Search", it will log the search term to the console.

---

### **Step 2: Manage Form State and Display the Input**

#### **Why This Is Important**:
Managing form state and rendering dynamic content are fundamental to React development. Understanding how to update and display the state allows you to handle user input in real-time and respond dynamically. This concept is generalizable to any type of form-based interaction in applications (e.g., user registration, comments, etc.).

---

#### **Steps to Display the Search Query**:

1. **Update the `SearchForm` component** to show the current search query below the form:
   ```jsx
   function SearchForm() {
     const [query, setQuery] = useState('');

     const handleInputChange = (e) => {
       setQuery(e.target.value);
     };

     const handleSubmit = (e) => {
       e.preventDefault();
       console.log('Search Query:', query);
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
         {/* Display the query below */}
         <p>Your search query: {query}</p>
       </div>
     );
   }
   ```

#### **Explanation**:
- We simply render the current value of the `query` state in a paragraph element (`<p>Your search query: {query}</p>`). This shows real-time updates as the user types.
- **Why It's Important**: Displaying dynamic content based on the component’s state is a core concept in React. Any UI element (like charts, lists, or forms) can be updated based on state changes, which is widely applicable in real-world apps.

---

### **Step 3: Simulating Search Results**

#### **Why This Is Important**:
Before we integrate the API, it's important to understand how to handle lists of data and display them in the UI. By simulating search results, we’ll practice rendering lists of items, which is a key React pattern applicable in many apps (e.g., displaying a list of users, comments, products, etc.).

---

#### **Steps to Simulate Search Results**:

1. **Simulate some search result data** in the `SearchForm` component:
   ```jsx
   const mockResults = [
     { id: 1, title: 'Understanding Quantum Computing' },
     { id: 2, title: 'Advances in Machine Learning' },
     { id: 3, title: 'The Impact of Climate Change on Agriculture' },
   ];
   ```

2. **Render the results based on the mock data**:
   ```jsx
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
   ```

#### **Explanation**:
1. **Simulating Data**:
   - We simulate some research paper data with `mockResults`. This could represent the response from an API in a real-world scenario.
   - **Why It's Important**: Working with lists of data and rendering them using the `.map()` method is a fundamental React skill. Whether you're displaying products in an e-commerce app, comments in a blog, or users in an admin panel, the pattern is the same.

2. **Rendering Lists**:
   - We render a list of items using `.map()`. Each list item needs a unique `key` (in this case, the `id`) to help React efficiently update the UI.
   - **Why It's Important**: Providing keys when rendering lists helps React optimize updates to the DOM. Without keys, React cannot easily determine which items have changed, potentially leading to performance issues in larger apps. Learn more about **keys** in React [here](https://reactjs.org/docs/lists-and-keys.html).

---

### **Step 4: Next Steps**

At this point, you’ve built the basic structure of the search form and simulated search results. The next step is to replace the mock data with real results by integrating the **CORE API**, which we’ll cover in **Lesson 3**.

---

## **Generalization of These Concepts:**
1. **Forms and State Management**:
   - In any app where users input data (e.g., sign-up forms, search bars, or comment sections), you'll use similar patterns with controlled components, state management, and form submission handling.

2. **Rendering Lists**:
   - Whether you're displaying search results, a list of products, or a feed of posts, the pattern of using `.map()` to render arrays of data is universal across React applications.

3. **State Hooks**:
   - Managing local component state with `useState` is applicable to

 nearly every interactive element in a React app, whether it's input fields, modals, or data fetched from an API.

If you'd like to dive deeper into **React Forms** and **Controlled Components**, you can check the official React documentation [here](https://reactjs.org/docs/forms.html).