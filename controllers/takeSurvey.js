const FileService = require('../services/file');
const SurveyService = require('../services/survey');

module.exports = (req, res) => {
  const { name, answers } = req.body;
  return FileService.getSurvey(name)
    .then((survey) => {
      if (!survey) {
        return res.status(404).send(`Survey ${name} does not exist`);
      }
      const surveyAfter = SurveyService.takeSurvey(survey, answers);
      return FileService.saveSurvey(surveyAfter, true)
        .then(() => res.sendStatus(200));
    })
    .catch(error => res.status(500).send(error));
};
