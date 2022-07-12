const http = require("http");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("./controllers/userController");
const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: `welcome to "neos-healthcare" backend (server)` }))
  } else if (req.url === "/signup" && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url === "/signup" && req.method === "POST") {
    createUser(req, res);
  } else if (req.url.match(/\/signup\/\w+/) && req.method === "PATCH") {
    const id = req.url.split("/")[2];
    updateUser(req, res, id);
  } else if (req.url.match(/\/signup\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[2];
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`listening on port ${PORT} ...................`)
);

module.exports = server;
