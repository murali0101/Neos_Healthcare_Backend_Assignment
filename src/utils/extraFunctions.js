const fs = require("fs");
const { createHmac } = require("node:crypto");

function writeDataToFile(filename, content) {
  fs.writeFile(filename, JSON.stringify(content, null, 2), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

function hashPassword(password) {
    const hash = createHmac("sha256", password)
    .update("I love cupcakes")
    .digest("hex");
    return hash;
}

module.exports = {
  writeDataToFile,
  getPostData,
  hashPassword,
};
