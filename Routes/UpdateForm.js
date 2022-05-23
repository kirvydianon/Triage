const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { UpdateForm } = require("../models");
const { RegisterForm } = require("../models");

router.post("/", async (req, res) => {
  const {
    username,
    firstname,
    lastname,
    middlename,
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
    RegisterFormId,
    updateActive,
    date,
    temperature,
    timesIn,
  } = req.body;
  await UpdateForm.create({
    username: username,
    firstname: firstname,
    lastname: lastname,
    middlename: middlename,
    purpose: purpose,
    symptoms: symptoms,
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
    hotspots: hotspots,
    together: together,
    expose: expose,
    travel: travel,
    where: where,
    RegisterFormId: RegisterFormId,
    updateActive: updateActive,
    date: date,
    temperature: temperature,
    timesIn: timesIn,
  });
  res.json("SUCCESS");
});

router.get("/updateId/:id", async (req, res) => {
  const date = new Date().toJSON().split("T")[0];

  const userId = req.params.id;
  const user = await UpdateForm.findOne({
    where: { RegisterFormId: userId, date: date },
  });
  if (user == null) {
    return res.json({ error: "Please Update your form" });
  } else {
    res.json(user);
  }
});
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await UpdateForm.findAll({
    where: { RegisterFormId: userId },
    order: [["id", "DESC"]],
    limit: 5,
  });
  if (user == null) {
    return res.json({ error: "No user found" });
  } else {
    res.json(user);
  }
});

router.put("/temperature", async (req, res) => {
  const { temperature, id } = req.body;
  const date = new Date().toJSON().split("T")[0];

  try {
    const userId = await RegisterForm.findByPk(id);
    const user = await UpdateForm.findOne({
      where: { RegisterFormId: id, date: date },
    });
    let counting = parseInt(user.timesIn) + 1;
    await UpdateForm.update(
      { temperature: temperature },
      { where: { RegisterFormId: id, date: date } }
    );

    if (
      user &&
      (parseFloat(temperature).toFixed(2) > 37.2 ||
        parseFloat(temperature).toFixed(2) < 33)
    ) {
      if (parseFloat(temperature).toFixed(2) < 33) {
        res.json({
          result: "error",
          status: "denied",
          message: "student has lower temperature",
          data: {
            firstname: userId.firstname,
            lastname: userId.lastname,
            mi: userId.middlename,
            classfication: userId.types,
            date: user.date,
            dataUser: "denied",
            temperature: temperature,
            message: "student has lower temperature",
          },
        });
      }
      if (parseFloat(temperature).toFixed(2) > 37.2) {
        res.json({
          result: "error",
          status: "denied",
          message: "student has higher temperature",
          data: {
            firstname: userId.firstname,
            lastname: userId.lastname,
            mi: userId.middlename,
            classfication: userId.types,
            date: user.date,
            dataUser: "denied",
            temperature: temperature,
            message: "student has higher temperature",
          },
        });
      }
    } else if (
      user.symptoms == "no" &&
      user.hotspots == "no" &&
      user.expose == "no" &&
      user.together == "no"
    ) {
      await UpdateForm.update(
        { timesIn: counting },
        { where: { RegisterFormId: id, date: date } }
      );
      res.json({
        result: "success",
        status: "approved",
        message: "student has no problem",
        data: {
          firstname: userId.firstname,
          lastname: userId.lastname,
          mi: userId.middlename,
          classfication: userId.types,
          date: user.date,
          dataUser: "approved",
          temperature: temperature,
          timesIn: counting,
          message: "student has no problem",
        },
      });
    } else if (
      (user.symptoms == "yes") |
      (user.hotspots == "yes") |
      ((user.travel == "yes") | (user.expose == "yes")) |
      (user.together == "yes")
    ) {
      res.json({
        result: "denied",
        status: user.symptoms,
        message: "student has symptoms",
        data: {
          firstname: userId.firstname,
          lastname: userId.lastname,
          mi: userId.middlename,
          classfication: userId.types,
          date: user.date,
          dataUser: "denied",
          temperature: temperature,
          message: "student has symptoms",
        },
      });
    }
  } catch (error) {
    const userId = await RegisterForm.findByPk(id);
    if (userId) {
      return res.json({
        result: "error",
        status: "denied",
        message: "Please fill up the form",
        data: {
          firstname: userId.firstname,
          lastname: userId.lastname,
          mi: userId.middlename,
          classfication: userId.types,
          date: date,
          dataUsr: "denied",
          temperature: temperature,
          message: "Please fill up the form",
        },
      });
    } else {
      return res.json({
        result: "denied",
        status: "Unregistered",
        message: "No user available. Please register",
        data: {
          dataUser: "Unregistered",
          message: "No user available. Please register",
        },
      });
    }
  }
});

router.get("/dates", async (req, res) => {
  const username = req.query.username;
  const startedDate = req.query.startedDate;
  const endDate = req.query.endDate;
  try {
    const user = await UpdateForm.findAll({
      where: {
        [Op.or]: {
          firstname: {
            [Op.like]: `%${username}%`,
          },
          username: {
            [Op.like]: `%${username}%`,
          },
        },
        date: { [Op.between]: [startedDate, endDate] },
      },
      order: [["id", "DESC"]],
    });
    res.json(user);
    console.log(startedDate);
  } catch (error) {
    res.json({ msg: "Failed" });
    console.log(startedDate);
  }
});
module.exports = router;
