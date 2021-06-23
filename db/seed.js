const { db, Center, Season, Batch, Course, Teacher } = require("./model");

// async function : creating bulk values in respective tables
const seed = async () => {
  try {
    // syncing database
    db.sync({ alter: true });

    // creating values for centers table
    await Center.bulkCreate(
      [
        { id: "PP", name: "Pitampura", city: "New Delhi" },
        { id: "DW", name: "Dwarka", city: "New Delhi" },
        { id: "NO", name: "Noida", city: "New Delhi" },
        { id: "DD", name: "Dehradun", city: "Dehradun" },
        { id: "OL", name: "Online", city: "New Delhi" }
      ],
      {
        ignoreDuplicates: true
      }
    );

    // creating values for seasons table
    await Season.bulkCreate(
      [
        { id: "S", name: "Summer" },
        { id: "F", name: "Fall" },
        { id: "W", name: "Winter" },
        { id: "P", name: "Spring" }
      ],
      {
        ignoreDuplicates: true
      }
    );

    // creating values for courses table
    await Course.bulkCreate(
      [
        { id: "LP", name: "Launchpad" },
        { id: "CX", name: "Crux" },
        { id: "IB", name: "Interview Bootcamp" },
        { id: "AD", name: "Android Development" },
        { id: "WD", name: "Web Development (NodeJS)" }
      ],
      {
        ignoreDuplicates: true
      }
    );
  } catch (err) {
    console.error(err);
  }
};

// function call
seed();