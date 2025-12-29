import express from "express";
import { Blockchain } from "../core/blockchain";
import { setupRoutes } from "./routes";

const app = express();
const PORT = 4000;

app.use(express.json()); // <--- важно

const blockchain = new Blockchain();
setupRoutes(app, blockchain);

app.listen(PORT, () => {
  console.log(`Explorer running at http://localhost:${PORT}`);
});
