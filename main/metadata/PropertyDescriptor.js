import _ from "lodash"

class PropertyDescriptor {
    static property(data) {
        return new PropertyDescriptor(data)
    }

    constructor(data) {
        Object.assign(this, PropertyDescriptor.defaults())
        Object.getOwnPropertyNames(data).map ( prop => {
            const desc = Object.getOwnPropertyDescriptor(data, prop)
            Object.defineProperty(this, prop, desc)
        })
    }

    get label() {
        return _.startCase(this.name)
    }

    validate(entity) {
        const value = entity[this.name]
        return this.validators.map( v => v.validate(entity, value))
    }
}

PropertyDescriptor.defaults = function () {
    return {
        display: true,
        validators: []
    }
}

module.exports = PropertyDescriptor
