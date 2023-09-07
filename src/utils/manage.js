const {
    insertGoals,
    insertAssets,
    insertLiabilities,
    insertRevenues,
    insertExpenses,
    insertDependents
} = require('../database/queries');
const { User } = require('../models/user');

function updateData(req) {
    const { goals, assets, liabilities, monthlyRevenue, monthlyExpense, dependents, user } = req.body;

    if (user) {
        var _user = new User(
            req.user.id,
            req.user.email,
            null,
            user.firstName,
            user.lastName,
            user.age,
            user.contact,
            user.currency
        );
        updateUser(_user);
    }


    const _id = req.user.id;
    insertGoals(_id, goals);
    insertAssets(_id, assets);
    insertLiabilities(_id, liabilities);
    insertRevenues(_id, monthlyRevenue);
    insertExpenses(_id, monthlyExpense);

    if(dependents) {
        insertDependents(_id, dependents);
    }

};

function updateUser(user) {
    user.update(
        (message) => {
            console.log(message);
        },
        (message) => {
            console.error(message);
        }
    );
};

function getUser(id, onSuccess, onFail) {
    const temp = new User(id, null, null, null, null, null, null, null, null, null, null);
    temp.findById(
        (results) => {
            if (results.length == 0) {
                onFail('User not found!');
                return;
            }
            const result = results[0];
            const { password, resetPasswordToken, resetPasswordExpires, ...user } = result;
            onSuccess(user);
            return;
        },
        onFail
    );
};

module.exports = { updateData, getUser };