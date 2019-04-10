const chai = require('chai');
const chaiHttp = require('chai-http');
const { removeFile } = require('./util');
const app = require('../app');

const { expect } = chai;
chai.use(chaiHttp);

describe('E2E tests', () => {
  const testFile = './test.json';
  const name = 'testSurvey';
  const questionValues = ['Do you like coffee?', 'Do you like shopping?'];
  const answers = {
    [questionValues[0]]: true,
    [questionValues[1]]: false,
  };

  const createSurvey = (variables) => {
    return chai.request(app)
      .post('/survey/create')
      .send(variables);
  };

  const getSurvey = (n) => {
    return chai.request(app)
      .get(`/survey?name=${n}`);
  };

  const takeSurvey = (variables) => {
    return chai.request(app)
      .post('/survey/take')
      .send(variables);
  };

  before(() => removeFile(testFile));

  after(() => removeFile(testFile));

  it('will not find survey', () => {
    return getSurvey(name)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.error.text).to.equal(`Survey ${name} does not exist`);
      })
      .catch((error) => {
        throw error;
      });
  });

  it('can create a survey', () => {
    return createSurvey({ name, questionValues })
      .then((res) => {
        expect(res).to.have.status(201);
      })
      .catch((error) => {
        throw error;
      });
  });

  it('will not create a duplicate survey', () => {
    return createSurvey({ name, questionValues })
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.error.text).to.equal(`Survey ${name} already exists`);
      })
      .catch((error) => {
        throw error;
      });
  });

  it('can take a survey', () => {
    return takeSurvey({ name, answers })
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((error) => {
        throw error;
      });
  });

  it('will not take non-existent surveys', () => {
    const nonExistent = 'non-existent';
    return chai.request(app)
      .post('/survey/take')
      .send({ name: nonExistent, answers })
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.error.text).to.equal(`Survey ${nonExistent} does not exist`);
      })
      .catch((error) => {
        throw error;
      });
  });

  it('can get survey results', () => {
    return getSurvey(name)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(name);
        expect(res.body.questions[questionValues[0]].true).to.equal(1);
        expect(res.body.questions[questionValues[0]].false).to.equal(0);
        expect(res.body.questions[questionValues[1]].true).to.equal(0);
        expect(res.body.questions[questionValues[1]].false).to.equal(1);
      })
      .catch((error) => {
        throw error;
      });
  });

  it('will not get non-existent surveys', () => {
    const nonExistent = 'non-existent';
    return getSurvey(nonExistent)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.error.text).to.equal(`Survey ${nonExistent} does not exist`);
      })
      .catch((error) => {
        throw error;
      });
  });

  it('will error on non-existent questions', () => {
    return takeSurvey({ name, answers: { 'Non-existent question': true } })
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.error.text).to.equal('Question not found in survey');
      })
      .catch((error) => {
        throw error;
      });
  });

  it('will error on bad answers', () => {
    const badAnswers = { ...answers };
    badAnswers[questionValues[0]] = 123;
    badAnswers[questionValues[0]] = 'abc';
    return takeSurvey({ name, answers: badAnswers })
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.error.text).to.equal('Expect boolean answer');
      })
      .catch((error) => {
        throw error;
      });
  });

  it('will error on taking survey without name', () => {
    return takeSurvey({ name: '', answers })
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.error.text).to.equal('Missing param survey name');
      })
      .catch((error) => {
        throw error;
      });
  });

  it('will error with nothing in search query', () => {
    return getSurvey('')
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.error.text).to.equal('No name in search query');
      })
      .catch((error) => {
        throw error;
      });
  });
});
