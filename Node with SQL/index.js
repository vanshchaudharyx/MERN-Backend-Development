const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
require("dotenv").config();

// Create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});



//Now our connection in build, how to use it?
// Use query method available in connection.

try {
  connection.query("Show tables", (err, result) => {
    //We can also write this query in a variable and pass in it.
    if (err) throw err;
    console.log(result); //[ { Tables_in_delta_app: 'temp' } ] //This result is actually an array.
    //After the execution of this we can observe our connection doesn't stop.
    console.log(result.length);
    console.log(result[0]);
    connection.end(); //to close connection.
  });
} catch (err) {
  console.log(err);
}



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
// console.log(getRandomUser());
