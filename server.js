'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors')

const PORT = process.env.PORT;

app.use(cors());




app.listen(PORT, () => {
  console.log(`301 is rockin on ${PORT}!`)
})
