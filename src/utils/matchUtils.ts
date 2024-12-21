export function getMatchRowColor(match: Match): string {
  if (match.result.name === 'NOT_PLAYED') return '';
  return match.result.name === 'WON' 
    ? 'bg-green-100 dark:bg-green-900/30' 
    : 'bg-red-100 dark:bg-red-900/30';
}