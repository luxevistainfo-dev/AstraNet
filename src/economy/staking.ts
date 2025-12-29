interface Stake {
  address: string;
  amount: number;
  timestamp: number;
}

export class StakingSystem {
  private stakes: Stake[] = [];

  stakeTokens(address: string, amount: number): void {
    this.stakes.push({ address, amount, timestamp: Date.now() });
    console.log(`${address} staked ${amount} tokens`);
  }

  getStake(address: string): number {
    const stake = this.stakes.find(s => s.address === address);
    return stake ? stake.amount : 0;
  }

  calculateRewards(address: string): number {
    const stake = this.stakes.find(s => s.address === address);
    if (!stake) return 0;
    const duration = (Date.now() - stake.timestamp) / 1000;
    return stake.amount * 0.001 * duration;
  }
}
