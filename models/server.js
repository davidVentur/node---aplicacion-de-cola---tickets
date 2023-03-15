import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import { socketController } from "../sockets/controller.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // Middlewares
    this.middlewares();
    // Rutas
    this.routes();
    //Server socket
    this.server = createServer(this.app);
    this.io = new SocketServer(this.server);
    //configuracion de socket
    this.sockets();
  }

  middlewares() {
    // Directorio publico
    this.app.use(express.static("public"));
    // cors
    this.app.use(cors());
  }

  routes() {}

  sockets() {
    this.io.on("connection", socketController);
  }

  listener() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto: ${this.port}`);
    });
  }
}

export { Server };
