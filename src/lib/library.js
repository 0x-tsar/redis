const axios = require("axios");

let result = [];

const fetchFiles = async (id) => {
  if (!id) {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos/"
    );
    const result = data.filter((el, i) => i < 10);
    return result;
  } else {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    return data;
  }
};

module.exports = fetchFiles;
