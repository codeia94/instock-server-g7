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

module.exports = {
  getAllInventoryItems
};
