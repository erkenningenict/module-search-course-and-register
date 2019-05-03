export function toDutchDate(dateString: string): string {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('nl-NL', options);
}
