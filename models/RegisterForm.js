module.exports = (sequelize, Datatypes) => {
  const RegisterForm = sequelize.define("RegisterForm", {
    id: {
      type: Datatypes.UUID,
      defaultValue: Datatypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    middlename: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    age: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    contact: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    types: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    address: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    vaccinated: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    vaccine: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    people: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    course: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    year: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    grade: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    designation: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    inviActive: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
    },
  });

  RegisterForm.associate = (models) => {
    RegisterForm.hasMany(models.UpdateForm, {
      onDelete: "cascade",
    });
  };

  return RegisterForm;
};
