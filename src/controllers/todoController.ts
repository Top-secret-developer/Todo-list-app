import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { Todo } from '../models/todoModel';

//importing our json files
const TODOS_FILE_PATH = path.join(__dirname, '../data/todos.json');

//reading files in jsom
function readTodosFromFile(): Todo[] {
  const todosData = fs.readFileSync(TODOS_FILE_PATH, 'utf-8');
  return JSON.parse(todosData);
}

//writing files in json
function writeTodosToFile(todos: Todo[]): void {
  fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify(todos, null, 2));
}

//getAllTodos
export const getAllTodos = (req: Request, res: Response): void => {
  const todos = readTodosFromFile();
  res.json(todos);
};
//getting Todo by a unique Id
export const getTodoById = (req: Request, res: Response): void => {
  const todos = readTodosFromFile();
  res.json(todos);
};

// creating 
export const createTodo = (req: Request, res: Response): void => {
  const { description } = req.body;
  const newTodo: Todo = {
    id: uuidv4(),
    description,
    completed: false
  };
  const todos = readTodosFromFile();
  todos.push(newTodo);
  writeTodosToFile(todos);
  res.status(201).json(newTodo);
};

export const updateTodo = (req: Request, res: Response): void => {
  const { description, completed } = req.body;
  const todos = readTodosFromFile();
  const index = todos.findIndex(todo => todo.id === req.params.id);
  if (index !== -1) {
    todos[index].description = description;
    todos[index].completed = completed;
    writeTodosToFile(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};


export const deleteTodo = (req: Request, res: Response): void => {
  const todos = readTodosFromFile();
  const index = todos.findIndex(todo => todo.id === req.params.id);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1)[0];
    writeTodosToFile(todos);
    res.json(deletedTodo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};
