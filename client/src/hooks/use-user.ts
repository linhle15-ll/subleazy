const colors = [
  '#958DF1',
  '#F98181',
  '#FBBC88',
  '#FAF594',
  '#70CFF8',
  '#94FADB',
  '#B9F18D',
];
const names = ['Lea Thompson', 'Cyndi Lauper'];

const getRandomElement = (list: string | any[]) =>
  list[Math.floor(Math.random() * list.length)];

const getRandomColor = () => getRandomElement(colors);
const getRandomName = () => getRandomElement(names);

export const userName = getRandomName();
export const userColor = getRandomColor();

export const useUser = () => {
  return {
    name: userName,
    color: userColor,
  };
};
