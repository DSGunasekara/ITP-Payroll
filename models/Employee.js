const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  homePhone: {
    type: String,
    required: true,
  },
  mobilePhone: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  bankAccount: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
