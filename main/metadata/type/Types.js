module.exports = {
    isSameType(a, b) {
        if (typeof a !== "function" || typeof b !== "function") return false
        if (a === b) return true
        if (a.typeId || b.typeId) return a.typeId === b.typeId
        return a.name === b.name
    }
}