const FileService = require('../services/file');
const SurveyService = require('../services/survey');

module.exports = (req, res) => {
  const { name, questionValues } = req.body;
  const survey = SurveyService.createSurvey(name, questionValues);
  return FileService.saveSurvey(survey)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      if (error.message && error.message.includes('already exists')) {
        return res.status(400).send(error.message);
      }
      return res.status(500).send(error);
    });
};
