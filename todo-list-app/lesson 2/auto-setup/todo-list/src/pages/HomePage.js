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
