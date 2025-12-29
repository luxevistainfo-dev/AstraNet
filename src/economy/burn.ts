export function burnTokens(amount: number, burnRate: number = 0.02): number {
  const burned = amount * burnRate;
  const remaining = amount - burned;
  console.log(`Burned ${burned} tokens`);
  return remaining;
}
