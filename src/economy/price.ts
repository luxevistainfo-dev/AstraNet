let basePrice = 1;

export function calculatePrice(activeUsers: number): number {
  return basePrice * (1 + activeUsers * 0.05);
}
