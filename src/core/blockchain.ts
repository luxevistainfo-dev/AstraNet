import { Block } from "./block";
import { Transaction } from "./transaction";
import { getMiningReward } from "../mining/reward";
import { getDifficulty } from "../mining/difficulty";
import { saveJSON, loadJSON } from "../utils/persistence";

const STORAGE_PATH = "data/chain.json";

export class Blockchain {
  public chain: Block[];
  public pendingTransactions: Transaction[];
  public difficulty: number;
  public miningReward: number;

  constructor() {
    this.difficulty = getDifficulty();
    this.miningReward = getMiningReward();

    const saved = loadJSON<{ chain: any[]; pending: any[] }>(STORAGE_PATH);
    if (saved && saved.chain && saved.chain.length > 0) {
      // reconstruct blocks and transactions
      this.chain = saved.chain.map((b, idx) => {
        const txs = (b.transactions || []).map((t: any) => new Transaction(t.fromAddress, t.toAddress, t.amount));
        const block = new Block(b.index, b.timestamp, txs, b.previousHash);
        block.nonce = b.nonce || 0;
        block.hash = b.hash || block.calculateHash();
        return block;
      });
      this.pendingTransactions = (saved.pending || []).map((t: any) => new Transaction(t.fromAddress, t.toAddress, t.amount));
      console.log("Loaded chain from disk, length:", this.chain.length);
    } else {
      this.chain = [this.createGenesisBlock()];
      this.pendingTransactions = [];
      // save initial state
      this.persist();
      console.log("Blockchain initialized and first block mined.");
    }
  }

  private persist(): void {
    saveJSON(STORAGE_PATH, {
      chain: this.chain,
      pending: this.pendingTransactions
    });
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), [], "0");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(minerAddress: string): void {
    const block = new Block(this.chain.length, Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);

    this.chain.push(block);
    this.pendingTransactions = [
      new Transaction(null, minerAddress, this.miningReward)
    ];

    this.persist();
  }

  addTransaction(transaction: Transaction): void {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("Transaction must include from and to address");
    }
    this.pendingTransactions.push(transaction);
    this.persist();
  }

  getBalanceOfAddress(address: string): number {
    let balance = 0;
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address) {
          balance -= tx.amount;
        }
        if (tx.toAddress === address) {
          balance += tx.amount;
        }
      }
    }
    return balance;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.calculateHash()) {
        return false;
      }
      if (current.previousHash !== previous.hash) {
        return false;
      }
    }
    return true;
  }
}
