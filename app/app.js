const express = require("express");

const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Import routers
const userRouter = require("../routes/academics/userRouter");
const adminRouter = require("../routes/staff/adminRouter");
const academicYearRouter = require("../routes/academics/academicYear");
const academicTermRouter = require("../routes/academics/academicTerm");
const classLevelRouter = require("../routes/academics/classLevel");
const programRouter = require("../routes/academics/program");
const subjectsRouter = require("../routes/academics/subjects");
const yearGroupRouter = require("../routes/academics/yearGroups");
const teachersRouter = require("../routes/staff/teachers");
const examRouter = require("../routes/academics/examRoutes");
const studentRouter = require("../routes/student/student");
const questionRouter = require("../routes/academics/questionRoutes");
const examResultRouter = require("../routes/academics/examResultRoute");
const categoryRouter = require("../routes/academics/category");

// Import middlewares
const isTeacher = require("../middlewares/isTeacher");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrorHandler");
const notAllowLoginPage = require("../middlewares/notAllowLoginPage");

// Constants
const mongoUrl = process.env.MONGO_URL;
const secretKey = process.env.SECRET_KEY;

// Connect to MongoDB
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const app = express();

// Set up views directory and handlebars engine
const hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "../views/layouts"),
  partialsDir: path.join(__dirname, "../views/partials"),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    inc: (value) => parseInt(value) + 1,
    eq: (v1, v2) => v1 === v2,
    ifCond: function (v1, operator, v2, options) {
      switch (operator) {
        case "==":
          return v1 == v2 ? options.fn(this) : options.inverse(this);
        case "===":
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case "!=":
          return v1 != v2 ? options.fn(this) : options.inverse(this);
        case "!==":
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case "<":
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case "<=":
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case ">":
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case ">=":
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    },
  },
});

// Serve static files from the "public" directory
app.use(express.static("public"));

// Set the view engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// Use middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure the session middleware
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl,
      collectionName: "sessions",
    }),
  })
);
// app.get("/", (req, res) => {
//   res.redirect("/teacher/login"); // Redirect to the login page
// });

// Auth middleware - example using JWT
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      req.userAuth = decoded;
    } catch (err) {
      console.error("Token Verification Error:", err);
      if (err.name === "TokenExpiredError") {
        return res.redirect("/teacher/login");
      }
      return next(err);
    }
  }
  next();
});

// Register routers
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/academic-years", academicYearRouter);
app.use("/academic-term", academicTermRouter);
app.use("/class-level", classLevelRouter);
app.use("/program", programRouter);
app.use("/subject", subjectsRouter);
app.use("/year-group", yearGroupRouter);
app.use("/teacher", teachersRouter);
app.use("/exam", examRouter);
app.use("/student", studentRouter);
app.use("/question", questionRouter);
app.use("/exam-result", examResultRouter);
app.use("/category", categoryRouter);

// Use the notAllowLoginPage middleware after registering the routers
app.use(notAllowLoginPage);
// Error middlewares
app.use(globalErrHandler);
app.use(notFoundErr);
// Apply rate limiting to the API route for chatbot interactions

module.exports = app;
