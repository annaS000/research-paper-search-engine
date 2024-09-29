### **Lesson 6: Styling the To-Do List with Material-UI (MUI) and Custom CSS**

In this lesson, we will:
- Install Material-UI in the project.
- Replace basic HTML elements with Material-UI components (`Button`, `TextField`, etc.).
- Create a custom stylesheet to add extra styling.

### **Objectives of This Lesson:**
- Install Material-UI in the project.
- Use Material-UI components to enhance the UI.
- Create and apply a custom CSS file for further UI customization.

### **Steps:**

#### **Step 1: Install Material-UI**
1. Open your terminal in the project's root directory.
2. Install Material-UI:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
   ```

#### **Step 2: Update `AddTodo.js` to Use Material-UI Components**
1. Open `AddTodo.js` in the `src/components/` folder.
2. Replace the current input and button with Material-UI’s `TextField` and `Button` components:
   ```javascript
   import React, { useState } from 'react';
   import { TextField, Button } from '@mui/material';

   const AddTodo = ({ addTodo }) => {
     const [inputValue, setInputValue] = useState('');

     // Handle input change
     const handleChange = (e) => {
       setInputValue(e.target.value);
     };

     // Handle form submission
     const handleSubmit = (e) => {
       e.preventDefault();
       if (inputValue.trim()) {
         addTodo(inputValue);
         setInputValue('');
       }
     };

     return (
       <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
         <TextField
           variant="outlined"
           size="small"
           label="Add a new task"
           value={inputValue}
           onChange={handleChange}
           fullWidth
         />
         <Button type="submit" variant="contained" color="primary">
           Add
         </Button>
       </form>
     );
   };

   export default AddTodo;
   ```

3. **Explanation of Code:**
   - **`TextField`:** A Material-UI input component with an "outlined" variant to create a modern look. Uses `label` for a floating label effect.
   - **`Button`:** A Material-UI button with a "contained" variant and "primary" color, styled to match modern UI patterns.
   - **Inline Styling:** Adds a simple inline `style` for the form to create spacing between elements.

#### **Step 3: Update `TodoList.js` to Use Material-UI Components**
1. Open `TodoList.js` in the `src/components/` folder.
2. Replace the current list items with Material-UI components:
   ```javascript
   import React from 'react';
   import { List, ListItem, ListItemText, IconButton } from '@mui/material';
   import DeleteIcon from '@mui/icons-material/Delete';

   const TodoList = ({ todos, toggleTodo, removeTodo }) => {
     return (
       <List>
         {todos.map((todo) => (
           <ListItem
             key={todo.id}
             secondaryAction={
               <IconButton edge="end" onClick={() => removeTodo(todo.id)}>
                 <DeleteIcon />
               </IconButton>
             }
           >
             <ListItemText
               primary={todo.text}
               onClick={() => toggleTodo(todo.id)}
               style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
             />
           </ListItem>
         ))}
       </List>
     );
   };

   export default TodoList;
   ```

3. **Explanation of Code:**
   - **`List`, `ListItem`, `ListItemText`:** Material-UI components for creating accessible, modern list items.
   - **`IconButton` and `DeleteIcon`:** Adds a delete button using Material-UI's icon and button components, providing a clean and intuitive way to remove items.
   - **Styling:** Adds a pointer cursor and strikethrough effect on the `ListItemText` when items are marked as completed.

#### **Step 4: Add a Custom CSS File for Additional Styling**
1. Create a new file named `styles.css` in the `src/` directory.
2. Add some global styles and customizations:
   ```css
   /* src/styles.css */
   body {
     font-family: 'Roboto', sans-serif;
     background-color: #f5f5f5;
     margin: 0;
     padding: 20px;
   }

   .todo-container {
     max-width: 600px;
     margin: 0 auto;
     background: #fff;
     padding: 20px;
     border-radius: 8px;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   }
   ```

#### **Step 5: Apply the Custom Styles in `HomePage.js`**
1. Open `HomePage.js` and import the new CSS file. Apply the `todo-container` class to the main container:
   ```javascript
   import React, { useState, useEffect } from 'react';
   import TodoList from '../components/TodoList';
   import AddTodo from '../components/AddTodo';
   import '../styles.css';

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
       <div className="todo-container">
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

3. **Explanation of Code:**
   - **Importing CSS:** Imports the `styles.css` file to apply global styles.
   - **`todo-container` Class:** Wraps the main content in a styled container for a centered and clean UI.

#### **Step 6: Test the App**
- Save all changes and run the app using:
  ```bash
  npm start
  ```
- **Verify:** Check the UI. The form, to-do list, and buttons should now use Material-UI components, providing a modern and responsive look.

### **Importance of Modern, Responsive UIs:**
- **User Experience:** A clean and responsive UI ensures a positive user experience, increasing user engagement and satisfaction.
- **Consistency:** Using component libraries like Material-UI provides a consistent look and feel across different parts of the application.
- **Accessibility:** Material-UI components are built with accessibility in mind, making it easier to create inclusive applications.
