const express = require("express");
const router = express.Router();

const { Admin } = require("../models");
const { RegisterForm } = require("../models");
const { UpdateForm } = require("../models");
const { Op } = require("sequelize");

const bcrypt = require("bcryptjs");
const { validateToken } = require("../middleware/Auth");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Admin.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    res.json({ msg: "Registration Failed" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Admin.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (match) {
      const accessToken = sign(
        {
          username: user.username,
          id: user.id,
          status: true,
        },
        "importantword"
      );
      res.json({
        token: accessToken,
        username: username,
        id: user.id,
      });
    } else {
      res.json({ error: "Wrong Username or Password" });
    }
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/reports", async (req, res) => {
  const query = req.query.input;

  try {
    let user = await UpdateForm.findAll({
      where: {
        [Op.or]: {
          firstname: {
            [Op.like]: `%${query}%`,
          },
          username: {
            [Op.like]: `%${query}%`,
          },
        },
      },
      order: [["id", "DESC"]],
    });
    if (user.length >= 0) {
      res.json(user);
    } else if (user.length < 0) {
      res.json({ msg: "No user found" });
    } else {
      res.json({ msg: "No user found" });
    }
  } catch (error) {
    res.json({ msg: "Reports Failed" });
  }
});

router.get("/notification", async (req, res) => {
  const query = req.query.input;

  try {
    let user = await UpdateForm.findAll({
      where: {
        [Op.or]: {
          firstname: {
            [Op.like]: `%${query}%`,
          },
          username: {
            [Op.like]: `%${query}%`,
          },
        },
      },
      order: [["id", "DESC"]],
    });
    if (user.length >= 0) {
      res.json(user);
    } else if (user.length < 0) {
      res.json({ msg: "No user found" });
    } else {
      res.json({ msg: "No user found" });
    }
  } catch (error) {
    res.json({ msg: "Notification Failed" });
  }
});

router.get("/searchUser", async (req, res) => {
  const query = req.query.input;
  try {
    let user = await RegisterForm.findAll({
      where: {
        firstname: {
          [Op.like]: `%${query}%`,
        },
      },
    });
    if (user.length >= 0) {
      res.json(user);
    } else if (user.length < 0) {
      res.json({ msg: "No user found" });
    } else {
      res.json({ msg: "No user found" });
    }
  } catch (error) {
    res.json({ msg: "Search Failed" });
  }
});

// a router to delete id in RegisterForm
router.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await RegisterForm.destroy({
      where: {
        id: id,
      },
    });
    res.json({ msg: "Delete Successful" });
  } catch (error) {
    res.json({ msg: "Delete Failed" });
  }
});

// a router to delete RegisterFormId in Updateform
router.delete("/deleteReports/:id", async (req, res) => {
  const id = req.params.id;
  const { date } = req.body;

  try {
    await UpdateForm.destroy({
      where: {
        RegisterFormId: id,
        date: date,
      },
    });
    console.log(date);
    res.json({ msg: "Delete Successful" });
  } catch (error) {
    res.json({ msg: "Delete Failed" });
  }
});

router.put("/account", async (req, res) => {
  const {
    id,
    firstname,
    lastname,
    middlename,
    age,
    contact,
    email,
    address,
    vaccinated,
    vaccine,
    people,

    course,
    year,
    grade,
    designation,
  } = req.body;

  try {
    await RegisterForm.update(
      {
        email: email,
        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        age: age,
        contact: contact,
        address: address,
        vaccinated: vaccinated,
        vaccine: vaccine,
        people: people,
        course: course,
        year: year,
        grade: grade,
        designation: designation,
      },
      { where: { id: id } }
    );
    res.json({ msg: "Update Successful" });
  } catch (error) {
    res.json({ msg: "Update Failed" });
  }
});

router.put("/report", async (req, res) => {
  const date = new Date().toJSON().split("T")[0];

  const {
    id,
    purpose,
    symptoms,
    fever,
    cough,
    headache,
    diarrhea,
    bodyPain,
    lostSmell,
    skin,
    shortness,
    colds,
    sore,
    hotspots,
    together,
    expose,
    travel,
    where,
  } = req.body;

  try {
    await UpdateForm.update(
      {
        purpose: purpose,
        symptoms: symptoms,
        hotspots: hotspots,
        together: together,
        expose: expose,
        travel: travel,
        where: where,
        fever: fever,
        cough: cough,
        headache: headache,
        diarrhea: diarrhea,
        bodyPain: bodyPain,
        lostSmell: lostSmell,
        skin: skin,
        shortness: shortness,
        colds: colds,
        sore: sore,
      },
      { where: { RegisterFormId: id, date: date } }
    );
    res.json({ msg: "Update Successful" });
  } catch (error) {
    res.json({ msg: "Update Failed" });
  }
});

module.exports = router;
