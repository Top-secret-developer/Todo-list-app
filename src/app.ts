import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(todoRoutes);

console.log("my")

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

