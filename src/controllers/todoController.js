"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoById = exports.getAllTodos = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const TODOS_FILE_PATH = path_1.default.join(__dirname, '../data/todos.json');
function readTodosFromFile() {
    const todosData = fs_1.default.readFileSync(TODOS_FILE_PATH, 'utf-8');
    return JSON.parse(todosData);
}
function writeTodosToFile(todos) {
    fs_1.default.writeFileSync(TODOS_FILE_PATH, JSON.stringify(todos, null, 2));
}
const getAllTodos = (req, res) => {
    const todos = readTodosFromFile();
    res.json(todos);
};
exports.getAllTodos = getAllTodos;
const getTodoById = (req, res) => {
    const todos = readTodosFromFile();
    const todo = todos.find(todo => todo.id === req.params.id);
    if (todo) {
        res.json(todo);
    }
    else {
        res.status(404).json({ message: 'Todo not found' });
    }
};
exports.getTodoById = getTodoById;
const createTodo = (req, res) => {
    const { description } = req.body;
    const newTodo = {
        id: (0, uuid_1.v4)(),
        description,
        completed: false
    };
    const todos = readTodosFromFile();
    todos.push(newTodo);
    writeTodosToFile(todos);
    res.status(201).json(newTodo);
};
exports.createTodo = createTodo;
const updateTodo = (req, res) => {
    const { description, completed } = req.body;
    const todos = readTodosFromFile();
    const index = todos.findIndex(todo => todo.id === req.params.id);
    if (index !== -1) {
        todos[index].description = description;
        todos[index].completed = completed;
        writeTodosToFile(todos);
        res.json(todos[index]);
    }
    else {
        res.status(404).json({ message: 'Todo not found' });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const todos = readTodosFromFile();
    const index = todos.findIndex(todo => todo.id === req.params.id);
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1)[0];
        writeTodosToFile(todos);
        res.json(deletedTodo);
    }
    else {
        res.status(404).json({ message: 'Todo not found' });
    }
};
exports.deleteTodo = deleteTodo;
