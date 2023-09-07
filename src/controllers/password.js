const { User } = require('../models/user');
const { sendEmail } = require('../utils/utils');

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = async (req, res) => {
    try {
        const { email } = req.body;

        const temp = new User(null, email, null, null, null, null, null, null, null, null, null);

        temp.findByEmail(
            async (results) => {
                if (results.length == 0) {
                    return res.status(401).json({ message: 'The email address ' + email + ' is not associated with any account. Double-check your email address and try again.' });
                }
                const result = results[0];

                if (result.type?.toLowerCase() !== 'email') {
                    return res.status(401).json({ message: 'The email address ' + email + ' is registered with ' + result.type + '. Please login using ' + result.type + '.' });
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
                    result.reresetPasswordToken,
                    result.resetPasswordExpires
                );
                user.generatePasswordReset();

                // send email
                let subject = 'Password change request';
                let to = user.email;
                let from = '' + process.env.MAIL_FROM_NAME + ' <' + process.env.MAIL_FROM_ADDRESS + '>';
                let link = process.env.APP_URL + "/reset/" + user.resetPasswordToken;
                let html = `<p>Hi ${user.firstName}</p>
                    <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

                await sendEmail({ to, from, subject, html })
                .then(result => {
                    return res.status(200).json({ message: 'A reset email has been sent to ' + user.email + '.' });
                })
                .catch(error => {
                    console.log(error);
                    return res.status(500).json({ message: "Error sending mail." });
                });
            },
            (message) => {
                return res.status(500).json({ message: message });
            }
        );
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const temp = new User(null, null, null, null, null, null, null, null, null, token, null);
        temp.findByResetToken(
            (results) => {
                if (results.length == 0) {
                    return res.status(401).json({ message: 'Password reset token is invalid or has expired.' });
                }
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
                    result.reresetPasswordToken,
                    result.resetPasswordExpires
                );
                user.updatePassword(
                    password,
                    (results) => {
                        // await sendEmail({to, from, subject, html});
                        return res.status(200).json({ message: 'Your password has been updated.' });
                    },
                    (message) => {
                        return res.status(500).json({ message: message });
                    }
                )
            },
            (message) => {
                return res.status(500).json({ message: message });
            }
        );

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};