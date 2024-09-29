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
