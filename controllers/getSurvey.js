const FileService = require('../services/file');

module.exports = (req, res) => {
  const { name } = req.query;
  return FileService.getSurvey(name)
    .then(survey => res.json(survey))
    .catch((error) => {
      if (error.code === 'ENOENT') {
        return res.sendStatus(404);
      }
      return res.status(500).send(error);
    });
};
