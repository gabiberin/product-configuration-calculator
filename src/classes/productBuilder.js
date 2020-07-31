const {
    prices,
    sizes
} = require('../utils/prices.json')

/**
 * The product builder is a class that handles constructing the product configuration price
 * The build function calculates the price with the normalized values
 */
class ProductBuilder {
    constructor() {
        this.pricePerCopy = 0;
        this.bundlesPrice = 0;
    }

    setMaterial(material) {
        this.materialPrice = prices.material[material] / 1000;
        return this;
    }

    setSize(size) {
        this.size = sizes[size];
        return this;
    }

    setCopies(copies) {
        this.copies = copies;
        return this;
    }

    setFinish(finish) {
        this.pricePerCopy += prices.finish[finish];
        return this;
    }

    setDrillingHoles(drillingHoles) {
        this.pricePerCopy += prices.drilling_holes[drillingHoles] / 1000;
        return this;
    }

    setBundles(bundles) {
        this.bundlesPrice = prices.bundles * bundles;
        return this;
    }

    build() {

        if (!('materialPrice' in this)) {
            throw new Error('Material is missing.')
        }

        if (!('size' in this)) {
            throw new Error('Size is missing.')
        }

        if (!('copies' in this)) {
            throw new Error('Number of copies is missing.')
        }

        this.pricePerCopy += this.materialPrice * this.size;

        return this.pricePerCopy * this.copies + this.bundlesPrice
    }
}

module.exports = {
    ProductBuilder
}