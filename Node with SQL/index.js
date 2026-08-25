const { faker } = require("@faker-js/faker");

let getRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    // avatar: faker.image.avatar(),
    password: faker.internet.password(),
    // birthdate: faker.date.birthdate(),
    // registeredAt: faker.date.past(),
  };
};
console.log(getRandomUser());
