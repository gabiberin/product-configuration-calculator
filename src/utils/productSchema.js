const {
    checkSchema
} = require('express-validator');
const {
    prices,
    sizes
} = require('./prices.json')


module.exports.productSchemaValidator = checkSchema({
    sku: {
        equals: {
            options: 'flyer',
        },
        errorMessage: 'Invalid SKU',
    },
    options: {
        isEmpty: false,
        errorMessage: 'Invalid Options Object',
    },
    'options.copies': {
        isInt: true,
        isInt: {
            options: {
                min: 1
            }
        },
        errorMessage: 'Invalid number of copies.',
    },
    'options.size': {
        trim: true,
        isIn: {
            options: [Object.keys(sizes)],
        },
        errorMessage: 'Invalid page size.',
    },
    'options.material': {
        isIn: {
            options: [Object.keys(prices.material)],
        },
        errorMessage: 'Invalid material.',
    },
    'options.finish': {
        isIn: {
            options: [Object.keys(prices.finish)],
        },
        errorMessage: 'Invalid finish.',
    },
    'options.drilling_holes': {
        isInt: true,
        toInt: true,
        isIn: {
            options: [Object.keys(prices.drilling_holes)],
        },
        errorMessage: 'Invalid number of drilling holes.',
    },
    'options.bundles': {
        isInt: {
            options: {
                min: 0
            }
        },
        toInt: true,
        errorMessage: 'Invalid number of bundles.',
    },
})