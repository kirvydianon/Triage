const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/Auth");

const { UpdateForm } = require("../models");

router.post("/", async (req, res) => {
  const {
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
  } = req.body;
  await UpdateForm.create({
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
    return res.json("Please Update your form");
  } else {
    res.json(user);
  }
});

router.put("/temperature", async (req, res) => {
  const { temperature, id } = req.body;
  const date = new Date().toJSON().split("T")[0];

  await UpdateForm.update(
    { temperature: temperature },
    { where: { RegisterFormId: id, date: date } }
  );

  const user = await UpdateForm.findOne({
    where: { RegisterFormId: id, date: date },
  });
  if (user) {
    res.json(user);
  } else {
    res.json("You have not update your form please update it first");
  }
});

module.exports = router;
