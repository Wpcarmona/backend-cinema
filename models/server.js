const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.app.use(express.json({ limit: "50mb", extended: true }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));

    this.path = {
      usuarios: "/cinema/usuarios",
      auth: "/cinema/auth",
      favorite: "/cinema/favorite",
    };

    this.conectarDB();

    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {

    this.app.use(
      cors()
    );

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.path.auth, require("../routes/auth"));
    this.app.use(this.path.usuarios, require("../routes/user"));
    this.app.use(this.path.favorite, require('../routes/favorite'));
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = Server;
