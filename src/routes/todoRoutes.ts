import express from 'express';
import { getAllTodos, createTodo, deleteTodo, updateTodo } from '../controllers/todoController';

const router = express.Router();

router.get('/todos', getAllTodos);
router.post('/todos', createTodo);
router.delete('/todos/:id', deleteTodo);
router.put('/todos/:id', updateTodo);

export default router;
