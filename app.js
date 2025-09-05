import express from "express";

import userRoutes from "./src/routes/user.routes.js";
import tagRoutes from "./src/routes/tag.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import articleRoutes from "./src/routes/article.routes.js";
import articleTagRoutes from "./src/routes/article_tag.routes.js";

import { start } from "./src/config/database.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", tagRoutes);
app.use("/api", profileRoutes);
app.use("/api", articleRoutes);
app.use("/api", articleTagRoutes);

app.listen(PORT, async() => {
    await start();
    console.log("-------------------")
    console.log("Servidor operativo")
    console.log("-------------------")
})