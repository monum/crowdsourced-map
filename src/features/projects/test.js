const hero = {
  name: "Batman",
  city: "Gotham",
};
const { city, ...heroClone } = hero;

console.log(heroClone);
