# Define the project root directory relative to this script's location
PROJECT_ROOT_DIR="todo-list"

# Check if the project directory exists
if [ ! -d "$PROJECT_ROOT_DIR" ]; then
  echo "Project directory '$PROJECT_ROOT_DIR' does not exist. Please make sure you have run the setup scripts from the previous lessons."
  exit 1
fi

# Navigate to the project directory
cd "$PROJECT_ROOT_DIR" || exit

# Step 1: Create TodoList.js in the 'src/components/' directory
mkdir -p src/components
cat <<EOL > src/components/TodoList.js
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
EOL

# Step 2: Update HomePage.js to use the TodoList component
cat <<EOL > src/pages/HomePage.js
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
EOL

# Print success message
echo "Lesson 3 setup completed! The TodoList component has been created, and HomePage.js has been updated to use it."

npm start