import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";
import Connection from "./database/db.js";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import users from "./routes/users.js";
import PasswordReset from "./routes/passwordReset.js";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const PORT = process.env.PORT;

app.use("/api", router);
app.use("/api/users", users);
app.use("/api/password-reset", PasswordReset);

Connection();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:8000`);
});
