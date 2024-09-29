### Table of Contents
- [Lesson 5: Adding Local Storage and Item Removal](#lesson-5-adding-local-storage-and-item-removal)
  - [Objectives of This Lesson](#objectives-of-this-lesson)
  - [Steps](#steps)
    - [Step 1: Update the `HomePage.js` Component](#step-1-update-the-homepagejs-component)
    - [Step 2: Update `TodoList.js` to Include the "Remove" Button](#step-2-update-todolistjs-to-include-the-remove-button)
    - [Step 3: Test the App](#step-3-test-the-app)

---

### **Lesson 5: Adding Local Storage and Item Removal**

In this lesson, we will:
- Use `localStorage` to persist to-do items.
- Add a "Remove" button to each to-do item to allow users to delete items from the list.

### **Objectives of This Lesson:**
- Utilize `localStorage` to persist to-do items.
- Load stored to-do items from `localStorage` when the app initializes.
- Update `localStorage` whenever the to-do list changes.
- Implement a way to remove to-do items from the list.

### **Steps:**

#### **Step 1: Update the `HomePage.js` Component**
1. Open `HomePage.js` in the `src/pages/` folder.
2. Modify the component to include the new "Remove" functionality:
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

     // Function to remove a to-do item
     const removeTodo = (id) => {
       const updatedTodos = todos.filter((todo) => todo.id !== id);
       setTodos(updatedTodos);
     };

     return (
       <div>
         <h1>My To-Do List</h1>
         
         {/* Use the AddTodo component */}
         <AddTodo addTodo={addTodo} />

         {/* Use the TodoList component */}
         <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
       </div>
     );
   };

   export default HomePage;
   ```

#### **Step 2: Update `TodoList.js` to Include the "Remove" Button**
1. Open `TodoList.js` in the `src/components/` folder.
2. Modify the component to include a "Remove" button for each to-do item:
   ```javascript
   import React from 'react';

   const TodoList = ({ todos, toggleTodo, removeTodo }) => {
     return (
       <ul>
         {todos.map((todo) => (
           <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
             <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
             <button onClick={() => removeTodo(todo.id)}>Remove</button>
           </li>
         ))}
       </ul>
     );
   };

   export default TodoList;
   ```

3. **Explanation of Code:**
   - **`removeTodo` in `HomePage.js`:** Adds a `removeTodo` function that filters out the to-do item with the specified `id`.
   - **"Remove" Button in `TodoList.js`:** Adds a button next to each to-do item that calls `removeTodo` to remove the item from the list.

#### **Step 3: Test the App**
- Save all changes and run the app using:
  ```bash
  npm start
  ```
- **Verify:** Add, toggle, and remove items from the list. Confirm that the to-do list persists across page reloads and that removed items do not reappear.

--- 