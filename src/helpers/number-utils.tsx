export function toDutchMoney(value: number): string {
  const options = { minimumFractionDigits: 2 };
  if (!value) {
    return '';
  }
  return value.toLocaleString('nl-NL', options);
}
