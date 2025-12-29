// src/economy/supply.ts
export function initialSupply(): number {
  // Initial total supply of the token
  return 1000000;
}

export function totalSupplyAfterBurn(currentSupply: number, burnedAmount: number): number {
  return Math.max(0, currentSupply - burnedAmount);
}

export function mintSupply(currentSupply: number, amount: number): number {
  return currentSupply + amount;
}
