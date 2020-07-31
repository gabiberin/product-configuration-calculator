const {
    validationResult
} = require('express-validator');

const checkInputError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            result: 'failure',
            errors: errors.formatWith(({
                msg,
                param
            }) => {
                return `${param}: ${msg}`
            }).array({
                onlyFirstError: true
            })
        });
    }

    next()
};

module.exports = {
    checkInputError
}