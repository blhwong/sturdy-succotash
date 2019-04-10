const { expect } = require('chai');
const Survey = require('../../models/survey');
const Question = require('../../models/question');

describe('Survey model', () => {
  const name = 'testSurvey';
  const questionValue = 'Do you like soda?';
  const question = new Question(questionValue);

  it('has name and questions attributes', () => {
    const survey = new Survey(name, [question]);
    expect(survey.name).to.equal(name);
    expect(survey.questions[questionValue].value).to.equal(questionValue);
  });

  it('will error on bad inputs', () => {
    expect(() => new Survey(name, question)).to.throw('Expect array');
    expect(() => new Survey(123, [question])).to.throw('Expect string');
    expect(() => new Survey(name, [])).to.throw('at least one');
  });
});
