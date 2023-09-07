const { Item } = require('../models/item');
const { YearlyValue } = require('../models/yearly-value');

class Calculator {

    constructor(goals = [], assets = [], liabilities = [], monthlyRevenue = new Item(), monthlyExpense = new Item()) {
        this.goals = goals;
        this.assets = assets;
        this.liabilities = liabilities;
        this.monthlyRevenue = monthlyRevenue;
        this.monthlyExpense = monthlyExpense;
        Object.setPrototypeOf(this.monthlyRevenue, Item.prototype);
        Object.setPrototypeOf(this.monthlyExpense, Item.prototype);
        this.parseListToItemClass(this.assets);
        this.parseListToItemClass(this.liabilities);


        var totalAssets = this.computeListTotalValue(this.assets);
        var totalLiabilities = this.computeListTotalValue(this.liabilities);
        var totalDream = this.computeListTotalValue(this.goals);

        var financiallyTowardsDream = (totalAssets - totalLiabilities) / totalDream;
        var initial = new YearlyValue(
            assets, liabilities, monthlyRevenue, monthlyExpense, financiallyTowardsDream
        );

        this.initial = initial;
        this.setYearOne();
    }

    setYearOne() {
        var initialAssets = this.initial.assets;
        var initialLiabilities = this.initial.liabilities;

        var monthlyRevenue = new Item(
            null,
            this.initial.monthlyRevenue.getNextValue(),
            this.initial.monthlyRevenue.multiplier
        );

        var monthlyExpense = new Item(
            null,
            this.initial.monthlyExpense.getNextValue(),
            this.initial.monthlyExpense.multiplier
        );

        var totalAssets = this.computeListTotalValue(initialAssets);
        var totalLiabilities = this.computeListTotalValue(initialLiabilities);
        var totalDream = this.computeListTotalValue(this.goals);

        var financiallyTowardsDream = (totalAssets - totalLiabilities) / totalDream;

        this.yearOne = new YearlyValue(initialAssets, initialLiabilities, monthlyRevenue, monthlyExpense, financiallyTowardsDream);

        this.setNextYears();
    }

    setNextYears() {
        // this.yearOne = this.getNextYear(this.initial);
        this.yearTwo = this.getNextYear(this.yearOne);
        this.yearThree = this.getNextYear(this.yearTwo);
        this.yearFour = this.getNextYear(this.yearThree);
        this.yearFive = this.getNextYear(this.yearFour);
        this.yearSix = this.getNextYear(this.yearFive);
        this.yearSeven = this.getNextYear(this.yearSix);
        this.yearEight = this.getNextYear(this.yearSeven);
        this.yearNine = this.getNextYear(this.yearEight);
        this.yearTen = this.getNextYear(this.yearNine);
    }

    getNextYear(data) {
        var prevAssets = data.assets;
        var prevLiabilities = data.liabilities;

        var newAssets = this.getListNextValues(prevAssets);

        //check if cash is available in assets
        var cash = newAssets.find(item => {
            return item.name.toLowerCase() === 'cash'
        });

        if(!cash) {
            var newItem = new Item('cash', 0, 1);
            newAssets.push(newItem);
        }
        
        this.addToCash(newAssets, data.annualNet);
        var newLiabilities = this.getListNextValues(prevLiabilities);

        var monthlyRevenue = new Item(
            null,
            data.monthlyRevenue.getNextValue(),
            data.monthlyRevenue.multiplier
        );

        var monthlyExpense = new Item(
            null,
            data.monthlyExpense.getNextValue(),
            data.monthlyExpense.multiplier
        );

        var totalAssets = this.computeListTotalValue(newAssets);
        var totalLiabilities = this.computeListTotalValue(newLiabilities);
        var totalDream = this.computeListTotalValue(this.goals);

        var financiallyTowardsDream = (totalAssets - totalLiabilities) / totalDream;

        var retVal = new YearlyValue(newAssets, newLiabilities, monthlyRevenue, monthlyExpense, financiallyTowardsDream);

        return retVal;
    }

    getComputation() {
        return {
            initial: this.initial.toFormat(),
            yearOne: this.yearOne.toFormat(),
            yearTwo: this.yearTwo.toFormat(),
            yearThree: this.yearThree.toFormat(),
            yearFour: this.yearFour.toFormat(),
            yearFive: this.yearFive.toFormat(),
            yearSix: this.yearSix.toFormat(),
            yearSeven: this.yearSeven.toFormat(),
            yearEight: this.yearEight.toFormat(),
            yearNine: this.yearNine.toFormat(),
            yearTen: this.yearTen.toFormat(),
        }
    }

    getListNextValues(items) {
        var list = [];
        items.forEach(element => {
            list.push(
                new Item(
                    element.name,
                    element.getNextValue(),
                    element.multiplier
                )
            );
        });

        return list;
    }

    addToCash(items, annualNet) {
        items.forEach(element => {
            if (element.name?.toLowerCase() == 'cash') {
                element.value = element.value + annualNet;
            }
        });
    }

    parseListToItemClass(items) {
        items.forEach(element => {
            Object.setPrototypeOf(element, Item.prototype);
        });
    }

    computeListTotalValue(items) {
        var value = 0;
        items.forEach(element => {
            value += element.value
        });

        return value;
    }

    // insertToDB() {
    //     let userId = this.getRandomInt(1, 99999);

    //     insertGoals(connection, userId, this.goals);
    //     insertAssets(connection, userId, this.assets);
    //     insertLiabilities(connection, userId, this.liabilities);
    //     insertRevenues(connection, userId, this.monthlyRevenue);
    //     insertExpenses(connection, userId, this.monthlyExpense);

    // }

    // getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    // }
}

module.exports = {
    Calculator
};