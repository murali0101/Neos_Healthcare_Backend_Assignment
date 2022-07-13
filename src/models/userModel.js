let users = require("../data/users.json");
const { writeDataToFile } = require("../utils/extraFunctions");
const path = require("path");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

function create(user) {
  return new Promise((resolve, reject) => {
    const newUser = { id: String(Date.now()), ...user };
    users.push(newUser);
    writeDataToFile(path.join(__dirname, "../data/users.json"), users);
    resolve(newUser);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const user = users.find((ele) => ele.id === id);
    resolve(user);
  });
}
function findByEmail(email) {
  return new Promise((resolve, reject) => {
    const user = users.find((ele) => ele.email === email);
    resolve(user);
  });
}

function update(id, user) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((ele) => ele.id === id);
    users[index] = { id, ...user };
    writeDataToFile(path.join(__dirname, "../data/users.json"), users);
    resolve(users[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const user = users.filter((ele) => ele.id !== id);
    console.log('user:', user)
    writeDataToFile(path.join(__dirname, "../data/users.json"), user);
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
