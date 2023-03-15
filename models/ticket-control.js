import data from "../db/data.json" assert { type: "json" };
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];
    this.dbPath = "../db/data.json";
    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
  }

  init() {
    if (data.hoy === this.hoy) {
      this.tickets = data.tickets;
      this.ultimo = data.ultimo;
      this.ultimos4 = data.ultimos4;
    } else {
      this.guardarDb();
    }
  }

  guardarDb() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.guardarDb();
    return "Ticket " + this.ultimo;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return null;
    }
    const ticket = this.tickets.shift();
    ticket.escritorio = escritorio;
    this.ultimos4.unshift(ticket);
    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1);
    }
    this.guardarDb();
    return ticket;
  }
}

export { TicketControl };
