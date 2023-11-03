export function formatDate(dateString) {
    const date = new Date(dateString);
  return `${date.toDateString()} ${date.toLocaleTimeString('en-US', { timeZoneName: 'short', fractionalSecondDigits: 3 })}`;
}