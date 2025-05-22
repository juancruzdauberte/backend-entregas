import mongoose from "mongoose";
import config from "./config.js";

export async function connectDb() {
  try {
    await mongoose.connect(config.DB_URI);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error al conectar la base de datos", error);
  }
}
