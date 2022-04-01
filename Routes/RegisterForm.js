const express = require("express");
const router = express.Router();
const { RegisterForm } = require("../models");

const bcrypt = require("bcrypt");
const { validateToken } = require("../middleware/Auth");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const {
    username,
    email,
    password,
    firstname,
    lastname,
    middlename,
    nationality,
    age,
    contact,
    gender,
    types,
    address,
    vaccinated,
    vaccine,
    people,
    course,
    year,
    grade,
    designation,
    inviActive,
  } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await RegisterForm.create({
      username: username,
      email: email,
      password: hashPassword,
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      nationality: nationality,
      age: age,
      contact: contact,
      gender: gender,
      types: types,
      address: address,
      vaccinated: vaccinated,
      vaccine: vaccine,
      people: people,
      course: course,
      year: year,
      grade: grade,
      designation: designation,
      inviActive: inviActive,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    res.json({ msg: "Registration Failed" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await RegisterForm.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (match) {
      const accessToken = sign(
        {
          username: user.username,
          id: user.id,
        },
        "importantword"
      );
      res.json({
        token: accessToken,
        username: username,
        id: user.id,
      });
    } else {
      res.json({ error: "Wrong Password" });
    }
  });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const user = await RegisterForm.findByPk(id);

  res.json(user);
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
