const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;

const { User } = require('../models/user');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const fbOpts = {
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.APP_API_URL + "/auth/facebook/callback",
    profileFields: ['emails', 'name']
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            const temp = new User(jwt_payload.id, null, null, null, null, null, null, null, null, null, null);
            temp.findById(
                (results) => {
                    if (results.length == 0) {
                        return done(null, false, { message: "User not found!" });
                    }
                    const result = results[0];
                    const { password, resetPasswordToken, resetPasswordExpires, ...user } = result;
                    return done(null, user);
                },
                (message) => {
                    return done(err, false, { message: message });
                }
            );
        })
    );

    passport.use(
        new FacebookStrategy(fbOpts, (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        })
    );
};