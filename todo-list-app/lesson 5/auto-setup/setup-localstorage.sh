# Define the project root directory relative to this script's location
PROJECT_ROOT_DIR="todo-list"

# Check if the project directory exists
if [ ! -d "$PROJECT_ROOT_DIR" ]; then
  echo "Project directory '$PROJECT_ROOT_DIR' does not exist. Please make sure you have run the setup scripts from the previous lessons."
  exit 1
fi

# Navigate to the project directory
cd "$PROJECT_ROOT_DIR" || exit

# Step 1: Update HomePage.js to use localStorage and add the remove feature
cat <<EOL > src/pages/HomePage.js
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
EOL

# Step 2: Update TodoList.js to include the remove button
cat <<EOL > src/components/TodoList.js
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
EOL

# Print success message
echo "Lesson 5 setup completed! The HomePage component now uses localStorage, and the TodoList component includes a remove button for each to-do item."

npm start