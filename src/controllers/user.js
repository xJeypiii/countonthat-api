const { Calculator } = require('../utils/calculator');
const { updateData, getUser } = require('../utils/manage');
const {
    getGoals,
    getAssets,
    getLiabilities,
    getRevenues,
    getExpenses,
    getDependents
} = require('../database/queries');


// @route GET api/user/details
// @desc Returns user details
// @access Public
exports.index = function (req, res) {
    getUser(
        req.user.id,
        (data) => {
            return res.status(200).json(data);
        },
        (message) => {
            return res.status(400).json({ message: message });
        }
    )
};

exports.goals = function (req, res) {
    getGoals(
        req.user.id,
        (data) => {
            let result = data.map(({user_id, ...rest}) => rest);
            return res.status(200).json(result);
        },
        (message) => {
            return res.status(400).json({ message: message });
        }
    )
};

exports.assets = function (req, res) {
    getAssets(
        req.user.id,
        (data) => {
            let result = data.map(({user_id, ...rest}) => rest);
            return res.status(200).json(result);
        },
        (message) => {
            return res.status(400).json({ message: message });
        }
    )
};

exports.liabilities = function (req, res) {
    getLiabilities(
        req.user.id,
        (data) => {
            let result = data.map(({user_id, ...rest}) => rest);
            return res.status(200).json(result);
        },
        (message) => {
            return res.status(400).json({ message: message });
        }
    )
};

exports.revenues = function (req, res) {
    getRevenues(
        req.user.id,
        (data) => {
            let result = data.map(({user_id, ...rest}) => rest);
            return res.status(200).json(result);
        },
        (message) => {
            return res.status(400).json({ message: message });
        }
    )
};

exports.expenses = function (req, res) {
    getExpenses(
        req.user.id,
        (data) => {
            let result = data.map(({user_id, ...rest}) => rest);
            return res.status(200).json(result);
        },
        (message) => {
            return res.status(400).json({ message: message });
        }
    )
};

exports.dependents = function (req, res) {
    getDependents(
        req.user.id,
        (data) => {
            let result = data.map(({user_id, ...rest}) => rest);
            return res.status(200).json(result);
        },
        (message) => {
            return res.status(400).json({ message: message });
        }
    )
};

exports.calculator = function (req, res) {
    const { goals, assets, liabilities, monthlyRevenue, monthlyExpense } = req.body;

    updateData(req);

    var calc = new Calculator(goals, assets, liabilities, monthlyRevenue, monthlyExpense);

    return res.status(200).json({
        status: true,
        data: calc.getComputation()
    });
};
