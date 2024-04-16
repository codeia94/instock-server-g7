require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


router.get("/", (_req, res) => {
    res.send("Hello world!");
});

app.use("/", router);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});