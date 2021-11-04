let mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) console.log("Error : " + err);
      else console.log("Database connection established");
    }
  );
};
module.exports = connectDB;
