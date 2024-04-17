const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");


router.route("/")
	.get(warehouseController.index)
	.delete(warehouseController.remove);

module.exports = router;