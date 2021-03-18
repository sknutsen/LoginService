import "reflect-metadata";
import express from "express";
require('dotenv').config()
import { port, __dev__, __prod__ } from "./constants";
import { createConnection } from "typeorm";
import { join } from "path";
import cookieParser from "cookie-parser";
import routes from "./routes";

const main = async () => {
    const conn = await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        database: __prod__ ? 'AuthDB' : 'AuthDBDev',
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        entities: [join(__dirname, "./entities/*.*")],
        logging: !__prod__,
        synchronize: !__prod__,
    });

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use("/", routes);

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`);
    });
};

main();