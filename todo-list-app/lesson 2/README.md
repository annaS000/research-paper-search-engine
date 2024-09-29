### Table of Contents
- [Lesson 2: Creating the Main Page Component (`HomePage.js`)](#lesson-2-creating-the-main-page-component-homepagejs)
  - [Objectives of This Lesson](#objectives-of-this-lesson)
  - [Steps](#steps)
    - [Step 1: Create the `HomePage.js` Component](#step-1-create-the-homepagejs-component)
    - [Step 2: Render `HomePage` in `App.js`](#step-2-render-homepage-in-appjs)
    - [Step 3: Discuss the Flow of Data and Props (Touch Lightly)](#step-3-discuss-the-flow-of-data-and-props-touch-lightly)
  - [Final Notes for This Lesson](#final-notes-for-this-lesson)
  - [Try It Out](#try-it-out)
  - [Links for Further Reading](#links-for-further-reading)

---

### **Lesson 2: Creating the Main Page Component (`HomePage.js`)**

In this updated lesson, we’ll modify the `HomePage.js` component to include simple placeholders for adding a to-do item and displaying the to-do list. This will ensure the functions `addTodo` and `toggleTodo` are used, avoiding any ESLint warnings. We will also discuss how these placeholders will be replaced with more comprehensive components in future lessons.

### **Objectives of This Lesson:**
- Create a `HomePage.js` component in the `pages/` folder.
- Implement state management using React's `useState` hook.
- Set up the `HomePage` component to include:
  - A button to add a sample to-do item using the `addTodo` function.
  - A list to display the to-do items and toggle their completion status using the `toggleTodo` function.

### **Steps:**

#### **Step 1: Create the `HomePage.js` Component**
1. Navigate to the `src/pages/` folder.
2. Create a new file named `HomePage.js`.
3. Open `HomePage.js` and define the functional component:
   ```javascript
   import React, { useState } from 'react';

   const HomePage = () => {
     // State to hold the list of to-do items
     const [todos, setTodos] = useState([]);

     // Function to add a new to-do item
     const addTodo = (text) => {
       const newTodo = { id: Date.now(), text: text, completed: false };
       setTodos([...todos, newTodo]);
     };

     // Function to toggle the completion status of a to-do item
     const toggleTodo = (id) => {
       const updatedTodos = todos.map((todo) =>
         todo.id === id ? { ...todo, completed: !todo.completed } : todo
       );
       setTodos(updatedTodos);
     };

     return (
       <div>
         <h1>My To-Do List</h1>
         {/* Placeholder for AddTodo component */}
         <button onClick={() => addTodo('Sample To-Do')}>Add Sample To-Do</button>
         
         {/* Placeholder for TodoList component */}
         <ul>
           {todos.map((todo) => (
             <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
               {todo.text} {todo.completed ? '(Completed)' : ''}
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default HomePage;
   ```

4. **Explanation of Code:**
   - **State Management with `useState`:** 
     - `const [todos, setTodos] = useState([]);` initializes the `todos` state as an empty array to hold the list of to-do items.
   - **`addTodo` Function:** Creates a new to-do item and adds it to the `todos` array using `setTodos`.
   - **`toggleTodo` Function:** Toggles the `completed` status of a to-do item by mapping over the `todos` array and updating the relevant item.
   - **Using Placeholders:**
     - A button (`<button>`) uses the `addTodo` function to add a sample to-do item to the list.
     - An unordered list (`<ul>`) displays the list of to-do items, using the `toggleTodo` function to mark items as completed when clicked.
   - **Why:** This setup ensures that both `addTodo` and `toggleTodo` are used to eliminate ESLint warnings.

#### **Step 2: Render `HomePage` in `App.js`**
1. Open `App.js` in the `src` folder.
2. Modify it to import and render the `HomePage` component:
   ```javascript
   import React from 'react';
   import HomePage from './pages/HomePage';

   const App = () => {
     return (
       <div className="App">
         <HomePage />
       </div>
     );
   };

   export default App;
   ```

3. **Explanation of Code:** 
   - Imports the `HomePage` component and renders it inside the main `App` component. When you run the app, you'll now see "My To-Do List," a button to add a sample to-do item, and a list of added to-do items.

#### **Step 3: Discuss the Flow of Data and Props (Touch Lightly)**
- **Current State:** The `HomePage` component currently manages the to-do list state using `useState`.
- **Future State:** In upcoming lessons, we will refactor this to include separate components (`AddTodo` and `TodoList`). We will pass functions (`addTodo`, `toggleTodo`) and state (`todos`) as props to these components to handle interactions and updates to the to-do list.
- **Why It's Important:** Understanding how to manage state and use it in various parts of the application is key to building interactive and maintainable React apps.

### **Final Notes for This Lesson:**
- **Understanding State:** This lesson demonstrates how to use `useState` to manage the list of to-do items and interact with them in the UI.
- **Laying the Groundwork:** While we've used placeholders in this lesson, we will soon introduce dedicated components to handle adding and listing to-do items more elegantly.
- **Next Step:** In the next lesson, we will create the `TodoList` component to organize the rendering logic for the list of to-do items.

### **Try It Out:**
- Save all changes and run the app using:
  ```bash
  npm start
  ```
- You should see:
  - The title "My To-Do List."
  - A button that adds a sample to-do when clicked.
  - A list that displays added to-do items, which can be clicked to toggle their completion status.

### **Links for Further Reading:**
- [React State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [React Hooks – `useState`](https://reactjs.org/docs/hooks-state.html)

---