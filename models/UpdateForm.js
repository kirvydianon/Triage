module.exports = (sequelize, Datatypes) => {
  const UpdateForm = sequelize.define("UpdateForm", {
    purpose: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    symptoms: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    fever: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    cough: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    headache: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    diarrhea: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    bodyPain: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    lostSmell: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    skin: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    shortness: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    colds: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    sore: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    hotspots: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    together: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    expose: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    travel: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    where: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    updateActive: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
    },
    date: { type: Datatypes.DATEONLY },
    temperature: {
      type: Datatypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });
  UpdateForm.associate = (models) => {
    UpdateForm.belongsTo(models.RegisterForm, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return UpdateForm;
};
