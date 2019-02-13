const assert = require('assert');

class Validator {

    /** String empty check
     * 
     * @param {string} value 
     */
    static isNotEmptyString(value) {
        this.isString(value);

        assert.notEqual(value, undefined, "value is undefined");
        assert.notEqual(value, null, "value is null");
        assert.notEqual(/\S+/.test(value), false, "value is empty string");
    }

    /** check if value is a string
     * 
     * @param {string} value
     */
    static isString(value) {
        this.typeIs(value, 'string');
    }

    /** check if value is a number
     * 
     * @param {number} value 
     */
    static isNumber(value) {
        this.typeIs(value, 'number');

        if(/d+/.test(value))
            throw new Error("value is not a number");
    }

    /** check if typeof given value is equal to expected
     * 
     * @param {*} value
     * @param {string} expectedType
     */
    static typeIs(value, expectedType) {
        assert.equal(typeof value, expectedType, "type of value is not expected " + expectedType + " type");
    }

    /** check if instance of given object value is equal to expected class type
     * 
     * @param {object} value 
     * @param {function} expectedInstanceClass
     */
    static instanceIs(value, expectedInstanceClass) {
        assert.equal(value instanceof expectedInstanceClass, true, "instance of value id not expected " + expectedInstanceClass + " class type");
    }
}

module.exports = Validator