const express = require("express");
const path = require("path");
const { Center, Season, Course, Batch } = require("./db/model");

// server
const app = express();

// for rendering view engine i.e. hbs file
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));

// for handling post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// if we receive a get request to '/batchcode' location, call the below async function
app.get("/batchcode", async (req, res) => {
  try {
    const centers = await Center.findAll();
    const seasons = await Season.findAll();
    const courses = await Course.findAll();
    const years = [2016, 2017, 2018, 2019, 2020, 2021];

    res.render("batchcode", { centers, seasons, courses, years });
  } catch (err) {
    console.error(err);
  }
});

// if we receive a post request to '/batchcode' location, call the below async function
app.post("/batchcode", async (req, res) => {
  let batchcode = ""; // format : WDOL20W1
  batchcode += req.body.course;
  batchcode += req.body.center;
  batchcode += req.body.year.substr(2);
  batchcode += req.body.season;
  batchcode += req.body.batchno;

  try {
    const batch = await Batch.create({
      code: batchcode,
      year: req.body.year,
      start: Date.parse(req.body.start),
      end: Date.parse(req.body.end),
      courseId: req.body.course,
      centerId: req.body.center,
      seasonId: req.body.season
    });
    res.send(batch.code);
  } catch (err) {
    console.error(err);
  }
});

// if we receive a get request to '/batches' location, call the below async function
app.get("/batches", async (req, res) => {
  try {
    const batches = await Batch.findAll({
      include: [Course, Season, Center]
    });

    // printing every batch of Node console
    batches.forEach((b) => console.log(JSON.stringify(b)));

    res.render("batches", { batches });
  } catch (err) {
    console.error(err);
  }
});

// exporting the server, to be required by run.js
module.exports = {
  app
};
