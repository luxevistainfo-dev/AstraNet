export const TOKEN_NAME = "AstraToken";
export const TOKEN_SYMBOL = "AST";

export class Supply {
  private totalSupply: number;

  constructor(initialSupply: number) {
    this.totalSupply = initialSupply;
  }

  getTotalSupply(): number {
    return this.totalSupply;
  }

  increaseSupply(amount: number): void {
    this.totalSupply += amount;
  }

  decreaseSupply(amount: number): void {
    this.totalSupply -= amount;
  }
}
