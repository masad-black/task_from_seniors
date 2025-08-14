const express = require("express");
require("dotenv").config();

const app = express();

// * middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`server listning on port:${process.env.PORT}`);
});

module.exports = app;
