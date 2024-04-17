require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const warehouseRouter = require("./routes/warehouse-routes");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.use("/api/warehouses", warehouseRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});