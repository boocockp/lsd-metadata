LSD Metadata
============

This module provides classes for defining business object metadata in LSD applications.

The metadata is used by other LSD modules, especially [LSD Views](https://github.com/lightweight-software-development/lsd-aws),
to generate common functionality automatically.

The convention used is for the business object class to have a static property `entityDescriptor` which returns an instance 
of `EntityDescriptor`.  This contains an instance of `PropertyDescriptor` for each stored or computed property.

Further documentation of the classes and their properties and methods is needed, but here is an example 
of how the metadata for a business object class called `Posting` is defined:

```javascript
const {Record} = require('immutable')
    , {DebitCredit} = require('./Types')
    , Account = () => require('./Account')
    , {EntityDescriptor, Reference} = require('lsd-metadata')

const descriptor = new EntityDescriptor("Posting",[
    {
        name: "account",
        type: Reference,
        get itemType() { return Account()},
        description: "The account for this posting"
    },
    {
        name: "type",
        type: DebitCredit,
        description: "Debit or Credit"
    },
    {
        name: "amount",
        type: Number,
        description: "The amount posted to this account"
    },
    {
        name: "shortSummary",
        type: String,
        computed: true,
        description: "Date and description of this transaction"
    }
])

class Posting extends Record(descriptor.defaultValues) {

    static get entityDescriptor() : Object {
        return descriptor
    }

    constructor(data : Object) {
        super(data)
    }

    setData(name, value) {
        return this.set(name, value)
    }

    toJSON() : Object {
        return Object.assign(super.toJSON(), {"@type": this.constructor.name});
    }

}
```