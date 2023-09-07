class Item {
    constructor(name = "", value = 0, multiplier = 0) {
        this.name = name
        this.value = value;
        this.multiplier = multiplier;
    }

    getNextValue() {
        // var data = this. value * (this.multiplier / 10)

        if(this.name?.toLowerCase() == 'cash') {
            return this.value
        }

        if(this.multiplier == 0) {
            return 0
        }

        return this.value * this.multiplier
    }
}

module.exports = {
    Item
};