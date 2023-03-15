import { Server } from "./models/server.js";
import * as dotenv from "dotenv";
dotenv.config();
const server = new Server();

server.listener();
