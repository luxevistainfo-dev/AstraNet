import { Block } from "../core/block";

export function createGenesisBlock(): Block {
  return new Block(0, Date.now(), [], "0");
}
