const express = require('express');
const {check} = require('express-validator');


const User = require('../controllers/user');
const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "You are in the User Endpoint."});
});


//details
router.get('/details', User.index);

//goals
router.get('/goals', User.goals);

//goals
router.get('/assets', User.assets);

//goals
router.get('/liabilities', User.liabilities);

//goals
router.get('/revenues', User.revenues);

//goals
router.get('/expenses', User.expenses);

//dependents
router.get('/dependents', User.dependents);

// CALCULATE
router.post('/calculator',[
    check('goals').not().isEmpty().withMessage('goals is required.'),
    check('assets').not().isEmpty().withMessage('assets is required.'),
    check('liabilities').not().isEmpty().withMessage('liabilities is required.'),
    check('monthlyRevenue').not().isEmpty().withMessage('monthlyRevenue is required.'),
    check('monthlyExpense').not().isEmpty().withMessage('monthlyExpense is required.'),
], validate, User.calculator);

// //SHOW
// router.get('/:id',  User.show);

module.exports = router;