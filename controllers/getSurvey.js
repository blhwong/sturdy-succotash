const FileService = require('../services/file');

module.exports = (req, res) => {
  const { name } = req.query;
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
      return res.status(500).send(error);
    });
};
