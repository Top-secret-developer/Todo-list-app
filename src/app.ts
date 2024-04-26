import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes';
const app = express();

app.use(bodyParser.json());

app.use('/todos', todoRoutes);

export default app;

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
