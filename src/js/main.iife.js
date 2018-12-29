import { Chocolat, defaults } from './chocolat.js'

const instances = []

window.Chocolat = function(elements, options) {
    const settings = Object.assign({}, defaults, { images: [] }, options, {
        setIndex: instances.length,
    })
    const instance = new Chocolat(elements, settings)

    instances.push(instance)

    return instance
}
