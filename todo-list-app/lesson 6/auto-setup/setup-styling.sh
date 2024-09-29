# Define the project root directory relative to this script's location
PROJECT_ROOT_DIR="todo-list"

# Check if the project directory exists
if [ ! -d "$PROJECT_ROOT_DIR" ]; then
  echo "Project directory '$PROJECT_ROOT_DIR' does not exist. Please make sure you have run the setup scripts from the previous lessons."
  exit 1
fi

# Navigate to the project directory
cd "$PROJECT_ROOT_DIR" || exit

# Step 1: Install Material-UI
echo "Installing Material-UI..."
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# Step 2: Update AddTodo.js to use Material-UI components
cat <<EOL > src/components/AddTodo.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const AddTodo = ({

 addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

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
EOL

# Step 3: Update TodoList.js to use Material-UI components
cat <<EOL > src/components/TodoList.js
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
EOL

# Step 4: Create styles.css for custom styling
cat <<EOL > src/styles.css
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
EOL

# Step 5: Update HomePage.js to use the new styles
cat <<EOL > src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import '../styles.css';

const HomePage = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text: text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    </div>
  );
};

export default HomePage;
EOL

# Print success message
echo "Lesson 6 setup completed! The app now uses Material-UI components and custom styles for a modern and responsive UI."

npm start