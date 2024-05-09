export function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateContent(type) {
  if (type === 'email') return 'This is email content';
  if (type === 'delay') return 'Wait 1 day';
  if (type === 'complete') return 'Task completed';
}

export const generateNodeId = () => `${Date.now()}`;

export const getMenuLeftPosition = (event) => {
  let [leftPosition, screenWidth] = getPosition(event);
  if (leftPosition > screenWidth - 112) {
    leftPosition = leftPosition - 112;
  }
  return leftPosition;
};

const getPosition = (event) => {
  if (window.innerWidth > 1280) {
    return [event.clientX - window.innerWidth / 5, (window.innerWidth * 4) / 5];
  } else if (window.innerWidth < 1280 && window.innerWidth > 1024) {
    return [event.clientX - window.innerWidth / 4, (window.innerWidth * 3) / 4];
  } else {
    return [event.clientX, window.innerWidth];
  }
};
