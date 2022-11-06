const { json } = require("express");

const express = require(express);
const cors = require(cors);

const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(json());

app.listen(port, () => {
  console.log(` Car Doctor server running on ${port}`);
});
