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
//query first and then update
/* async function updateCourse(id) {
  //findbyid
  const course = await Course.findById(id);
  if (!course) return;
  //modify
  //course.isPublished = true;
  //course.author = "another author";
  course.set({
    isPublished: true,
    author: "another author",
  });
  //save
  const result = await course.save();
  console.log(result);
} */
//updateCourse("689d5b52787ad41ae02fd833");

//update first approach
async function updateCourse(id) {
  const result = await Course.updateMany(
    { _id: id },
    { $set: { author: "Mosh", isPublished: false } }
  );

  console.log(result);
}
updateCourse("689d5b52787ad41ae02fd833");
