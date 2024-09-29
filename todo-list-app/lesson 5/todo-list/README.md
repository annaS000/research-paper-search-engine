### **Lesson 5: Adding Local Storage to Persist To-Do Items**

In this lesson, we’ll enhance our to-do list application by adding data persistence using the browser’s local storage. This will allow users to refresh the page or close and reopen the browser without losing their to-do list. We will modify the `HomePage` component to store and retrieve the to-do items using the `localStorage` API.

### **Objectives of This Lesson:**
- Utilize `localStorage` to persist to-do items.
- Load stored to-do items from `localStorage` when the app initializes.
- Update `localStorage` whenever the to-do list changes.

### **Steps:**

#### **Step 1: Update the `HomePage.js` Component to Use Local Storage**
1. Open `HomePage.js` in the `src/pages/` folder.
2. Modify the component to include the use of `localStorage`:
   ```javascript
   import React, { useState, useEffect } from 'react';
   import TodoList from '../components/TodoList';
   import AddTodo from '../components/AddTodo';

   const HomePage = () => {
     // Load to-dos from local storage or initialize to an empty array
     const [todos, setTodos] = useState(() => {
       const savedTodos = localStorage.getItem('todos');
       return savedTodos ? JSON.parse(savedTodos) : [];
     });

     // Update local storage whenever the 'todos' state changes
     useEffect(() => {
       localStorage.setItem('todos', JSON.stringify(todos));
     }, [todos]);

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
         
         {/* Use the AddTodo component */}
         <AddTodo addTodo={addTodo} />

         {/* Use the TodoList component */}
         <TodoList todos={todos} toggleTodo={toggleTodo} />
       </div>
     );
   };

   export default HomePage;
   ```

3. **Explanation of Code:**
   - **Loading from `localStorage`:** 
     - The `useState` hook’s initializer function checks `localStorage` for any saved to-do items. It uses `JSON.parse()` to convert the stored JSON string back into an array. If there’s nothing in `localStorage`, it initializes `todos` as an empty array.
   - **Saving to `localStorage`:** 
     - The `useEffect` hook listens for changes to the `todos` state. Whenever `todos` changes, it updates the `localStorage` by converting the array to a JSON string using `JSON.stringify()`.
   - **Persisting State:** This setup ensures that to-do items are saved to and loaded from `localStorage`, providing persistence across page reloads.

#### **Step 2: Test the App**
- Save all changes and run the app using:
  ```bash
  npm start
  ```
- **Verify:** Add a few to-do items, then refresh the page. The to-do items should persist across reloads.

### **Step 3: Discuss Data Persistence and `localStorage`**
- **Data Persistence:** By storing data in `localStorage`, the to-do list is now persistent across page reloads. This is a simple and effective way to add persistence to client-side applications.
- **Limitations of `localStorage`:** 
  - Storage size is limited (usually around 5MB per domain).
  - Data is stored as strings, requiring serialization (e.g., `JSON.stringify`) and deserialization (e.g., `JSON.parse`).
  - Data is stored locally in the browser, so it’s not accessible from other devices or sessions.

### **Final Notes for This Lesson:**
- **Understanding Effects:** This lesson demonstrates how to use the `useEffect` hook to run side effects (saving data to `localStorage`) in response to changes in state.
- **Next Step:** In future lessons, we can explore more robust data persistence methods, such as using a backend API with a database.

### **Try It Out:**
- Add a few to-do items and then refresh the page to see if they persist.
- Remove or mark some items as completed, then refresh the page again to check if the state is retained.

### **Links for Further Reading:**
- [Using the Effect Hook (`useEffect`)](https://reactjs.org/docs/hooks-effect.html)
- [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### **Ready for Automation?**
If you’d like, I can write a script to automate these changes in the next step! Let me know if you're ready for the script.