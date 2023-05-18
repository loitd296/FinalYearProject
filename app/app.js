const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRouter = require("../routes/academics/userRouter");
const adminRouter = require("../routes/staff/adminRouter");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrorHandler");
const isLogin = require("../middlewares/isLogin");
const mongoose = require("mongoose");

const app = express();

// Set up mongoose connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

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

// Use cookie-parser middleware
app.use(cookieParser());

// Configure the session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
  })
);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(isLogin);

// User Routes
app.use("/", userRouter);

// Admin Routes
app.use("/admin", adminRouter);

// Error middlewares
app.use(globalErrHandler);
app.use(notFoundErr);

module.exports = app;
