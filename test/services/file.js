const { expect } = require('chai');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const SurveyService = require('../../services/survey');
const FileService = require('../../services/file');

describe('File service', () => {
  let testSurvey;
  const testFile = 'test.json';
  const testSurveyName = 'test survey';
  const testQuestions = ['Do you workout 3x a week?', 'Do you sleep 8 hours a night?'];
  beforeEach(() => {
    testSurvey = SurveyService.createSurvey(testSurveyName, testQuestions);
  });

  after(() => {
    return fs.unlinkAsync(testFile);
  });

  it('can save surveys', () => {
    return FileService.saveSurvey(testSurvey, testFile);
  });

  it('can get surveys', () => {
    return FileService.getSurvey(testSurveyName, testFile)
      .then((survey) => {
        expect(survey.name).to.equal(testSurveyName);
      });
  });
});
