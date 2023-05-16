const session = require("express-session");
const MongoStore = require("connect-mongo");
const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("../routes/academics/userRouter");
const adminRouter = require("../routes/staff/adminRouter");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrorHandler");
const isLogin = require("../middlewares/isLogin");

const app = express();

// Set the views directory
app.set("views", path.join(__dirname, "../views"));

// Create an instance of the express-handlebars engine
const hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "../views/layouts"),
  partialsDir: path.join(__dirname, "../views/partials"),
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Set the view engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// User Routes
app.use("/", userRouter);
app.use("/about", userRouter);

// Admin Routes
app.use("/admin", adminRouter);
// app.use("/api/v1/admin", adminRouter);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.get("/favicon.ico", (req, res) => res.status(204));

// Create a new instance of MongoStore
const store = new MongoStore({
  mongoUrl: process.env.MONGO_URL,
  collectionName: "sessions",
});

// Configure the session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Error middlewares
app.use(globalErrHandler);
app.use(notFoundErr);

module.exports = app;
