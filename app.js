const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const db = require("./models");

const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
const registerRouter = require("./Routes/RegisterForm");
const updateformRouter = require("./Routes/UpdateForm");
const adminRouter = require("./Routes/Admin");

app.use("/registerform", registerRouter);
app.use("/updateform", updateformRouter);
app.use("/adminform", adminRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port 5000");
  });
});
