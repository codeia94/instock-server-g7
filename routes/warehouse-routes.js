const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");


router.route("/")
	.get(warehouseController.index)

router.route("/:id")
	.delete(warehouseController.remove);

// Can we put this route together with the route on line 5?
router.route("/")
	.post(warehouseController.add);

router.route("/:id")
	.put(warehouseController.edit)	
	.get(warehouseController.findId);

router.route("/:id/inventories")
	.get(warehouseController.warehouseInventories);

module.exports = router;