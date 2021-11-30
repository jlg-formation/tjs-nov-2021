const fs = require("fs");

try {
  const files = fs.readdir(".");
  console.log("files: ", files);
  const content = fs.readFile(files[0], { encoding: "utf-8" });
  console.log("content: ", content);
} catch (err) {
  console.log("err: ", err);
}
