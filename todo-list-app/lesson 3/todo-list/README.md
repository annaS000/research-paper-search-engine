### **Lesson 3: Creating the `TodoList` Component**

In this lesson, we will create the `TodoList` component to handle the rendering of to-do items. This component will receive data from its parent (`HomePage`) through props, displaying the list of to-do items and allowing interactions like toggling their completion status. 

By the end of this lesson, you’ll understand how to create reusable components that communicate with their parent using props and callback functions.

### **Objectives of This Lesson:**
- Create a `TodoList` component inside the `components/` folder.
- Render a list of to-do items passed as props from the `HomePage` component.
- Pass the `toggleTodo` function from the `HomePage` to allow for toggling the completion status of each to-do item.
- Refactor `HomePage.js` to use the `TodoList` component.

### **Steps:**

#### **Step 1: Create the `TodoList.js` Component**
1. Navigate to the `src/components/` folder.
2. Create a new file named `TodoList.js`.
3. Open `TodoList.js` and define the component:
   ```javascript
   import React from 'react';

   const TodoList = ({ todos, toggleTodo }) => {
     return (
       <ul>
         {todos.map((todo) => (
           <li
             key={todo.id}
             onClick={() => toggleTodo(todo.id)}
             style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
           >
             {todo.text}
           </li>
         ))}
       </ul>
     );
   };

   export default TodoList;
   ```

4. **Explanation of Code:**
   - **Props:** The `TodoList` component receives two props: `todos` (an array of to-do items) and `toggleTodo` (a function to toggle the completion status).
   - **Rendering the List:** The `map()` function iterates over the `todos` array to render each to-do item as an `<li>` element. Each list item:
     - Uses the `key` prop with the unique `todo.id` to help React identify each element.
     - Calls `toggleTodo(todo.id)` when clicked, allowing the item’s completion status to be toggled.
     - Applies a `style` that uses a strikethrough (`line-through`) if the to-do item is marked as completed.

#### **Step 2: Refactor `HomePage.js` to Use `TodoList`**
1. Open `HomePage.js` in the `src/pages/` folder.
2. Modify the component to import and use `TodoList`:
   ```javascript
   import React, { useState } from 'react';
   import TodoList from '../components/TodoList';

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
         
         {/* Use the TodoList component */}
         <TodoList todos={todos} toggleTodo={toggleTodo} />
       </div>
     );
   };

   export default HomePage;
   ```

3. **Explanation of Code:**
   - **Importing `TodoList`:** The `HomePage` component imports `TodoList` to use it for displaying the list of to-do items.
   - **Using Props:** Passes the `todos` array and `toggleTodo` function as props to `TodoList`. This enables the `TodoList` component to receive and render the list of to-do items and interact with the `toggleTodo` function to change their completion status.

#### **Step 3: Test the App**
- Save all changes and run the app using:
  ```bash
  npm start
  ```
- **Verify:** You should see:
  - The title "My To-Do List."
  - A button that adds a sample to-do when clicked.
  - The to-do items listed, with the ability to toggle their completion status by clicking on them.

#### **Step 4: Discuss the Flow of Data and Props**
- **Data Flow:** The `HomePage` component manages the state (`todos` array) and passes it down to `TodoList` through props. It also passes the `toggleTodo` function to allow interaction with the to-do items.
- **Inter-Component Communication:** This setup demonstrates how parent components can control the behavior of child components by passing data and functions via props.

### **Final Notes for This Lesson**
- **Reusable Components:** The `TodoList` component is now a reusable piece of UI that can display any list of to-do items and handle interactions passed from its parent.
- **Laying the Groundwork:** This setup is a foundation for building more complex interactions, such as adding new to-do items using a separate `AddTodo` component, which we'll handle in the next lesson.
- **Next Step:** In the next lesson, we'll create the `AddTodo` component to provide a form for adding new to-do items to the list.

### **Try It Out:**
- Click the "Add Sample To-Do" button and see the new item appear in the list.
- Click on any to-do item to toggle its completion status.

### **Links for Further Reading:**
- [React – Passing Data Through Props](https://reactjs.org/docs/components-and-props.html)
- [Lists and Keys in React](https://reactjs.org/docs/lists-and-keys.html)