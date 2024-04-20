const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

router.route("/")
	.get(inventoryController.getAllInventoryItems)
	.post(inventoryController.add);

router.route("/:id")
	.delete(inventoryController.remove);

router.route("/:id")
	.put(inventoryController.edit);	


module.exports = router;
