const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const Chart = require("chart.js");

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

const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrorHandler");
const mongoose = require("mongoose");
const ExamResult = require("../model/Academic/ExamResults");

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
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

// Serve static files from the "public" directory
app.use(express.static("public"));

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
app.get("/favicon.ico", (req, res) => res.status(204));
app.use(cookieParser());
// User Routes
app.use("/", userRouter);

// Admin Routes
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

// Error middlewares
app.use(globalErrHandler);
app.use(notFoundErr);

module.exports = app;
