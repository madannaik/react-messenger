
import express from "express";
import  upload  from "../middleware/upload.js";
const uploadRouter = express.Router();

export default uploadRouter.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
    return res.send(imgUrl);
});

