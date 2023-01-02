const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb://localhost/Argonautes");

mongoose.set("strictQuery", true);

const Argonaute = mongoose.model("Argonaute", {
  name: String,
});

app.post("/create", async (req, res) => {
  try {
    const argonauteExists = await Argonaute.findOne({
      name: req.body.name,
    });
    if (argonauteExists) {
      res.status(400).json({
        error: {
          message: "eh oh cet argonaute est déja a bord",
        },
      });
    } else {
      const newArgonaute = new Argonaute({
        name: req.body.name,
      });
      await newArgonaute.save();
      res.json(newArgonaute);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.get("/", async (req, res) => {
  try {
    const argonautes = await Argonaute.find();
    res.json(argonautes);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("server has started");
});
