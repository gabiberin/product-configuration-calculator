'use strict';

/**
 * Express and friends
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
	extended: true
}));

// Error handler
app.use((err, req, res, next) => {
	console.error(err);
	return res.status(500).json({
		result: 'failure',
		message: 'Unknown Error (1)'
	});
});

/**
 * These are responsible for main logic
 */
// Validates the product schema
const {
	productSchemaValidator
} = require('./src/utils/productSchema');

// Handles returning an error if the schema fails to validate the request
const {
	checkInputError
} = require('./src/utils/errorHandler');

// Handles calculating the product price
const {
	ProductBuilder
} = require('./src/classes/productBuilder');

/**
 * The main request is a post request that calculates the product configuration price
 */
app.post('/', productSchemaValidator, checkInputError, (req, res) => {
	try {
		const {
			copies,
			size,
			material,
			finish,
			drilling_holes,
			bundles
		} = req.body.options;

		const product = new ProductBuilder();

		const price = product.setCopies(copies)
			.setSize(size)
			.setMaterial(material)
			.setFinish(finish)
			.setDrillingHoles(drilling_holes)
			.setBundles(bundles)
			.build();

		return res.status(200).json({
			result: 'success',
			price
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			result: 'failure',
			message: 'Unknown Error (2)'
		});
	}

});

module.exports = app;