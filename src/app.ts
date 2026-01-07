import express, { Request, Response } from "express";
import { HappinessRoutes } from "./modules/happiness/happiness.routes";
import { AssetsRoutes } from "./modules/assets/assets.route";
import { AgreementRoutes } from "./modules/agreement/agreement.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors"

const app = express();


app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))



app.all("/api/auth/*splat", toNodeHandler(auth));


// happiness message : api
app.use("/api/happinessMessage", HappinessRoutes);

app.use("/api/assets", AssetsRoutes);

app.use("/api/agreement", AgreementRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("darkstone server done");
});

export default app;
