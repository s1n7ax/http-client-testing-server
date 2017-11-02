const assert = require('assert');
var data = require('./data');

class Users {
    /** creat new user object
     * 
     * @param {string} name
     * @param {number} age
     * @param {string} address
     */
    constructor(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    /** save the user to the database
     * 
     */
    save() {
        try{
            validateUserData()
        }catch(err) {
            
        }
    }
    
    validateUserData() {
        // empty value check
        validateNotEmpty(this.name);
        validateNotEmpty(this.age);
        validateNotEmpty(this.address);

        // type check
        validateType(this.name, 'string')
        validateType(this.age, 'number')
        validateType(this.address, 'string')
}

    validateNotEmpty(value) {
        assert.notEqual(value, undefined, 'value is undefined');
        assert.notEqual(value, null, 'value is null');
        assert.notEqual(/\S+/.test(value), true, 'contains only a empty value or space characters');
    }

    validateType(value, expectedType) {
        assert.equal(typeof value, expectedType, 'type of value is not a ' + expectedType);
    }
}