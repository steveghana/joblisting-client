//add documentation for the above codeblock
export const getRandomColor = () => {
  const hue = Math.random();
  return `hsl(${hue * 360}, 50%, 50%)`;
};
