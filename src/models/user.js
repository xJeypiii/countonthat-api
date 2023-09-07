const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { createUser, findByEmail, findById, updateUser, findByResetToken } = require('../database/user');

class User {
    constructor(id, email, password, firstName, lastName, age, contact, currency, type, resetPasswordToken, resetPasswordExpires) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.contact = contact;
        this.currency = currency;
        this.type = type;
        this.resetPasswordToken = resetPasswordToken;
        this.resetPasswordExpires = resetPasswordExpires;
    }

    create = function (onSuccess, onFail) {

        const user = this;

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                onFail(err.message);
                return;
            };

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    onFail(err.message);
                    return;
                }

                user.password = hash;

                const data = {
                    email: user.email,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    type: user.type
                };

                createUser(
                    data,
                    (result) => {
                        user.id = result.insertId;
                        onSuccess("Created user successfully.");
                    },
                    onFail
                );
            });
        });
    };

    createFB = function (onSuccess, onFail) {

        const user = this;

        const data = {
            email: user.email,
            password: 'fb',
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type
        };

        createUser(
            data,
            (result) => {
                user.id = result.insertId;
                onSuccess("Created user successfully.");
            },
            onFail
        );
    };

    update = function (onSuccess, onFail) {
        const user = this;
        const { email, password, resetPasswordToken, resetPasswordExpires, ...data } = user;

        updateUser(
            data,
            (result) => {
                onSuccess("Updated user successfully.");
            },
            onFail
        );
    };

    updatePassword = function (newPassword, onSuccess, onFail) {

        const user = this;

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                onFail(err.message);
                return;
            };

            bcrypt.hash(newPassword, salt, function (err, hash) {
                if (err) {
                    onFail(err.message);
                    return;
                }

                user.password = hash;

                const data = {
                    id: user.id,
                    password: user.password,
                    resetPasswordToken: null,
                    resetPasswordExpires: null
                };

                updateUser(
                    data,
                    (result) => {
                        onSuccess("Updated user successfully.");
                    },
                    onFail
                );
            });
        });
    };

    generatePasswordReset = function () {
        this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        this.resetPasswordExpires = Date.now() + 3600000;

        const user = this;

        const data = {
            id: user.id,
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpires: user.resetPasswordExpires
        };

        updateUser(
            data,
            (result) => {
                console.log("Generated reset password token.");
            },
            (result) => {
                console.error(result);
            }
        );
    };

    findByResetToken = function (onSuccess, onFail) {
        const user = this;

        findByResetToken(
            user.resetPasswordToken,
            onSuccess,
            onFail
        );
    }

    findByEmail = function (onSuccess, onFail) {
        const user = this;

        findByEmail(
            user.email,
            onSuccess,
            onFail
        );
    };

    findById = function (onSuccess, onFail) {
        const user = this;

        findById(
            user.id,
            onSuccess,
            onFail
        );
    };

    comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }

    generateJWT = function () {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        let payload = {
            id: this.id,
            email: this.email,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '60m'
        });
    };
}

module.exports = {
    User
};