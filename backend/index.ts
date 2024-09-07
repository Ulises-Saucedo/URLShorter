import "dotenv/config";
import express from "express";
import cors from "cors";
import { routes } from "./src/routes";
import { connectionToDatabase } from "./src/database/db";

(async () => {
  await connectionToDatabase();
})();

const PORT: number = parseInt(process.env.PORT || "3000", 10);
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",").map((origin) => origin) || "";
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

app.use("/api/user", routes.user);
app.use("/api/url", routes.url);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
