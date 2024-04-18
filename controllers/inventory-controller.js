const knex = require('knex')(require("../knexfile")); 

const getAllInventoryItems = async (_req, res) => {
  try {
    const inventoryItems = await knex('inventories')
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(400).send(`Error getting inventory items: ${error}`);
  }
};

module.exports = {
  getAllInventoryItems
};
