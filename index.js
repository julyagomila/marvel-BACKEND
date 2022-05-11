const express = require("express");
const app = express();
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
app.use(formidableMiddleware());
app.use(cors());
const axios = require("axios");
const { rmSync } = require("fs");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

app.get("/getAllCharacters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${API_KEY}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("*", (req, res) => {
  res.json("page introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
