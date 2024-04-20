const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

router.route("/")
	.get(inventoryController.getAllInventoryItems)
	.post(inventoryController.add);

router.route('/:id')
	.get(inventoryController.getInventoryItemById)
	.delete(inventoryController.remove)
	.put(inventoryController.edit);	

module.exports = router;
