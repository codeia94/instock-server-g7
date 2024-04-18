const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");


router.route("/")
	.get(warehouseController.index)
	.delete(warehouseController.remove);

router.route("/")
	.post(warehouseController.add);

router.route("/:id")
	.get(warehouseController.findId);

module.exports = router;