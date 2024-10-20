import express, {
  Application,
  Express,
  Request,
  Response,
  NextFunction,
} from "express";
import dotenv from "dotenv";
import ticketRoutes from "./routes/ticketRoutes";
import { auth } from "express-oauth2-jwt-bearer";
import https from "https";
import fs from "fs";

dotenv.config();

const app: Application = express();

const jwtCheck = auth({
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  audience: process.env.RESOURCE_SERVER,
});

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
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  } else {
    next(err);
  }
});

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port =
  externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 8000;
// app.listen(port, () => console.log(`Server running on port ${port}`));

if (externalUrl) {
  const hostname = "0.0.0.0"; //ne 127.0.0.1
  app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}/ and from
  outside on ${externalUrl}`);
  });
} else {
  https
    .createServer(
      {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert"),
      },
      app
    )
    .listen(port, function () {
      console.log(`Server running at https://localhost:${port}/`);
    });
}

export default app;
