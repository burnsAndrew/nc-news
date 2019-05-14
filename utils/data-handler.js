const dateConverter = input => {
  if (input.length === 0) return [];
  else
    return input.map(date => {
      date.created_at = new Date(date.created_at).toDateString();
      return date;
    });
};

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

const formatData = (data, lookup) => {
  return data.map(element => {
    let newObj = {};
    Object.keys(element).forEach(key => {
      const value = data[key];

      if (key === "belongs_to") {
        newObj["article_id"] = lookup[element.belongs_to];
      } else {
        newObj[key] = value;
      }
    });
    return newObj;
  });
};

module.exports = { dateConverter, createRef, renameKeys, formatData };
