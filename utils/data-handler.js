const createRef = (input, paramOne, paramTwo) => {
  const result = {};

  for (let i = 0; i < input.length; i++) {
    result[input[i][paramOne]] = input[i][paramTwo];
  }
  return result;
};

module.exports = { createRef };
