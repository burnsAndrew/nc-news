const createRef = (input, paramOne, paramTwo) => {
  const result = {};

  for (let i = 0; i < input.length; i++) {
    result[input[i][paramOne]] = input[i][paramTwo];
  }
  return result;
};

const renameKeys = (input, keyToChange, newKey) => {
  return input.map(element => {
    const newObj = {};

    Object.keys(element).forEach(key => {
      const value = element[key];

      if (key === keyToChange) {
        newObj[newKey] = value;
      } else {
        newObj[key] = value;
      }
    });
    return newObj;
  });
};

module.exports = { createRef, renameKeys };
