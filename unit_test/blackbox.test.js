process.env.MONGO_URL =
  "mongodb+srv://loi:1234@school-management.sblxche.mongodb.net/?retryWrites=true&w=majority";
process.env.SECRET_KEY = "keyboard cat";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

dbConnect();

require("dotenv").config();

const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

const { expect } = chai;

chai.use(chaiHttp);

const app = require("../app/app"); // Import your Express app
const Admin = require("../model/Staff/Admin"); // Import your Admin model

describe("Admin Login Controller (Black Box Testing)", () => {
  it("should successfully log in admin with valid credentials", async () => {
    // Hash the password manually before sending the request
    const password = "1111";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin user with the hashed password
    const admin = new Admin({
      name: "Trần Đức Lợi1",
      email: "vuighe71@gmail.com",
      password: hashedPassword,
      // Other necessary fields for admin creation
    });
    await admin.save();

    // Send login request with plain text password
    const response = await chai
      .request(app)
      .post("/admin/login")
      .send({ email: "vuighe71@gmail.com", password: "1111" });

    expect(response.status).to.equal(200);
    expect(response).to.redirectTo("/admin/dashboard");
    expect(response).to.have.cookie("token"); // Ensure that the token is set in the response cookie
  });

  it("should handle invalid credentials", async () => {
    // Send login request with incorrect plain text password
    const response = await chai
      .request(app)
      .post("/admin/login")
      .send({ email: "nonexistent@example.com", password: "invalidPassword" });

    expect(response.status).to.equal(200);
    expect(response).to.not.redirectTo("/admin/dashboard");
    expect(response.text).to.include("Invalid login credentials"); // Check if the error message is displayed in the response
  });
});
