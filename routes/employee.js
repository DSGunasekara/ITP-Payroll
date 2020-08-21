const router = require("express").Router();
const Employee = require("../models/Employee");

//Get all the employees
router.get("/", async (req, res) => {
  try {
    await Employee.find({}, (err, result) => {
      if (err) return res.status(500).send(err);
      if (!result) return res.status(404).send("No results");

      return res.status(200).send(result);
    });
  } catch (error) {
    console.log(err);
    return res.status(500).send(err);
  }
});

//Get one the employees
router.get("/:id", async (req, res) => {
  try {
    await Employee.findById({ _id: req.params.id }, (err, result) => {
      if (err) return res.status(500).send(err);
      if (!result) return res.status(400).send("No results");

      return res.status(200).send(result);
    });
  } catch (error) {
    console.log(err);
    return res.status(500).send(err);
  }
});

//Add one employee
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      NIC,
      dateOfBirth,
      email,
      address,
      homePhone,
      mobilePhone,
      basicSalary,
      bankAccount,
      role,
      site,
    } = req.body;

    const employee = new Employee({
      firstName,
      lastName,
      NIC,
      dateOfBirth,
      email,
      address,
      homePhone,
      mobilePhone,
      basicSalary,
      bankAccount,
      role,
      site,
    });

    await employee.save((err, savedEmp) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(savedEmp);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

//update an employee
router.patch("/:id", async (req, res) => {
  try {
    await Employee.findById({ _id: req.params.id }, async (err, employee) => {
      if (err) return res.status(500).send(err);
      if (!employee) return res.status(404).send("User not found");

      const {
        firstName,
        lastName,
        NIC,
        dateOfBirth,
        email,
        address,
        homePhone,
        mobilePhone,
        basicSalary,
        bankAccount,
        role,
        site,
      } = req.body;
      if (firstName) employee.firstName = firstName;
      if (lastName) employee.lastName = lastName;
      if (NIC) employee.NIC = NIC;
      if (dateOfBirth) employee.dateOfBirth = dateOfBirth;
      if (email) employee.email = email;
      if (address) employee.address = address;
      if (homePhone) employee.homePhone = homePhone;
      if (mobilePhone) employee.mobilePhone = mobilePhone;
      if (basicSalary) employee.basicSalary = basicSalary;
      if (bankAccount) employee.bankAccount = bankAccount;
      if (role) employee.role = role;
      if (site) employee.site = site;
      await employee.save((err, savedEmp) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(savedEmp);
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findById({ _id: req.params.id }, async (err, employee) => {
      if (err) return res.status(500).send(err);
      if (!employee) return res.status(404).send("User not found!");
      await employee.remove((err, removedEmp) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(removedEmp);
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
