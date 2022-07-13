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

const patchValidator = (obj) => {
  const { name, email, password } = JSON.parse(obj);

  let isEmail = email?.split("").lastIndexOf("@");

  let isEmailDot = email?.split("").lastIndexOf(".");

  if (!!name && name.length <= 3) {
    return {
      status: false,
      error: "Name length should be greater then 3 alphabets ",
    };
  } else if (!!email && email.length < 3) {
    return {
      status: false,
      error: "Please add a valid email id",
    };
  } else if (isEmail === -1) {
    return {
      status: false,
      error: "Invalid email id, '@' is missing",
    };
  } else if (isEmailDot === -1) {
    return {
      status: false,
      error: "Invalid email id, '.' is missing",
    };
  } else if (!!email && isEmail === email.length - 1) {
    return {
      status: false,
      error: "'@' shouldn't be at the end",
    };
  } else if (!!email && isEmailDot === email.length - 1) {
    return {
      status: false,
      error: "'.' shouldn't be at the end",
    };
  } else if (!!password && password.length < 6) {
    return {
      status: false,
      error: "Password length should be greater then 5 characters",
    };
  } else {
    return {
      status: true,
    };
  }
};

const signupValidator = (obj) => {
  const { name, email, password } = JSON.parse(obj);
  let isEmail = email?.split("").lastIndexOf("@");
  let isEmailDot = email?.split("").lastIndexOf(".");

  if (name.length <= 3) {
    return {
      status: false,
      error: "Name length should be greater then 3 alphabets ",
    };
  } else if (email.length < 3) {
    return {
      status: false,
      error: "Please add a valid email id",
    };
  } else if (isEmail === -1) {
    return {
      status: false,
      error: "Invalid email id, '@' is missing",
    };
  } else if (isEmailDot === -1) {
    return {
      status: false,
      error: "Invalid email id, '.' is missing",
    };
  } else if (isEmail === email.length - 1) {
    return {
      status: false,
      error: "'@' shouldn't be at the end",
    };
  } else if (isEmailDot === email.length - 1) {
    return {
      status: false,
      error: "'.' shouldn't be at the end",
    };
  } else if (password.length < 6) {
    return {
      status: false,
      error: "Password length should be greater then 5 characters",
    };
  } else {
    return {
      status: true,
    };
  }
};

const loginValidator = (obj) => {
  const { name, email, password } = JSON.parse(obj);
  let isEmail = email?.split("").lastIndexOf("@");
  let isEmailDot = email?.split("").lastIndexOf(".");

  if (email.length < 3) {
    return {
      status: false,
      error: "Please add a valid email id",
    };
  } else if (isEmail === -1) {
    return {
      status: false,
      error: "Invalid email id, '@' is missing",
    };
  } else if (isEmailDot === -1) {
    return {
      status: false,
      error: "Invalid email id, '.' is missing",
    };
  } else if (isEmail === email.length - 1) {
    return {
      status: false,
      error: "'@' shouldn't be at the end",
    };
  } else if (isEmailDot === email.length - 1) {
    return {
      status: false,
      error: "'.' shouldn't be at the end",
    };
  } else if (password.length < 6) {
    return {
      status: false,
      error: "Password length should be greater then 5 characters",
    };
  } else {
    return {
      status: true,
    };
  }
};

module.exports = {
  writeDataToFile,
  getPostData,
  hashPassword,
  signupValidator,
  loginValidator,
  patchValidator,
};
