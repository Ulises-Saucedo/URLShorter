import "dotenv/config";
import express from "express";
import cors from "cors";
import { routes } from "./src/routes";
import { connectionToDatabase } from "./src/database/db";

(async () => {
  await connectionToDatabase();
})();

const PORT: number = parseInt(process.env.PORT || "3000", 10);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", routes.user);
app.use("/api/url", routes.url);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
