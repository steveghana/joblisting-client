export function formatTimeDifference(date1: Date, date2: Date) {
  const units = [
    { name: 'second', milliseconds: 1000 },
    { name: 'minute', milliseconds: 1000 * 60 },
    { name: 'hour', milliseconds: 1000 * 60 * 60 },
    { name: 'day', milliseconds: 1000 * 60 * 60 * 24 },
    { name: 'month', milliseconds: 1000 * 60 * 60 * 24 * 30 }, // Approximation
    { name: 'year', milliseconds: 1000 * 60 * 60 * 24 * 365 }, // Approximation
  ];
  const diffInMilliseconds = date2.getTime() - date1.getTime();
  let unitUsed = units[0];

  for (let unit of units) {
    if (Math.abs(diffInMilliseconds) > unit.milliseconds) {
      unitUsed = unit;
    } else {
      break;
    }
  }

  const diffInUnits = Math.round(diffInMilliseconds / unitUsed.milliseconds);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  return rtf.format(diffInUnits, unitUsed.name as any);
}
