import crypto from "crypto";
import { Transaction } from "../core/transaction";

export function signTransaction(tx: Transaction, privateKey: string): string {
  const sign = crypto.createSign("SHA256");
  sign.update(JSON.stringify(tx));
  sign.end();
  return sign.sign(privateKey, "hex");
}

export function verifyTransaction(tx: Transaction, publicKey: string): boolean {
  if (!tx.signature) return false;
  const verify = crypto.createVerify("SHA256");
  verify.update(JSON.stringify(tx));
  verify.end();
  return verify.verify(publicKey, tx.signature, "hex");
}
