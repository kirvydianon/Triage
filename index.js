const express = require("express");
const app = express();
const db = require("./models");
const registerRouter = require("./Routes/RegisterForm");
const updateformRouter = require("./Routes/UpdateForm");

const PORT = process.env.PORT || 5000;

const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/registerform", registerRouter);
app.use("/updateform", updateformRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`);
  });
});
