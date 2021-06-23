const { Sequelize } = require("sequelize");

const db = new Sequelize("batchcodegen", "thenishantgiri", "admin", {
  host: "localhost",
  dialect: "mysql"
});

// establishing connection with database
db.authenticate()
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));

module.exports = {
  db
};
