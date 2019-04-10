module.exports = (res, error) => {
  if (error.code === 'bad request') {
    return res.status(400).send(error.message);
  }
  return res.status(500).send(error);
};
