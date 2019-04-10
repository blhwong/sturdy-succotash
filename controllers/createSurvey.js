const FileService = require('../services/file');
const SurveyService = require('../services/survey');
const handleError = require('../util/handleError');

module.exports = (req, res) => {
  const { name, questionValues } = req.body;
  const survey = SurveyService.createSurvey(name, questionValues);
  return FileService.saveSurvey(survey)
    .then(() => res.sendStatus(201))
    .catch(error => handleError(res, error));
};
