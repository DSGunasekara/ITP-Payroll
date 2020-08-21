const express = require("express");
const connectDB = require("./config/db");

const employeeRoute = require("./routes/employee");
const salaryRoute = require("./routes/salary");

connectDB();

const app = express();
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Runing."));
app.use("/api/payroll/employee", employeeRoute);
app.use("/api/payroll/salary", salaryRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App runing at port ${PORT}`));
