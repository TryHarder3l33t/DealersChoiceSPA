const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/dealers_choice_spa"
);

const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const Person = sequelize.define("person", {
  name: { type: Sequelize.DataTypes.STRING },
  age: { type: Sequelize.DataTypes.STRING },
});

const init = async () => {
  try {
    await sequelize.sync({ force: true });
    await Person.create({ name: "Eric", age: 24 });
    await Person.create({ name: "Dariusz", age: 33 });
    await Person.create({ name: "Alicia", age: 18 });
    await Person.create({ name: "Dariusz", age: 26 });
    await Person.create({ name: "Alicia", age: 25 });
    await Person.create({ name: "Eric", age: 31 });
  } catch (error) {
    console.log(error);
  }
};

//Make it aware of static files on the server so you can use index files etc this one is the files in src
app.use("/src", express.static(path.join(__dirname, "src")));

//send file index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/people", async (req, res) => {
  try {
    const peoplee = await Person.findAll();
    res.send(peoplee);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/people/:id", async (req, res) => {
  try {
    const getem = await Person.findByPk(req.params.id);
    if (getem.length != 0) {
      res.send(getem);
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/people/:id", async (req, res) => {
  console.log("Trying to delete");
  try {
    const historyy = await Person.findByPk(req.params.id);
    if (historyy.length !== 0) {
      await historyy.destroy();

      console.log(`This person is history ${historyy.name}`);
      res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
  }
});

init();
