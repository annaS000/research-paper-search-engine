#!/bin/bash

# Define the project root directory relative to this script's location
PROJECT_ROOT_DIR="todo-list"

# Check if the project directory exists
if [ ! -d "$PROJECT_ROOT_DIR" ]; then
  echo "Project directory '$PROJECT_ROOT_DIR' does not exist. Please make sure you have run the setup script from Lesson 1."
  exit 1
fi

# Navigate to the project directory
cd "$PROJECT_ROOT_DIR" || exit

# Step 1: Create HomePage.js in the 'src/pages/' directory
mkdir -p src/pages
cat <<EOL > src/pages/HomePage.js
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
EOL

# Step 2: Update App.js to render HomePage
cat <<EOL > src/App.js
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
EOL

# Print success message
echo "Lesson 2 setup completed! The HomePage component has been created, with placeholder usage for addTodo and toggleTodo functions, and is now rendered in App.js."

# Navigate to project directory
cd $PROJECT_ROOT_DIR || exit

npm start