import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/urlshorter";

export async function connectionToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error("Error al conectarse a la base de datos: ", error);
  }
}
