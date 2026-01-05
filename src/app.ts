import express, { Request, Response } from "express";
import { PostRoutes } from "./modules/routes";


const app = express();

app.use(express.json());

// happiness message : api 
app.use("/api/happinessMessage", PostRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("darkstone server done");
});


export default app;
