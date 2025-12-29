import { Application } from "express";
import { Blockchain } from "../core/blockchain";

export function setupRoutes(app: Application, blockchain: Blockchain): void {
  app.get("/api/chain", (req, res) => {
    res.json(blockchain.chain);
  });

  app.get("/api/balance/:address", (req, res) => {
    const balance = blockchain.getBalanceOfAddress(req.params.address);
    res.json({ address: req.params.address, balance });
  });
}
