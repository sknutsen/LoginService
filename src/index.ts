import express from "express";
import { port } from "./constants";
import { users } from "./routes/users";

const app = express();
const usersRoute: users = new users();

// app.listen(port, () => {
//     console.log(`App listening on http://localhost:${port}`);
// });