const router = require("express").Router();
const Salary = require("../models/Salary");
const Employee = require("../models/Employee");

//Get all the salary
router.get("/", async (req, res) => {
  try {
    await Salary.find({}, async (err, salary) => {
      if (err) return res.status(500), send(err);
      if (!salary) return res.status(404).send("No data");
      return res.status(200).send(salary);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//Add a salary
router.post("/:id", async (req, res) => {
  try {
    await Employee.findById({ _id: req.params.id }, async (err, employee) => {
      if (err) return res.status(500).send(err);
      if (!employee) return res.status(404).send("User not found");
      const date = new Date();
      const months = date.getUTCMonth() + 1;
      await Salary.findOne({ employee, months }, async (err, salary) => {
        if (err) return res.status(500).send(err);
        if (salary) return res.status(400).send("already paid");
        if (!salary) {
          const { amount, date, amountOfLeaves, otHours } = req.body;
          const newSalary = new Salary({
            amount,
            months,
            employee,
            amountOfLeaves,
            otHours,
          });
          await newSalary.save((err, savedSalary) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(savedSalary);
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//delete a salary
router.delete("/:id", async (req, res) => {
  try {
    await Salary.findById({ _id: req.params.id }, async (error, salary) => {
      if (error) return res.status(500).send(error);
      if (!salary) return res.status(404).send("No data found");
      await salary.remove((error, removedSalary) => {
        if (error) return res.status(500).send(error);
        return res.status(200).send(removedSalary);
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
