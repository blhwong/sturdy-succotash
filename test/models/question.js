const { expect } = require('chai');
const Question = require('../../models/question');

describe('Question model', () => {
  it('has correct attributes', () => {
    const questionValue = 'Do you like coffee?';
    const question = new Question(questionValue);
    expect(question.value).to.equal(questionValue);
    expect(question.true).to.equal(0);
    expect(question.false).to.equal(0);
  });

  it('will error on bad inputs', () => {
    expect(() => new Question()).to.throw('Expect string');
    expect(() => new Question(null)).to.throw('Expect string');
    expect(() => new Question(123)).to.throw('Expect string');
  });
});
