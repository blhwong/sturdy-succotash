const createError = require('../util/createError');

class Question {
  constructor(value) {
    if (typeof value !== 'string') {
      throw createError('Expect string');
    }
    this.value = value;
    this.true = 0;
    this.false = 0;
  }
}

module.exports = Question;
