import fs from "fs";
import { Blockchain } from "../core/blockchain";

const FILE = "chain.json";

export function saveChain(chain: Blockchain): void {
  fs.writeFileSync(FILE, JSON.stringify(chain, null, 2));
}

export function loadChain(): Blockchain | null {
  if (!fs.existsSync(FILE)) return null;
  const data = fs.readFileSync(FILE, "utf-8");
  return JSON.parse(data);
}
