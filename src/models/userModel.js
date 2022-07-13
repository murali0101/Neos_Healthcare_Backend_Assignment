let users = require("../data/users.json");

const { writeDataToFile } = require("../utils/extraFunctions");

const path = require("path");

// getting data or readFile function from users.json files  ----------------------------------------------------------

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

// creating  data or writeFile function in users.json files function   ----------------------------------------------------------

function create(user) {
  return new Promise((resolve, reject) => {
    const newUser = { id: String(Date.now()), ...user };
    users.push(newUser);
    writeDataToFile(path.join(__dirname, "../data/users.json"), users);
    resolve(newUser);
  });
}

// finding user id function from users.json files   ----------------------------------------------------------

function findById(id) {
  return new Promise((resolve, reject) => {
    const user = users.find((ele) => ele.id === id);
    resolve(user);
  });
}

// finding user email function from users.json files   ----------------------------------------------------------

function findByEmail(email) {
  return new Promise((resolve, reject) => {
    const user = users.find((ele) => ele.email === email);
    resolve(user);
  });
}

// updating  data or writeFile function in users.json files   ----------------------------------------------------------

function update(id, user) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((ele) => ele.id === id);
    users[index] = { id, ...user };
    writeDataToFile(path.join(__dirname, "../data/users.json"), users);
    resolve(users[index]);
  });
}

// removing  data or writeFile function in users.json files   ----------------------------------------------------------

function remove(id) {
  return new Promise((resolve, reject) => {
    let index = null;
    users.forEach((ele, ind) => {
      if (ele.id === id) {
        index = ind;
      }
    });
    users.splice(index, 1);
    writeDataToFile(path.join(__dirname, "../data/users.json"), users);
    resolve();
  });
}

module.exports = {
  findAll,
  create,
  findById,
  findByEmail,
  update,
  remove,
};
