// requiring database from db folder
const { db } = require("./db/model");

// requiring server application from server app
const { app } = require("./server");

// an async function : synchronizing to database and starting a server at localhost port 3131
const start = async () => {
  try {
    await db.sync();

    app.listen(3131, () => {
      console.log("server started on http://localhost:3131");
    });
  } catch (err) {
    console.error(err);
  }
};

// function call
start();
