const User = require("../models/userModel");

const { getPostData } = require("../utils/extraFunctions");

async function getUsers(req, res) {
  try {
    const user = await User.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

async function createUser(req, res) {
  try {
    const body = await getPostData(req);

    const { name, email, password } = JSON.parse(body);

    const user = {
      name,
      email,
      password,
    };

    const newUser = await User.create(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      const body = await getPostData(req);

      const { name, email, password } = JSON.parse(body);

      const userData = {
        name: name || user.name,
        email: email || user.email,
        password: password || user.password,
      };

      const updateduser = await User.update(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updateduser));
    }
  } catch (error) {
    console.log(error);
  }
}


async function deleteUser(req, res, id) {
    try {
        const user = await User.findById(id)

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        } else {
            await User.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `User ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
