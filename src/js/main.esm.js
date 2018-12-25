import { Chocolat, defaults } from './chocolat.js'

const instances = []

export default function(options) {
    const settings = Object.assign({}, defaults, options, { setIndex: instances.length })
    const instance = new Chocolat(elements, settings)

    instances.push(instance)

    return instance
}
