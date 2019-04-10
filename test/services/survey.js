const { expect } = require('chai');
const SurveyService = require('../../services/survey');

describe('Survey service', () => {
  let testSurvey;
  const testSurveyName = 'test survey';
  const testQuestions = ['Do you workout 3x a week?', 'Do you sleep 8 hours a night?'];
  beforeEach(() => {
    testSurvey = SurveyService.createSurvey(testSurveyName, testQuestions);
  });

  it('can create a survey', () => {
    const name = 'survey 1';
    const question1 = 'Do you like cookies?';
    const question2 = 'Are you happy?';
    const questions = [question1, question2];
    const survey = SurveyService.createSurvey(name, questions);
    expect(survey.name).to.equal(name);
    expect(survey.questions[question1].value).to.equal(question1);
    expect(survey.questions[question2].value).to.equal(question2);
    expect(Object.keys(survey.questions).length).to.equal(questions.length);
  });

  it('can take a survey', () => {
    const answerValues = [false, true];
    const answers = testQuestions.reduce((acc, curr, idx) => {
      acc[curr] = answerValues[idx];
      return acc;
    }, {});
    const survey = SurveyService.takeSurvey(testSurvey, answers);
    expect(survey.questions[testQuestions[0]].false).to.equal(1);
    expect(survey.questions[testQuestions[0]].true).to.equal(0);
    expect(survey.questions[testQuestions[1]].false).to.equal(0);
    expect(survey.questions[testQuestions[1]].true).to.equal(1);
  });
});
