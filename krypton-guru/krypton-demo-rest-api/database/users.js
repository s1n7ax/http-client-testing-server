const validator = require('../controllers/validator');

class Users {

    /** 
     * id is mandetory for deleting or updating user
     * name age email is mandetory creatng new user
     * 
     * @param {number} id
     * @param {string} name
     * @param {number} age
     * @param {string} email
     */
    constructor(id, name, age, email) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
    }

    // ID
    get id() {
        try { validator.isNumber(this._id) } 
        catch(err) { throw new Error("{number} id should be a number") }

        return this._id;
    }

    set id(id) { this._id = id; }

    // NAME
    get name() {
        try { validator.isNotEmptyString(this._name) }
        catch(err) { throw new Error("{string} name should not be empty") }

        return this._name;
    }

    set name(name) { this._name = name }

    // AGE
    get age() {
        try { validator.isNumber(this._age) }
        catch(err) { throw new Error("{number} age should be a number") }
        
        return this._age;
    }

    set age(age) { this._age = age; }

    // EMAIL
    get email() {
        try { validator.isNotEmptyString(this._email) }
        catch(err) { throw new Error("{string} email should not be empty") }

        return this._email;
    }

    set email(email) { this._email = email; }

    save() {
        // validate the user id with existing one
        let index = this.findUserIndex();
        if(~index)
            throw new Error("User with the id: " + this.id + " already exist");

        // remove if the ist is longer than the max number of values
        if(Users._list.length > Users._max_users) {
            let diff = Users._list.length - Users._max_users;
            Users._list.splice(0, diff);
        }

        // enter new user
        Users._list.push({
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email
        });
    }

    delete() {
        let index = this.findUserIndex();

        if(!(~index))
            throw new Error("User with the id: " + this.id + " doesn't exist");

        Users._list.splice(index, 1);
    }

    update() {
        let index = this.findUserIndex();
        
        if(!(~index))
            throw new Error("User by id " + this.id + " not found!");
        
        Users._list.splice(index, 1);

        Users._list.push({
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email
        });
    }

    findUserIndex() {
        return Users._list.findIndex((user) => {
            return user.id === this.id;
        });
    }

}

// statics
Users._id = 1;
Users._list = [];
Users._max_users = 100;

module.exports = Users;