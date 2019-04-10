global.Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const removeFile = (fileName) => {
  return fs.unlinkAsync(fileName)
    .catch((error) => {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    });
};

module.exports = {
  removeFile,
};
