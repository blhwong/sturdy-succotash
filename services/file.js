const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const defaultFileName = './data.json';

const saveSurvey = (survey, fileName = defaultFileName) => {
  return fs.openAsync(fileName, 'wx')
    .then(() => {
      const surveys = {};
      surveys[survey.name] = survey;
      return fs.writeFileAsync(fileName, JSON.stringify(surveys, null, 2));
    })
    .catch((error) => {
      if (error.code === 'EEXIST') {
        return fs.readFileAsync(fileName)
          .then((json) => {
            const surveys = JSON.parse(json);
            if (surveys[survey.name]) {
              return Promise.reject(new Error(`Survey with name ${survey.name} already exists`));
            }

            const newSurveys = { ...surveys };
            newSurveys[survey.name] = survey;
            return fs.writeFileAsync(fileName, JSON.stringify(newSurveys, null, 2));
          });
      }
      console.error(`saveSurvey- Error: ${error}`);
      throw error;
    });
};

const getSurvey = (name, fileName = defaultFileName) => {
  return fs.openAsync(fileName, 'r')
    .then(() => {
      return fs.readFileAsync(fileName)
        .then((surveys) => {
          return JSON.parse(surveys)[name];
        });
    })
    .catch((error) => {
      console.error(`getSurvey- Error: ${error}`);
      throw error;
    });
};

module.exports = {
  getSurvey,
  saveSurvey,
};