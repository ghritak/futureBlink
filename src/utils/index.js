export function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateContent(type) {
  if (type === 'email') return 'This is email content';
  if (type === 'delay') return 'Wait 1 day';
  if (type === 'complete') return 'Task completed';
}
