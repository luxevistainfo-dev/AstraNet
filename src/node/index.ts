import { Blockchain } from "../core/blockchain";
import { Miner } from "../mining/miner";
import { Wallet } from "../wallet/wallet";
import { saveChain, loadChain } from "../utils/persistence";

function main() {
  let chainData = loadChain();
  const blockchain = chainData ? Object.assign(new Blockchain(), chainData) : new Blockchain();

  const minerWallet = new Wallet();
  const miner = new Miner(blockchain, minerWallet.publicKey);
  miner.minePendingTransactions();

  saveChain(blockchain);

  console.log("Blockchain initialized and first block mined.");
}

main();
