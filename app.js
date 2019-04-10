const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {
  createSurvey,
  getSurvey,
  takeSurvey,
} = require('./controllers');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/survey', getSurvey);

app.post('/survey/create', createSurvey);
app.post('/survey/take', takeSurvey);

app.get('*', (req, res) => {
  res.send('Hello world!');
});

module.exports = app;
