const knex = require("knex")(require("../knexfile"));
const {isValidEmail,isValidPhoneNumber} = require ('../helpers/validators');

const index = async (_req, res) => {
	try {
		const data = await knex("warehouses");
		res.status(200).json(data);
	} catch (error) {
		res.status(400).send(`Error retrieving Warehouses: ${error}`);
	}
};


//GET single warehouse
const findId = async (req, res) => {
	try {
		const foundId = await knex("warehouses")
			.where({ id: req.params.id})
			.first();
		if (!foundId) {
			return res.status(404).json({message: `Could not find warehouse with: ${req.params.id}`})
		}

		res.json(foundId);

	} catch (error) {
		console.error(error);
		res.status(400).send(`Error retrieving warehouse: ${error}`);
	}
}


//GET inventories by warehouse id
const warehouseInventories = async (req, res) => {
	try {
		const inventories = await knex('inventories')
			.select(
				'id',
				'item_name',
				'category',
				'status',
				'quantity'
			)
			.where ({ warehouse_id: req.params.id });

		if (inventories.length === 0) {
			return res.status(404).send(`Could not find inventories for warehouse id: ${req.params.id}`)
		}
			res.status(200).json(inventories);

	} catch (error) {
		res.status(400).send(`Error retrieving inventories by warehouse id: ${error}`);
	}
}


const remove = async (req, res) => {
	try {
		const warehouse = await knex("warehouses")
			.where({ id: req.params.id })
			.delete();
		
			if (!warehouse) {
			return res.status(404).json({message: `Could not find warehouse: ${req.params.id}`})
		}

		res.status(204).json({message: `Successfully deleted warehouse: ${req.params.id}`})
	} catch (error) {
		res.status(404).send(`Error deleting warehouse: ${error}`);
	}
};

const add = async (req, res) => {
    // add the validation
    const {warehouse_name,
		address,
		city,
		country,
		contact_name,
		contact_position,
		contact_phone,
		contact_email} = req.body;

    if (!warehouse_name|| !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email ) {
        return res.status(400).json({
            message: "Please provide missing data",
          });  
    }

	if(!isValidEmail(contact_email)){
		return res.status(400).json({
            message: "Please enter valid email"
          });  
	}


	if(!isValidPhoneNumber(contact_phone)){
		return res.status(400).json({
            message: "Please enter valid phone number"
          });  
	}

    try {

        const result = await knex("warehouses")//contains [newly created warehouse id]
            .insert({
				id:null,
                warehouse_name,
				address,
                city,
				country,
				contact_name,
				contact_position,
				contact_phone,
				contact_email
            });

            //retrieve newly created record
            const [id] = result;

            const newRecord = await knex("warehouses")
                .where({ id }) // equivalent to { id: id }
                .first();

            res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new warehouse: ${error}`,
          });
    }
};

const edit = async (req, res) => {
	const {
        id,
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email
    } = req.body;
	

	if (!warehouse_name|| !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email ) {
        return res.status(400).json({
            message: "Please provide missing data",
          });  
    }

	if(!isValidEmail(contact_email)){
		return res.status(400).json({
            message: "Please enter valid email"
          });  
	}


	if(!isValidPhoneNumber(contact_phone)){
		return res.status(400).json({
            message: "Please enter valid phone number"
          });  
	}
	try{
		
		const updateWarehouse = await knex('warehouses')
            .where({ id: req.params.id })
			.update({
				warehouse_name,
                address,
                city,
                country,
                contact_name,
                contact_position,
                contact_phone,
                contact_email
			});
		if(!updateWarehouse)
		{
			return res.status(404).json({ error: "Warehouse not found" });
		}
		
		const updatedWarehouse = await knex("warehouses").where({ id:req.params.id }).first();
		res.status(200).json(updatedWarehouse);
		
	}
	catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Unable to update warehouse" });
    }

};


module.exports = {
	index,
	findId,
	warehouseInventories,
	add,
	remove,
	edit
};