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
const { expect } = chai;
const sinon = require("sinon");

chai.use(chaiHttp);

const app = require("../app/app"); // Import your Express app
const Admin = require("../model/Staff/Admin"); // Import your Admin model
const {
  adminLoginCtrl,
  adminRegisterCtrl,
  adminGetAllCtrl,
  adminGetProfileCtrl,
  adminUpdateCtrl,
  deleteAdmin,
  adminSuspendingTeacherCtrl,
  adminUnsuspendingTeacherCtrl,
  adminWithdrawTeacher,
  adminUnwithdrawTeacher,
  adminPublicExam,
  adminUnpublishExam,
  adminLogoutCtrl,
  renderAdminPage,
  renderDashboard,
} = require("../controller/staff/adminCtrl"); // Import your controller functions

describe("Admin Controller (White Box Testing)", () => {
  let findOneStub;
  let createStub;
  let findByIdStub;
  let updateStub;
  let deleteOneStub;
  let countDocumentsStub;
  let aggregateStub;

  before(() => {
    mongoose.connect(
      "mongodb+srv://loi:1234@school-management.sblxche.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    findOneStub = sinon.stub(Admin, "findOne");
    createStub = sinon.stub(Admin, "create");
    findByIdStub = sinon.stub(Admin, "findById");
    updateStub = sinon.stub(Admin, "findByIdAndUpdate");
    deleteOneStub = sinon.stub(Admin, "deleteOne");
    countDocumentsStub = sinon.stub(Admin, "countDocuments");
    aggregateStub = sinon.stub(Admin, "aggregate");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("adminLoginCtrl", () => {
    it("should successfully log in admin with valid credentials", async () => {
      const mockUser = {
        _id: "6493eff29e703f15dce696f8",
        email: "vuighe71@gmail.com",
        password:
          "$2b$10$iiK2Ud15SP9JbsgeRE7dq.YE1u57bLiqQT9oLu3wh07YWdTo3XUde",
      };

      findOneStub.withArgs({ email: mockUser.email }).returns(mockUser);

      const response = await chai.request(app).post("/admin/login").send({
        email: "vuighe71@gmail.com",
        password:
          "$2b$10$iiK2Ud15SP9JbsgeRE7dq.YE1u57bLiqQT9oLu3wh07YWdTo3XUde",
      });

      expect(response.status).to.equal(200);
      expect(response).to.redirectTo("/admin/dashboard");
      expect(response).to.have.cookie("token");
    });

    it("should handle invalid credentials", async () => {
      findOneStub.withArgs({ email: "nonexistent@example.com" }).returns(null);

      const response = await chai.request(app).post("/admin/login").send({
        email: "nonexistent@example.com",
        password: "invalidPassword",
      });

      expect(response.status).to.equal(200);
      expect(response.text).to.include("Invalid login credentials");
    });
  });

  // Add tests for other controller functions here
});
