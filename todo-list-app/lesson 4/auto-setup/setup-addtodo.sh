# Define the project root directory relative to this script's location
PROJECT_ROOT_DIR="todo-list"

# Check if the project directory exists
if [ ! -d "$PROJECT_ROOT_DIR" ]; then
  echo "Project directory '$PROJECT_ROOT_DIR' does not exist. Please make sure you have run the setup scripts from the previous lessons."
  exit 1
fi

# Navigate to the project directory
cd "$PROJECT_ROOT_DIR" || exit

# Step 1: Create AddTodo.js in the 'src/components/' directory
mkdir -p src/components
cat <<EOL > src/components/AddTodo.js
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
EOL

# Step 2: Update HomePage.js to use the AddTodo component
cat <<EOL > src/pages/HomePage.js
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
EOL

# Print success message
echo "Lesson 4 setup completed! The AddTodo component has been created, and HomePage.js has been updated to use it."

npm start