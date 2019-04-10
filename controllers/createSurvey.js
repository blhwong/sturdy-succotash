const FileService = require('../services/file');
const SurveyService = require('../services/survey');

module.exports = (req, res) => {
  const { name, questionValues } = req.body;
  const survey = SurveyService.createSurvey(name, questionValues);
  return FileService.saveSurvey(survey)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.error({ error });
      if (error.includes('already exists')) {
        return res.status(400).send(error);
      }
      return res.status(500).send(error);
    });
};
