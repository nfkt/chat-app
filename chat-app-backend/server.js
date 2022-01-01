const mongoose = require('./loaders/mongoose');
const express = require('express');
const dbUrl = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));
app.use('/', require('./routes/routes'));

const port = process.env.PORT || 3009;

app.listen(port, function() {
  console.log('listening on port 3009');
  mongoose.connect(dbUrl,(err) => {
    console.log('mongodb connected');
  })
})


