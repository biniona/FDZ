import express from "express";
import f from "./fileActions.js";
import cors from "cors";

import { Cards } from "./Model.js";

const app = express();
app.use(cors());

const port = 8080; // default port to listen

const ZETTL_PATH = process.env.ZETTL_DIR;

// define a route handler for the default home page
app.get("/get-notes", (req, res) => {
    Promise.resolve(f(ZETTL_PATH)).then((v: any[]) => {
        res.json(v);
    });
});

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
