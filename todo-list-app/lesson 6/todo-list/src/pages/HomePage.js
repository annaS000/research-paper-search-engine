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
