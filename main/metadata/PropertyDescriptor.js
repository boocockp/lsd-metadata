import _ from "lodash"

class PropertyDescriptor {
    static property(data) {
        return new PropertyDescriptor(data)
    }

    constructor(data) {
        this.computed = false
        this.validators = []
        Object.getOwnPropertyNames(data).map ( prop => {
            const desc = Object.getOwnPropertyDescriptor(data, prop)
            Object.defineProperty(this, prop, desc)
        })
    }

    get display() {
        return this.name !== "id"
    }
    get editable() {
        return !this.computed
    }
    get label() {
        return _.startCase(this.name)
    }

    validate(entity) {
        const value = entity[this.name]
        return this.validators.map( v => v.validate(entity, value))
    }
}

module.exports = PropertyDescriptor
