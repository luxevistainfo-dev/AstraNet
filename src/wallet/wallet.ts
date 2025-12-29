import { generateKeyPair } from "./keys";
import { signTransaction } from "./sign";
import { Transaction } from "../core/transaction";

export class Wallet {
  public publicKey: string;
  private privateKey: string;

  constructor() {
    const { publicKey, privateKey } = generateKeyPair();
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  createTransaction(toAddress: string, amount: number): Transaction {
    const tx = new Transaction(this.publicKey, toAddress, amount);
    tx.signature = signTransaction(tx, this.privateKey);
    return tx;
  }
}
