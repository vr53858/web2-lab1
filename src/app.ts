import express, { Application } from 'express';
import dotenv from 'dotenv';
import { query } from './db/data';
import ticketRoutes from './routes/ticketRoutes';

dotenv.config();

const app : Application = express();
app.use(express.json()); // Middleware to parse JSON

// Routes
app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;