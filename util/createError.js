module.exports = (message) => {
  const error = new Error(message);
  error.code = 'bad request';
  return error;
};
