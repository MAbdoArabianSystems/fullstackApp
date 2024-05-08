const mongoose = require("mongoose");

// get schema from mongoose
const Schema = mongoose.Schema;

// this example for arctic variables needs in DB table article
const articleSchema = new Schema({
  name: String,
  age: Number,
});

// this example for creating a new table in DB and take a tow parameters [table name , article variables you created]
const article = mongoose.model("Article",articleSchema)

// this example on who i use model in any fiels of project
module.exports = article