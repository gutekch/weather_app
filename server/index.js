const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 3001;

const API_KEY = '5f95eb9d5b53dc4d8e92a5cbc32e1ad5';


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
