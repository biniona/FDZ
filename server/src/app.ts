import express from "express";
import f from "./fileActions.js";
import sf from "./Actions/saveFile.js";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json({ type: ["application/json", "application/csp-report"] }));

const port = 8080; // default port to listen

const ZETTL_PATH = process.env.ZETTL_DIR;

// define a route handler for the default home page
app.get("/get-notes", (req, res) => {
    Promise.resolve(f(ZETTL_PATH)).then((v: any[]) => {
        res.json(v);
    });
});

// define a route handler for the default home page
app.post("/save", (req, res) => {
    const filePath: string = req.body.filePath;
    const content: string = req.body.content;
    if (filePath === undefined || content === undefined) {
        res.sendStatus(404);
    }
    const savePath = path.join(ZETTL_PATH, filePath);
    Promise.resolve(sf(savePath, content)).then(() => {
        res.sendStatus(200);
    });
});

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
