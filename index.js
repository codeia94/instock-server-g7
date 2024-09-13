require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const inventoryRouter = require("./routes/inventory-routes"); 
const warehouseRouter = require("./routes/warehouse-routes");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.use("/instock-client/inventories", inventoryRouter);
app.use("/instock-client/warehouses", warehouseRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});