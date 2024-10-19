import express, { Application, Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import ticketRoutes from "./routes/ticketRoutes";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config();

// const jwt = require("express-jwt");

const app: Application = express();

const jwtCheck = auth({
    audience: 'https://web2-lab1-87jt.onrender.com',
    issuerBaseURL: 'https://dev-1xw25n8drb5r4asm.eu.auth0.com/',
  });

// const jwtCheck = jwt({
//   secret: getPublicKey(process.env.AUTH0_DOMAIN),
//   audience: process.env.RESOURCE_SERVER,
//   algorithms: ["RS256"],
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
// });

app.use(jwtCheck);

app.use(express.json()); // Middleware to parse JSON

// app.get('/authorized', function (req, res) {
//     res.send('Secured Resource');
// });

app.use("/", ticketRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    if (err.status === 401) {
      res.status(401).json({ message: err.message });
    }
    else{
        res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
  else{
    next(err);
  }
  
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
