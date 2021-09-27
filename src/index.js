const app = require("./app");
const fetchFiles = require("./lib/library");
const library = require("./lib/library");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
