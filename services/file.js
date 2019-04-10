const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const defaultFileName = './data.json';

const saveSurvey = (survey, fileName) => {
  const target = fileName || defaultFileName;
  return fs.openAsync(target, 'wx')
    .then(() => {
      const surveys = {};
      surveys[survey.name] = survey;
      return fs.writeFileAsync(target, JSON.stringify(surveys, null, 2));
    })
    .catch((error) => {
      if (error.code === 'EEXIST') {
        return fs.readFileAsync(target)
          .then((json) => {
            const surveys = JSON.parse(json);
            if (surveys[survey.name]) {
              return Promise.reject(new Error(`Survey with name ${survey.name} already exists`));
            }

            const newSurveys = { ...surveys };
            newSurveys[survey.name] = survey;
            return fs.writeFileAsync(target, JSON.stringify(newSurveys, null, 2));
          });
      }
      console.error(`saveSurvey- Error: ${error}`);
      throw error;
    });
};

const getSurvey = (name, fileName) => {
  const target = fileName || defaultFileName;
  return fs.openAsync(target, 'r')
    .then(() => {
      return fs.readFileAsync(target)
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
