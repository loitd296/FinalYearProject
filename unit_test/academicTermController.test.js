const chai = require("chai");
const sinon = require("sinon");
const AcademicTerm = require("../model/Academic/AcademicTerm");
const academicTermController = require("../controller/academics/academicTermCtrl");
const AsyncHandler = require("express-async-handler");

const { expect } = chai;

describe("Academic Term Controller", () => {
  describe("createAcademicTerm", () => {
    it("should create a new academic term and redirect to /academic-term/index", async () => {
      const req = {
        body: {
          name: "Test Term",
          description: "Test Description",
          duration: "Test Duration",
        },
        userAuth: {
          _id: "6493eff29e703f15dce696f8",
        },
      };
      const res = {
        redirect: sinon.stub(),
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const academicTermMock = sinon.mock(AcademicTerm);
      academicTermMock.expects("findOne").once().resolves(null);
      academicTermMock.expects("create").once().resolves({ _id: "term_id" });

      await academicTermController.createAcademicTerm(req, res);

      academicTermMock.verify();
      expect(res.redirect.calledOnceWithExactly("/academic-term/index")).to.be
        .true;
    });

    // Add more test cases for different scenarios (e.g., duplicate academic term name).
  });

  // Write tests for other controller functions (getAcademicTerms, getAcademicTerm, searchAcademicTerms, updateAcademicTerms, deleteAcademicTerm).
});
