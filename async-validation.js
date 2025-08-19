//Connect to mongodb using mongoose
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.error("could not connect", err));

/* async function hi(tags) {
  console.log(tags);
  const result = tags && tags.length > 0;
  return result;
} */

async function hi(tags) {
  const result = await checktags(tags);
  return result;
}

function checktags(tags) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(tags);

      //const result = tags && tags.length > 0;
      //resolve(result);
      const result = tags && tags.length > 0;
      if (result) resolve(true);
      else {
        reject(new Error("some eror"));
      }
    }, 2000);
  });
}

//Schema creation (shape of the document)
const courseSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxlength: 50, required: true },
  author: String,
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },

  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: hi,
      message: "A course should have atleast one tag",
    },
  },

  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

//Model the schema
const Course = mongoose.model("course", courseSchema);

//course creation with validation
async function createCourse() {
  const course = new Course({
    name: "",
    category: "something",
    //tags: null,
    tags: ["web"],
  });
  try {
    //await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}
createCourse();
