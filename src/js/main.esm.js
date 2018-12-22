import { Chocolat, defaults } from './chocolat.js'

export default function(options) {
    return this.each(function() {
        calls++
        var settings = $.extend(true, {}, defaults, options, { setIndex: calls })

        if (!$.data(this, 'chocolat')) {
            $.data(this, 'chocolat', new Chocolat($(this), settings))
        }
    })
}
