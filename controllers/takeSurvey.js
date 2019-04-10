const FileService = require('../services/file');
const SurveyService = require('../services/survey');

module.exports = (req, res) => {
  const { name, answers } = req.body;
  return FileService.getSurvey(name)
    .then((survey) => {
      const surveyAfter = SurveyService.takeSurvey(survey, answers);
      return FileService.saveSurvey(surveyAfter);
    })
    .then(() => res.sendStatus(200))
    .catch((error) => {
      if (error.code === 'ENOENT') {
        return res.sendStatus(404);
      }
      return res.status(500).send(error);
    });
};
