export function toDutchDate(date: string | number): string {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('nl-NL', options);
}
