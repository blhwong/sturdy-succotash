class Survey {
  constructor(name, questions) {
    const errors = [];
    if (typeof name !== 'string') {
      errors.push('Expect string for survey name');
    }
    if (!Array.isArray(questions)) {
      errors.push('Expect array of questions');
    }
    if (errors.length > 0) {
      throw new Error(errors.join('. '));
    }
    this.name = name;
    this.questions = questions.reduce((acc, curr) => {
      acc[curr.value] = curr;
      return acc;
    }, {});
  }
}

module.exports = Survey;