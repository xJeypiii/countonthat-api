const { connection } = require('../database/database');

function createUser(data, onSuccess, onFail) {
    let sqlQuery = "INSERT INTO users SET ?"
    connection.query(
        sqlQuery,
        { ...data },
        (error, results) => {
            if(error) {
                onFail(error.message);
            } else {
                onSuccess(results);
            }
        }
    );
};

function findByEmail(email, onSuccess, onFail) {
    let sqlQuery = "SELECT * FROM users WHERE email=?"
    connection.query(
        sqlQuery,
        [email],
        (error, results) => {
            if(error) {
                onFail(error.message);
            } else {
                onSuccess(results);
            }
        }
    );
};

function findById(id, onSuccess, onFail) {
    let sqlQuery = "SELECT * FROM users WHERE id=?"
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

function updateUser(data, onSuccess, onFail) {
    let sqlQuery = "UPDATE users SET ? WHERE id=?"
    connection.query(
        sqlQuery,
        [{ ...data }, data.id],
        (error, results) => {
            if(error) {
                onFail(error.message);
            } else {
                onSuccess(results);
            }
        }
    );
};

function findByResetToken(resetPasswordToken, onSuccess, onFail) {
    console.log(1678969824937 < Date.now());
    let sqlQuery = "SELECT * FROM users WHERE resetPasswordToken=? AND resetPasswordExpires>?"
    connection.query(
        sqlQuery,
        [resetPasswordToken, Date.now()],
        (error, results) => {
            if(error) {
                onFail(error.message);
            } else {
                onSuccess(results);
            }
        }
    );
};

module.exports = { createUser, findByEmail, findById, updateUser, findByResetToken };