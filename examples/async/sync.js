const fs = require("fs");

try {
  const files = fs.readdirSync(".");
  console.log("files: ", files);
} catch (err) {
  console.log("err: ", err);
}
