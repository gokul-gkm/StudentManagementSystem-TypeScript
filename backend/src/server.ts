import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './config/db';
import adminRoutes from './routes/adminRoutes';
import studentRoutes from './routes/studentRoutes';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;


database.connect();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;