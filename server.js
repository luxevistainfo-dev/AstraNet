const express = require("express");
const { Blockchain } = require("./dist/core/blockchain");

const app = express();
const PORT = 3000;

const blockchain = new Blockchain();

app.get("/chain", (req, res) => {
  res.json(blockchain.chain);
});

app.get("/balance/:address", (req, res) => {
  const balance = blockchain.getBalanceOfAddress(req.params.address);
  res.json({ address: req.params.address, balance });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
