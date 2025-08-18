//Connect to mongodb using mongoose
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.error("could not connect", err));

async function hi(v) {
  const result = v && v.length > 0;
  return !result;
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
  //tags: [String],
  //custom validator, tags should contain atleast one value
  /*  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course should have atleast one tag",
    },
  }, */
  //Async validator, tags should contain atleast one value
  /*  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return new Promise((resolve, reject) => {
          // Simulate an asynchronous operation with a 2-second delay
          setTimeout(() => {
            if (v.length > 0) {
              resolve(true); // Validation successful
            } else {
              reject(new Error("Username must be at least 3 characters long.")); // Validation failed
            }
          }, 4000); // 2-second delay
        });
      },
      message: "A course should have atleast one tag",
    },
  }, */

  /* price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  }, */

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
    //tags: ["web"],
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
