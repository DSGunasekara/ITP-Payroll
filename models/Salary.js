const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  months: {
    type: Number,
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  amountOfLeaves: {
    type: Number,
    required: true,
  },
  otHours: {
    type: Number,
    required: true,
  },
});

module.exports = Salary = mongoose.model("Salary", SalarySchema);
