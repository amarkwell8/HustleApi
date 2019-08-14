const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/hustleAPI');
const port = process.env.PORT || 3000;
const Exercise = require('./models/exerciseModel');
const exerciseRouter = require('./routes/exerciseRouter')(Exercise);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', exerciseRouter);
app.get('/', (request, response) =>{
    response.send('Welcome to Hustle API');
});

app.listen(port, () => {
    console.log(`Running on port: ${port}`)
});