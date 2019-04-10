const FileService = require('../services/file');
const handleError = require('../util/handleError');

module.exports = (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).send('No name in search query');
  }
  return FileService.getSurvey(name)
    .then((survey) => {
      if (!survey) {
        return res.status(404).send(`Survey ${name} does not exist`);
      }
      return res.json(survey);
    })
    .catch((error) => {
      if (error.code === 'ENOENT') {
        return res.status(404).send(`Survey ${name} does not exist`);
      }
      return handleError(res, error);
    });
};
