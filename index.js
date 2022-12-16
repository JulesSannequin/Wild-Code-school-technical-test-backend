const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost/Argonautes");

const Argonaute = mongoose.model("Argonaute", {
  name: String,
});

app.post("/create", async (req, res) => {
  try {
    // console.log(req.body);
    const newArgonaute = new Argonaute({
      name: req.body.name,
    });
    await newArgonaute.save();
    res.json(newArgonaute);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("server has started");
});
