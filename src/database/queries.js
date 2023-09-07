const { connection } = require('../database/database');

function insertGoals(userId, data) {
    let deleteQuery = "DELETE FROM goals WHERE user_id = ?";
    let sqlQuery = "INSERT INTO goals (user_id, name, value) VALUES ?"

    connection.query(
        deleteQuery,
        [userId],
        (error, results) => {
            if (error) {
                console.log('Error saving goals: ', error);
            } else {
                connection.query(
                    sqlQuery,
                    [data.map(item => [userId, item.name, item.value])],
                    (error, results) => {
                        if (error) {
                            console.log('Error saving goals: ', error);
                        } else {
                            console.log('Goals inserted successfully.');
                        }

                    }
                );
            }
        }
    );
};

function insertAssets(userId, data) {
    let deleteQuery = "DELETE FROM assets WHERE user_id = ?";
    let sqlQuery = "INSERT INTO assets (user_id, name, value, multiplier) VALUES ?"

    connection.query(
        deleteQuery,
        [userId],
        (error, results) => {
            if (error) {
                console.log('Error saving assets: ', error);
            } else {
                connection.query(
                    sqlQuery,
                    [data.map(item => [userId, item.name, item.value, item.multiplier])],
                    (error, results) => {
                        if (error) {
                            console.log('Error saving assets: ', error);
                        } else {
                            console.log('Assets inserted successfully.');
                        }
                    }
                );
            }
        }
    );
};

function insertLiabilities(userId, data) {
    let deleteQuery = "DELETE FROM liabilities WHERE user_id = ?";
    let sqlQuery = "INSERT INTO liabilities (user_id, name, value, multiplier) VALUES ?"

    connection.query(
        deleteQuery,
        [userId],
        (error, results) => {
            if (error) {
                console.log('Error saving liabilities: ', error);
            } else {
                connection.query(
                    sqlQuery,
                    [data.map(item => [userId, item.name, item.value, item.multiplier])],
                    (error, results) => {
                        if (error) {
                            console.log('Error saving liabilities: ', error);
                        } else {
                            console.log('Liabilities inserted successfully.');
                        }
                    }
                );
            }
        }
    );
};

function insertRevenues(userId, data) {
    let deleteQuery = "DELETE FROM revenues WHERE user_id = ?";
    let sqlQuery = "INSERT INTO revenues SET ?"

    connection.query(
        deleteQuery,
        [userId],
        (error, results) => {
            if (error) {
                console.log('Error saving revenues: ', error);
            } else {
                connection.query(
                    sqlQuery,
                    { user_id: userId, value: data.value, multiplier: data.multiplier },
                    (error, results) => {
                        if (error) {
                            console.log('Error saving revenues: ', error);
                        } else {
                            console.log('Revenues inserted successfully.');
                        }
                    }
                );
            }
        }
    );
};

function insertExpenses(userId, data) {
    let deleteQuery = "DELETE FROM expenses WHERE user_id = ?";
    let sqlQuery = "INSERT INTO expenses SET ?"

    connection.query(
        deleteQuery,
        [userId],
        (error, results) => {
            if (error) {
                console.log('Error saving expenses: ', error);
            } else {
                connection.query(
                    sqlQuery,
                    { user_id: userId, value: data.value, multiplier: data.multiplier },
                    (error, results) => {
                        if (error) {
                            console.log('Error saving expenses: ', error);
                        } else {
                            console.log('Expenses inserted successfully.');
                        }
                    }
                );
            }
        }
    );
};

function insertDependents(userId, data) {
    let deleteQuery = "DELETE FROM dependents WHERE user_id = ?";
    let sqlQuery = "INSERT INTO dependents (user_id, firstName, lastName, age, relationship) VALUES ?"

    connection.query(
        deleteQuery,
        [userId],
        (error, results) => {
            if (error) {
                console.log('Error saving dependents: ', error);
            } else {
                connection.query(
                    sqlQuery,
                    [data.map(item => [userId, item.firstName, item.lastName, item.age, item.relationship])],
                    (error, results) => {
                        if (error) {
                            console.log('Error saving dependents: ', error);
                        } else {
                            console.log('Dependents inserted successfully.');
                        }
                    }
                );
            }
        }
    );
};

function getGoals(id, onSuccess, onFail) {
    let sqlQuery = "SELECT * FROM goals WHERE user_id=?"
    connection.query(
        sqlQuery,
        [id],
        (error, results) => {
            if(error) {
                onFail(error.message);
            } else {
                onSuccess(results);
            }
        }
    );
};

function getAssets(id, onSuccess, onFail) {
    let sqlQuery = "SELECT * FROM assets WHERE user_id=?"
    connection.query(
        sqlQuery,
        [id],
        (error, results) => {
            if(error) {
                onFail(error.message);
            } else {
                onSuccess(results);
            }
        }
    );
};

function getLiabilities(id, onSuccess, onFail) {
    let sqlQuery = "SELECT * FROM liabilities WHERE user_id=?"
    connection.query(
        sqlQuery,
        [id],
        (error, results) => {
            if(error) {
                onFail(error.message);
            } else {
                onSuccess(results);
            }
        }
    );
};

function getRevenues(id, onSuccess, onFail) {
    let sqlQuery = "SELECT * FROM revenues WHERE user_id=?"
    connection.query(
        sqlQuery,
        [id],
        (error, results) => {
            if(error) {
                onFail(error.message);
            } else {
                onSuccess(results);
            }
        }
    );
};

function getExpenses(id, onSuccess, onFail) {
    let sqlQuery = "SELECT * FROM expenses WHERE user_id=?"
    connection.query(
        sqlQuery,
        [id],
        (error, results) => {
            if(error) {
                onFail(error.message);
            } else {
                onSuccess(results);
            }
        }
    );
};

function getDependents(id, onSuccess, onFail) {
    let sqlQuery = "SELECT * FROM dependents WHERE user_id=?"
    connection.query(
        sqlQuery,
        [id],
        (error, results) => {
            if(error) {
                onFail(error.message);
            } else {
                onSuccess(results);
            }
        }
    );
};


module.exports = { 
    insertGoals, 
    insertAssets, 
    insertLiabilities, 
    insertRevenues, 
    insertExpenses, 
    insertDependents,
    getGoals, 
    getAssets,
    getLiabilities,
    getRevenues,
    getExpenses,
    getDependents
};
