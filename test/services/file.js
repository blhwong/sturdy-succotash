const { expect } = require('chai');
const { removeFile } = require('../util');
const SurveyService = require('../../services/survey');
const FileService = require('../../services/file');

describe('File service', () => {
  let testSurvey;
  const testFile = './test.json';
  const testSurveyName = 'test survey';
  const testQuestions = ['Do you workout 3x a week?', 'Do you sleep 8 hours a night?'];
  beforeEach(() => {
    testSurvey = SurveyService.createSurvey(testSurveyName, testQuestions);
  });

  before(() => removeFile(testFile));

  after(() => removeFile(testFile));

  it('can save surveys', () => {
    return FileService.saveSurvey(testSurvey, false);
  });

  it('can get surveys', () => {
    return FileService.getSurvey(testSurveyName)
      .then((survey) => {
        expect(survey.name).to.equal(testSurveyName);
      });
  });
});
