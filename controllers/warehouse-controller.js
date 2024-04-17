const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require('uuid');
const {isValidEmail,isValidPhoneNumber} = require ('../helpers/validators');

const index = async (_req, res) => {
	try {
		const data = await knex("warehouses");
		res.status(200).json(data);
	} catch (error) {
		res.status(400).send(`Error retrieving Warehouses: ${error}`);
	}
};

const add = async (req, res) => {

	console.log("Request Body:", req.body);

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
		
		const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

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
				contact_email,
				created_at : currentTime,
				updated_at : currentTime
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


module.exports = {
	index,
	add,
};