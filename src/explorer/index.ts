import { Application } from "express";
import { Blockchain } from "../core/blockchain";
import { Transaction } from "../core/transaction";

export function setupRoutes(app: Application, blockchain: Blockchain): void {
  app.get("/api/chain", (req, res) => {
    res.json(blockchain.chain);
  });

  app.get("/api/balance/:address", (req, res) => {
    const balance = blockchain.getBalanceOfAddress(req.params.address);
    res.json({ address: req.params.address, balance });
  });

  app.post("/api/transactions", (req, res) => {
    const { from, to, amount } = req.body || {};
    if (!from || !to || typeof amount !== "number") {
      return res.status(400).json({ error: "Invalid transaction" });
    }
    const tx = new Transaction(from, to, amount);
    try {
      blockchain.addTransaction(tx);
      return res.json({ status: "ok", message: "Transaction added" });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Failed to add transaction" });
    }
  });

  app.post("/api/mine", (req, res) => {
    const { minerAddress } = req.body || {};
    if (!minerAddress) return res.status(400).json({ error: "minerAddress required" });
    blockchain.minePendingTransactions(minerAddress);
    return res.json({ status: "ok", message: "Block mined" });
  });
}
