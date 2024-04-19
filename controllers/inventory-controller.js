const knex = require('knex')(require("../knexfile"));

const getAllInventoryItems = async (_req, res) => {
  try {
    const inventoryItems = await knex('inventories')
      .select(
        'inventories.id', 
        'inventories.item_name', 
        'inventories.description', 
        'inventories.category', 
        'inventories.status', 
        'inventories.quantity', 
        'inventories.created_at', 
        'inventories.updated_at',
        'warehouses.warehouse_name'  
      )
      .join('warehouses', 'inventories.warehouse_id', 'warehouses.id'); 

    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(400).send(`Error getting inventory items: ${error}`);
  }
};


const add = async (req, res) => {
  const { warehouse_id, item_name, description, category, status, quantity } = req.body;

  if (!warehouse_id || !item_name || !description || !category || !status || !quantity ) {
    return res.status(400).json({
      message: "Please provide missing data"
    });
  }

  const warehouse = await knex("warehouses")
    .where({id : warehouse_id})
    .first();

  if (!warehouse) {
    console.log("No warehouse id match");
    return res.status(400).json({
      message: "Invalid warehouse id"
    })
  }

  if (typeof quantity !== 'number') {
    return res.status(400).json({
      message: "Quantity value must be a number"
    })
  }

  try {
    const result = await knex("inventories")
      .insert({
        id:null,
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity
      });
    
    const [ id ] = result;
    const newRecord = await knex("inventories")
      .where({ id })
      .first()
    
    res.status(201).json(newRecord)
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory item: ${error}`
    });
  }
};

const remove = async (req, res) => {
	try {
		const inventory = await knex("inventories")
			.where({ id: req.params.id })
			.delete();
		
			if (!inventory) {
			return res.status(404).json({message: `Could not find inventory: ${req.params.id}`})
		}

		res.status(204).json({message: `Successfully deleted inventory: ${req.params.id}`})
	} catch (error) {
		res.status(404).send(`Error deleting inventory: ${error}`);
	}
};

module.exports = {
  getAllInventoryItems, add,
  remove
};
