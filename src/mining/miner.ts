import { Block } from "../core/block";
import { Transaction } from "../core/transaction";
import { Blockchain } from "../core/blockchain";
import { getDifficulty } from "./difficulty";
import { getMiningReward } from "./reward";

export class Miner {
  private blockchain: Blockchain;
  private address: string;

  constructor(blockchain: Blockchain, address: string) {
    this.blockchain = blockchain;
    this.address = address;
  }

  minePendingTransactions(): void {
    const block = new Block(
      this.blockchain.chain.length,
      Date.now(),
      this.blockchain.pendingTransactions,
      this.blockchain.getLatestBlock().hash
    );

    block.mineBlock(getDifficulty());
    this.blockchain.chain.push(block);

    this.blockchain.pendingTransactions = [
      new Transaction(null as any, this.address, getMiningReward()),
    ];

    console.log(`Miner ${this.address} mined block #${block.index}`);
  }
}
