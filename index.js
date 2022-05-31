// [x] initialize express app
// [x]  setup handlebars
// [x]  setup static files
// [ ] setup storage middleware
// [x]  set main route handlers (controller actions)

const express = require("express");
const hbs = require("express-handlebars");

const { init: storage } = require("./models/storage");

const { catalog } = require("./controllers/catalog");
const { about } = require("./controllers/about");
const { details } = require("./controllers/details");
const { create, createPost } = require("./controllers/create");
const { notFound } = require("./controllers/notFound");
const { edit, editPost } = require("./controllers/edit");

start();

async function start() {
  const port = 3000;
  const app = express();

  app.engine(
    "hbs",
    hbs({
      extname: ".hbs",
    })
  );
  app.set("view engine", "hbs");
  app.use("/static", express.static("static"));
  app.use("/js", express.static("js"));
  app.use(express.urlencoded({ extended: false }));
  app.use(await storage());

  app.get("/", catalog);
  app.get("/about", about);
  app.get("/details/:id", details);
  app.get("/create", create);
  app.post("/create", createPost);

  app.get("/edit/:id", edit);
  app.post("/edit/:id", editPost);

  app.all("*", notFound);

  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
}