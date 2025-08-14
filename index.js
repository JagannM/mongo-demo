//Connect to mongodb using mongoose
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.error("could not connect", err));

//Schema creation (shape of the document)
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

//Model the schema
const Course = mongoose.model("course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js course",
    author: "jagan",
    tags: ["node", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
