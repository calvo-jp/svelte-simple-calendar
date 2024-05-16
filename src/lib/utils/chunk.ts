export function chunk<T>(array: T[], size: number) {
  const chunks: T[][] = [];
  const copy = [...array];
  const len = copy.length;

  let i = 0;

  for (i = 0; i < len; i += size) {
    chunks.push(copy.slice(i, i + size));
  }

  return chunks;
}
