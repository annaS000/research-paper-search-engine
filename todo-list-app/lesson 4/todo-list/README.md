### **Lesson 4: Creating the `AddTodo` Component**

In this lesson, we'll create the `AddTodo` component, which will contain an input field and a button to allow users to add new items to the to-do list. We will handle user input, utilize state management within the component, and pass the input data back to the parent component (`HomePage`) using a callback function.

### **Objectives of This Lesson:**
- Create the `AddTodo` component in the `components/` folder.
- Implement state management within `AddTodo` to handle user input.
- Pass the user input back to the `HomePage` component using a callback function.
- Integrate the `AddTodo` component into `HomePage`.

### **Steps:**

#### **Step 1: Create the `AddTodo.js` Component**
1. Navigate to the `src/components/` folder.
2. Create a new file named `AddTodo.js`.
3. Open `AddTodo.js` and define the component:
   ```javascript
   import React, { useState } from 'react';

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
       <form onSubmit={handleSubmit}>
         <input
           type="text"
           value={inputValue}
           onChange={handleChange}
           placeholder="Add a new task"
         />
         <button type="submit">Add</button>
       </form>
     );
   };

   export default AddTodo;
   ```

4. **Explanation of Code:**
   - **State Management:** Uses `useState` to track the input value.
   - **`handleChange`:** Updates the `inputValue` state whenever the input field changes.
   - **`handleSubmit`:** Prevents the default form submission, checks if the input is not empty, and then calls the `addTodo` function passed from the parent component (`HomePage`) to add a new item to the to-do list. It then resets the input field.
   - **Form UI:** Renders a form with an input field for the to-do text and a button to submit the form.

#### **Step 2: Update `HomePage.js` to Use `AddTodo`**
1. Open `HomePage.js` in the `src/pages/` folder.
2. Modify the component to import and use the `AddTodo` component:
   ```javascript
   import React, { useState } from 'react';
   import TodoList from '../components/TodoList';
   import AddTodo from '../components/AddTodo';

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
   - **Importing `AddTodo`:** Imports the `AddTodo` component and includes it in the `HomePage` component's JSX.
   - **Passing `addTodo` as a Prop:** Passes the `addTodo` function to the `AddTodo` component, allowing `AddTodo` to add new items to the to-do list when the user submits the form.

#### **Step 3: Test the App**
- Save all changes and run the app using:
  ```bash
  npm start
  ```
- **Verify:** You should see:
  - A text input and "Add" button for adding new to-do items.
  - The to-do list updated with each new item added via the form.
  - The ability to toggle completion status by clicking on a to-do item.

### **Step 4: Discuss Data Flow and Component Communication**
- **Data Flow:** The `AddTodo` component captures user input and sends it to the `HomePage` component through the `addTodo` function passed as a prop.
- **Component Communication:** This illustrates how child components (`AddTodo`) can communicate with their parent (`HomePage`) using callback functions provided through props.

### **Final Notes for This Lesson:**
- **Understanding State:** This lesson reinforces the use of `useState` for managing form input within a component.
- **Data Communication:** Demonstrates how to use callback functions to facilitate communication between child and parent components in React.
- **Next Step:** Now that we have our basic "to-do list" functionality, future lessons can focus on refining the app (e.g., adding input validation, persisting data to a backend, or enhancing the UI).

### **Try It Out:**
- Add new to-do items using the input field and observe how the to-do list updates.
- Use the toggle feature in the list to mark items as completed.

### **Links for Further Reading:**
- [Handling Forms in React](https://reactjs.org/docs/forms.html)
- [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)