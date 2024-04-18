const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
	try {
		const data = await knex("warehouses");
		res.status(200).json(data);
	} catch (error) {
		res.status(400).send(`Error retrieving Warehouses: ${error}`);
	}
};

const remove = async (req, res) => {
	try {
		const warehouse = await knex("warehouses").where({ id: req.params.id }).delete();
		
		if (!warehouse) {
			return res.status(404).json({message: `Could not find warehouse: ${req.params.id}`})
		}

		res.status(204).json({message: `Successfully deleted warehouse: ${req.params.id}`})
	} catch (error) {
		res.status(404).send(`Error deleting warehouse: ${error}`);
	}
};

module.exports = {
	index, remove
};