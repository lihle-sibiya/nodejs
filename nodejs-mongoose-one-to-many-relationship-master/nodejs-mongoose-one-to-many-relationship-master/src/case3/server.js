const mongoose = require("mongoose");

const db = require("./models");

const createTutorial = function (tutorial) {//creates tutorial
  return db.Tutorial.create(tutorial).then((docTutorial) => {
    console.log("\n>> Created Tutorial:\n", docTutorial);
    return docTutorial;
  });
};

const createCategory = function (category) {//creates category
  return db.Category.create(category).then((docCategory) => {
    console.log("\n>> Created Category:\n", docCategory);
    return docCategory;
  });
};

const addTutorialToCategory = function (tutorialId, categoryId) {//adds tutorial to category
  return db.Tutorial.findByIdAndUpdate(
    tutorialId,
    { category: categoryId },
    { new: true, useFindAndModify: false }
  );
};

const getTutorialsInCategory = function (categoryId) {//retrieves all Tutorials in a Category
  return db.Tutorial.find({ category: categoryId })
    .populate("category", "name -_id")
    .select("-comments -images -__v");
};

const run = async function () {
  var tutorial = await createTutorial({//awaits tutorial
    title: "Tutorial #1",
    author: "bezkoder",
  });

  var category = await createCategory({//awaits category
    name: "Node.js",
    description: "Node.js tutorial"
  });

  tutorial = await addTutorialToCategory(tutorial._id, category._id);//awaits tutorial to category
  console.log("\n>> Tutorial:\n", tutorial);

  var newTutorial = await createTutorial({//await tutorial2
    title: "Tutorial #2",//tut2
    author: "bezkoder"
  });

  await addTutorialToCategory(newTutorial._id, category._id);//Add Tutorial2 to category

  var tutorials = await getTutorialsInCategory(category._id);//displays all tutorials in category
  console.log("\n>> all Tutorials in Cagetory:\n", tutorials);
};


mongoose.connect("mongodb://127.0.0.1/bezkoder_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch((err) => console.error("Connection error", err));

run();