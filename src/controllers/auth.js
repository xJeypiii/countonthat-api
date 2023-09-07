const { User } = require('../models/user');

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const newUser = new User(null, email, password, firstName, lastName, null, null, null, 'email', null, null);
        newUser.findByEmail(
            (results) => {

                if (results.length != 0) {
                    return res.status(401).json({ message: 'The email address you have entered is already associated with another account.' });
                }

                newUser.create(
                    (message) => {
                        return res.status(200).json({ success: true, message: message });
                    },
                    (message) => {
                        return res.status(500).json({ message: message });
                    }
                );
            },
            (message) => {
                return res.status(500).json({ message: message });
            }
        );

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
    try {
        const { email, password } = req.body;
        const temp = new User(null, email, password, null, null, null, null, null, null, null, null);
        temp.findByEmail(
            (results) => {
                if (results.length == 0) {
                    return res.status(401).json({ message: 'The email address ' + email + ' is not associated with any account. Double-check your email address and try again.' });
                }
                const result = results[0];

                if (result.type?.toLowerCase() !== 'email') {
                    return res.status(401).json({ message: 'The email address ' + email + ' is registered with ' + result.type + '. Please Login using ' + result.type + '.' });
                }

                const user = new User(
                    result.id,
                    result.email,
                    result.password,
                    result.firstName,
                    result.lastName,
                    result.age,
                    result.contact,
                    result.currency,
                    result.type,
                    result.resetPasswordToken,
                    result.resetPasswordExpires
                );
                if (!user.comparePassword(password)) {
                    return res.status(401).json({ message: 'Invalid email or password.' });
                }

                return res.status(200).json({
                    token: user.generateJWT(),
                    user: {
                        id: result.id,
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        age: result.age,
                        contact: result.contact,
                        currency: result.currency,
                        type: result.type
                    }
                });

            },
            (message) => {
                return res.status(500).json({ message: message });
            }
        );

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.fbLogin = (req, res) => {
    try {
        const { id, email, last_name, first_name } = req.user._json;

        const newUser = new User(null, email, null, first_name, last_name, null, null, null, 'facebook', null, null);
        newUser.findByEmail(
            (results) => {

                if (results.length != 0) {
                    const result = results[0];
                    const user = new User(
                        result.id,
                        result.email,
                        result.password,
                        result.firstName,
                        result.lastName,
                        result.age,
                        result.contact,
                        result.currency,
                        result.type,
                        result.resetPasswordToken,
                        result.resetPasswordExpires
                    );

                    // return res.status(200).json({
                    //     token: user.generateJWT(),
                    //     user: {
                    //         id: result.id,
                    //         email: result.email,
                    //         firstName: result.firstName,
                    //         lastName: result.lastName,
                    //         age: result.age,
                    //         contact: result.contact,
                    //         currency: result.currency,
                    //         type: result.type
                    //     }
                    // });

                    var token = user.generateJWT();
                    var userVal = {
                        id: result.id,
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        age: result.age,
                        contact: result.contact,
                        currency: result.currency,
                        type: result.type
                    };

                    res.cookie('token', token, { domain: process.env.APP_DOMAIN, secure: true, httpOnly:false });
                    res.cookie('user', userVal, { domain: process.env.APP_DOMAIN, secure: true, httpOnly:false });
                    return res.redirect(process.env.APP_URL);
                } else {
                    newUser.createFB(
                        (message) => {
                            // return res.status(200).json({
                            //     token: newUser.generateJWT(),
                            //     user: {
                            //         id: newUser.id,
                            //         email: newUser.email,
                            //         firstName: newUser.firstName,
                            //         lastName: newUser.lastName,
                            //         age: newUser.age,
                            //         contact: newUser.contact,
                            //         currency: newUser.currency,
                            //         type: newUser.type
                            //     }
                            // });

                            var token = newUser.generateJWT();

                            var user = {
                                id: newUser.id,
                                email: newUser.email,
                                firstName: newUser.firstName,
                                lastName: newUser.lastName,
                                age: newUser.age,
                                contact: newUser.contact,
                                currency: newUser.currency,
                                type: newUser.type
                            }

                            res.cookie('token', token, { domain: process.env.APP_DOMAIN, secure: true, httpOnly:false });
                            res.cookie('user', user, { domain: process.env.APP_DOMAIN, secure: true, httpOnly:false });
                            return res.redirect(process.env.APP_URL);
                        },
                        (message) => {
                            // return res.status(500).json({ message: message });
                            return res.redirect(process.env.APP_URL + '?e=' + encodeURIComponent(message));
                        }
                    );
                }
            },
            (message) => {
                // return res.status(500).json({ message: message });
                return res.redirect(process.env.APP_URL + '?e=' + encodeURIComponent(message));
            }
        );

    } catch (error) {
        // return res.status(500).json({ message: error.message });
        return res.redirect(process.env.APP_URL + '?e=' + encodeURIComponent(message));
    }
};