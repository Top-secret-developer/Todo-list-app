import { Request, Response } from 'express';
import { db } from '../database/db';

export const getAllTodos = (req: Request, res: Response) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      console.error('Error fetching todos:', err);
      res.status(500).send('Error fetching todos');
      return;
    }
    res.json(results);
  });
};

export const createTodo = (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).send('Text is required');
    return;
  }

  db.query('INSERT INTO todos (text) VALUES (?)', [text], (err, result) => {
    if (err) {
      console.error('Error creating todo:', err);
      res.status(500).send('Error creating todo');
      return;
    }
    res.status(201).send('Todo created successfully');
  });
};

export const deleteTodo = (req: Request, res: Response) => {
  const id = req.params.id;

  db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting todo:', err);
      res.status(500).send('Error deleting todo');
      return;
    }
    res.status(200).send('Todo deleted successfully');
  });
};

export const updateTodo = (req: Request, res: Response) => {
  const id = req.params.id;
  const { text } = req.body;
  if (!text) {
    res.status(400).send('Text is required');
    return;
  }

  db.query('UPDATE todos SET text = ? WHERE id = ?', [text, id], (err, result) => {
    if (err) {
      console.error('Error updating todo:', err);
      res.status(500).send('Error updating todo');
      return;
    }
    res.status(200).send('Todo updated successfully');
  });
};
