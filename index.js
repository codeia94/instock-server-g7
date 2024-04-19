require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const inventoryRouter = require("./routes/inventory-routes"); 
const warehouseRouter = require("./routes/warehouse-routes");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


// Not sure if this is necessary since /warehouses is already defined in warehouseRouter

// warehouseRouter defined twice so it was causing conflict?
// app.use("/", warehouseRouter);

app.use("/api/inventories", inventoryRouter);
app.use("/api/warehouses", warehouseRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});