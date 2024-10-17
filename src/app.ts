import express, { Application } from 'express';
import dotenv from 'dotenv';
import ticketRoutes from './routes/ticketRoutes';
import {auth} from 'express-oauth2-jwt-bearer';

dotenv.config();

const app : Application = express();

// const jwtCheck = auth({
//     audience: 'https://web2-lab1-87jt.onrender.com',
//     issuerBaseURL: 'https://dev-1xw25n8drb5r4asm.eu.auth0.com/',
//     tokenSigningAlg: 'RS256'
//   });
  
// app.use(jwtCheck);

app.use(express.json()); // Middleware to parse JSON

// app.get('/authorized', function (req, res) {
//     res.send('Secured Resource');
// });

app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;