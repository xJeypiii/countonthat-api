const passport = require("passport");

module.exports = (req, res, next) => {
    passport.authenticate('facebook', {session: false, scope: 'email'}, function(err, user, info) {
        if (err) return next(err);
        if (!user) return res.redirect(process.env.APP_URL + '?e=' + encodeURIComponent(info.message));

        req.user = user;

        next();

    })(req, res, next);
};