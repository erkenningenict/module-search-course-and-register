export function toDutchMoney(value: number): string {
  const options = { minimumFractionDigits: 2 };
  return value.toLocaleString('nl-NL', options);
}
