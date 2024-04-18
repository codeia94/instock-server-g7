require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const warehouseRouter = require("./routes/warehouse-routes");
const inventoryRouter = require("./routes/inventory-routes"); 
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


// Not sure if this is necessary since /warehouses is already defined in warehouseRouter
app.use("/", warehouseRouter);

app.use("/warehouses", warehouseRouter);
app.use("/api/inventories", inventoryRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});