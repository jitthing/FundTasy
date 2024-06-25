export default function formatCurrency(number) {
  if (number === undefined) {
    return undefined;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
}