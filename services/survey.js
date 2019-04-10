const Survey = require('../models/survey');
const Question = require('../models/question');
const createError = require('../util/createError');

const createSurvey = (name, questionValues) => {
  const questions = questionValues.map(value => new Question(value));
  const survey = new Survey(name, questions);
  return survey;
};

const takeSurvey = (survey, answers) => {
  const surveyAfter = { ...survey };
  Object.entries(answers).forEach(([question, answer]) => {
    if (!surveyAfter.questions[question]) {
      throw createError('Question not found in survey');
    }
    if (answer) {
      surveyAfter.questions[question].true += 1;
    } else {
      surveyAfter.questions[question].false += 1;
    }
  });
  return surveyAfter;
};

module.exports = {
  createSurvey,
  takeSurvey,
};
