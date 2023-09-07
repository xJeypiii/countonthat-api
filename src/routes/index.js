const auth = require('./auth');
const user = require('./user');

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/api', (req, res) => {
        res.status(200).send({ message: "Welcome to Countonthat. Register or Login to test API."});
    });

    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
};