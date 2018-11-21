describe('Chocolat', function() {
    describe('Opening', function() {
        afterEach(function() {
            var chocolat = $('#example0').data('chocolat')
            return chocolat.api().destroy()
        })

        it('should call markup function and create markup', function() {
            var chocolat = $('#example0')
                .Chocolat({
                    loop: true,
                    container: $('#container'),
                })
                .data('chocolat')

            var spyMarkup = sinon.spy(chocolat, 'markup')

            $('#example0')
                .find('.chocolat-image')
                .first()
                .trigger('click')

            expect(spyMarkup.calledOnce).to.be.true
            expect($('#container').find('.chocolat-wrapper').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-overlay').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-loader').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-content').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-top').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-bottom').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-left').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-right').length).to.equal(1)
            expect($('#container .chocolat-top').find('.chocolat-close').length).to.equal(1)
            expect($('#container .chocolat-bottom').find('.chocolat-pagination').length).to.equal(1)
            expect($('#container .chocolat-bottom').find('.chocolat-description').length).to.equal(
                1
            )
            expect($('#container .chocolat-bottom').find('.chocolat-fullscreen').length).to.equal(1)
            expect($('#container .chocolat-bottom').find('.chocolat-set-title').length).to.equal(1)
            return expect($('#container .chocolat-content').find('.chocolat-img').length).to.equal(
                1
            )
        })

        it('should add css classes to parent when in container', function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    container: $('#container'),
                })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    expect($('#container').hasClass('chocolat-in-container')).to.be.true
                    expect($('#container').hasClass('chocolat-open')).to.be.true
                    // expect($('#container').hasClass('chocolat-zoomable')).to.be.true
                    return done()
                })
        })

        it('should add css classes to body when full window', function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    imageSize: 'cover',
                })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    expect($('body').hasClass('chocolat-open')).to.be.true
                    expect($('body').hasClass('chocolat-' + chocolat.settings.imageSize)).to.be.true
                    // expect($('#container').hasClass('chocolat-zoomable')).to.be.true
                    return done()
                })
        })

        it('should add custom css classe', function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    className: 'custom-class-name',
                })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    expect($('body').hasClass('custom-class-name')).to.be.true
                    return done()
                })
        })

        it('should call init function', function() {
            var chocolat = $('#example0')
                .Chocolat({
                    loop: true,
                    container: $('#container'),
                })
                .data('chocolat')

            var spyInit = sinon.spy(chocolat, 'init')

            $('#example0')
                .find('.chocolat-image')
                .first()
                .trigger('click')

            expect(spyInit.calledOnce).to.be.true
            return expect(spyInit.calledWithExactly(0)).to.be.true
        })

        it('should call load function', function() {
            var chocolat = $('#example0')
                .Chocolat({
                    loop: true,
                    container: $('#container'),
                })
                .data('chocolat')

            var spyLoad = sinon.spy(chocolat, 'load')

            $('#example0')
                .find('.chocolat-image')
                .first()
                .trigger('click')

            expect(spyLoad.calledOnce).to.be.true
            return expect(spyLoad.calledWithExactly(0)).to.be.true
        })

        it('should call markup function', function() {
            var chocolat = $('#example0')
                .Chocolat({
                    loop: true,
                    container: $('#container'),
                })
                .data('chocolat')

            var spyMarkup = sinon.spy(chocolat, 'markup')

            $('#example0')
                .find('.chocolat-image')
                .first()
                .trigger('click')

            return expect(spyMarkup.calledOnce).to.be.true
        })

        return it('should append description element in top element (instead of bottom, the default behaviour)', function() {
            var afterMarkup = function() {
                return this.elems.description.appendTo(this.elems.top)
            }

            var chocolat = $('#example0')
                .Chocolat({
                    loop: true,
                    container: $('#container'),
                    afterMarkup: afterMarkup,
                })
                .data('chocolat')

            $('#example0')
                .find('.chocolat-image')
                .first()
                .trigger('click')

            expect(chocolat.elems.top.find(chocolat.elems.description).length).to.equal(1)
            return expect(chocolat.elems.bottom.find(chocolat.elems.description).length).to.equal(0)
        })
    })

    describe('Destroy method', function() {
        afterEach(function() {
            var chocolat = $('#example0').data('chocolat')
            if (chocolat != null) {
                return chocolat.api().destroy()
            }
        })

        it('should remove data from calling element', function() {
            var chocolat = $('#example0')
                .Chocolat()
                .data('chocolat')

            var dataBefore = $('#example0').data('chocolat')
            expect(dataBefore).not.to.be.null

            chocolat.api().destroy()

            var dataAfter = $('#example0').data('chocolat')
            return expect(dataAfter).to.be.undefined
        })

        it('should remove wrapper element', function(done) {
            var chocolat = $('#example0')
                .Chocolat()
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    var lengthBefore = $('.chocolat-wrapper').length
                    expect(lengthBefore).to.equal(1)

                    chocolat.api().destroy()

                    var lengthAfter = $('.chocolat-wrapper').length
                    expect(lengthAfter).to.equal(0)
                    return done()
                })
        })

        return it('should unbind event handler of the links (triggering chocolat.open)', function() {
            var chocolat = $('#example0')
                .Chocolat()
                .data('chocolat')
            var imageSelector = chocolat.api().get('imageSelector')

            var links = chocolat.element.find(imageSelector)

            var eventBefore = $._data(links.first()[0], 'events')
            expect(eventBefore.click[0].namespace).to.equal('chocolat')

            chocolat.api().destroy()

            var eventAfter = $._data(links.first()[0], 'events')
            return expect(typeof eventAfter).to.equal('undefined')
        })
    })

    describe('FullScreen', function() {
        afterEach(function() {
            var chocolat = $('#example0').data('chocolat')
            return chocolat.api().destroy()
        })

        it('should open fullscreen when clicking .fullscreen', function(done) {
            var chocolat = $('#example0')
                .Chocolat()
                .data('chocolat')

            // test only if browser fullscreenAPI is available
            if (
                typeof Element.prototype.requestFullscreen === 'undefined' &&
                typeof Element.prototype.mozRequestFullScreen === 'undefined' &&
                typeof Element.prototype.webkitRequestFullscreen === 'undefined' &&
                typeof Element.prototype.msRequestFullscreen === 'undefined'
            ) {
                return done()
            }

            var spyOpen = sinon.spy(chocolat, 'openFullScreen')

            return chocolat
                .api()
                .open()
                .done(function() {
                    chocolat.elems.fullscreen.click()
                    expect(spyOpen.calledOnce).to.be.true
                    expect(chocolat.api().get('fullscreenOpen')).to.be.true
                    chocolat.elems.fullscreen.click()
                    expect(chocolat.api().get('fullscreenOpen')).to.be.false
                    return done()
                })
        })

        it('should close fullscreen when clicking .fullscreen twice', function(done) {
            var chocolat = $('#example0')
                .Chocolat()
                .data('chocolat')

            // test only if browser fullscreenAPI is available
            if (
                typeof Element.prototype.requestFullscreen === 'undefined' &&
                typeof Element.prototype.mozRequestFullScreen === 'undefined' &&
                typeof Element.prototype.webkitRequestFullscreen === 'undefined' &&
                typeof Element.prototype.msRequestFullscreen === 'undefined'
            ) {
                return done()
            }

            var spyClose = sinon.spy(chocolat, 'exitFullScreen')

            return chocolat
                .api()
                .open()
                .done(function() {
                    chocolat.elems.fullscreen.click()
                    chocolat.elems.fullscreen.click()
                    expect(spyClose.calledOnce).to.be.true

                    return done()
                })
        })

        it('should close fullscreen when closing chocolat', function(done) {
            var chocolat = $('#example0')
                .Chocolat()
                .data('chocolat')

            // test only if browser fullscreenAPI is available
            if (
                typeof Element.prototype.requestFullscreen === 'undefined' &&
                typeof Element.prototype.mozRequestFullScreen === 'undefined' &&
                typeof Element.prototype.webkitRequestFullscreen === 'undefined' &&
                typeof Element.prototype.msRequestFullscreen === 'undefined'
            ) {
                return done()
            }

            var spyClose = sinon.spy(chocolat, 'exitFullScreen')

            return chocolat
                .api()
                .open()
                .done(function() {
                    chocolat.elems.fullscreen.click()
                    chocolat.elems.close.click()
                    expect(spyClose.calledOnce).to.be.true
                    return done()
                })
        })

        return it('should open fullscreen directly', function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    fullScreen: true,
                })
                .data('chocolat')

            // test only if browser fullscreenAPI is available
            if (
                typeof Element.prototype.requestFullscreen === 'undefined' &&
                typeof Element.prototype.mozRequestFullScreen === 'undefined' &&
                typeof Element.prototype.webkitRequestFullscreen === 'undefined' &&
                typeof Element.prototype.msRequestFullscreen === 'undefined'
            ) {
                return done()
            }

            var spyOpen = sinon.spy(chocolat, 'openFullScreen')

            return chocolat
                .api()
                .open()
                .done(function() {
                    expect(spyOpen.calledOnce).to.be.true
                    return done()
                })
        })
    })

    describe('Change image', function() {
        afterEach(function() {
            var chocolat = $('#example0').data('chocolat')
            return chocolat.api().destroy()
        })

        it('should go to next image', function(done) {
            var chocolat = $('#example0')
                .Chocolat()
                .data('chocolat')

            var spyLoad = sinon.spy(chocolat, 'load')
            var spyChange = sinon.spy(chocolat, 'change')

            return chocolat
                .api()
                .open()
                .done(function() {
                    expect(spyLoad.calledWithExactly(0)).to.be.true

                    chocolat.elems.right.click()

                    expect(spyLoad.calledWithExactly(1)).to.be.true

                    expect(spyChange.calledOnce).to.be.true
                    expect(spyChange.calledWithExactly(1)).to.be.true

                    return done()
                })
        })

        it('should go to previous image', function(done) {
            var chocolat = $('#example0')
                .Chocolat()
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    var spyLoad = sinon.spy(chocolat, 'load')

                    return chocolat
                        .api()
                        .next()
                        .done(function() {
                            expect(spyLoad.calledWithExactly(1)).to.be.true
                            var spyChange = sinon.spy(chocolat, 'change')

                            return chocolat
                                .api()
                                .prev()
                                .done(function() {
                                    expect(spyLoad.calledWithExactly(0)).to.be.true

                                    expect(spyChange.calledOnce).to.be.true
                                    expect(spyChange.calledWithExactly(-1)).to.be.true

                                    expect(chocolat.api().current()).to.equal(0)

                                    return done()
                                })
                        })
                })
        })

        it('should loop and go to last image', function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    loop: true,
                })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    var spyLoad = sinon.spy(chocolat, 'load')

                    return chocolat
                        .api()
                        .prev()
                        .done(function() {
                            expect(
                                spyLoad.calledWithExactly(chocolat.api().get('lastImage'))
                            ).to.be.true
                            expect(chocolat.api().current()).to.equal(
                                chocolat.api().get('lastImage')
                            )

                            return done()
                        })
                })
        })

        return it('should loop and go to first image', function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    loop: true,
                })
                .data('chocolat')

            var lastImage = chocolat.settings.images.length - 1

            return chocolat
                .api()
                .open(lastImage)
                .done(function() {
                    var spyLoad = sinon.spy(chocolat, 'load')

                    return chocolat
                        .api()
                        .next()
                        .done(function() {
                            expect(spyLoad.calledWithExactly(0)).to.be.true
                            expect(chocolat.api().current()).to.equal(0)

                            return done()
                        })
                })
        })
    })

    describe('ImageSize cover', function() {
        afterEach(function() {
            var chocolat = $('#example0').data('chocolat')
            return chocolat.api().destroy()
        })

        it('should add class chocolat-cover to parent', function(done) {
            var chocolat = $('#example0')
                .Chocolat({ imageSize: 'cover' })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    expect(chocolat.api().get('imageSize')).to.equal('cover')
                    expect(
                        chocolat
                            .api()
                            .getElem('domContainer')
                            .hasClass('chocolat-cover')
                    ).to.be.true
                    return done()
                })
        })

        it("should have 'shortest' side of the container equal to 'shortest' side to the image in container", function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    imageSize: 'cover',
                    container: '#container',
                })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    var dim = getExpectedDimensions(chocolat)

                    if (dim.imgRatio < dim.containerRatio) {
                        var targetWidth = dim.imgHeight / dim.imgRatio
                        // 1px delta, because of rounded values
                        expect(dim.imgWidth).to.be.closeTo(targetWidth, 1)
                        expect(dim.imgHeight).to.equal(dim.containerHeight)
                    } else {
                        var targetHeight = dim.imgWidth * dim.imgRatio
                        // 1px delta, because of rounded values
                        expect(dim.imgWidth).to.be.closeTo(targetHeight, 1)
                        expect(dim.imgWidth).to.equal(dim.containerWidth)
                    }

                    return done()
                })
        })

        it("should have 'shortest' side of the container equal to 'shortest' side to the image in window", function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    imageSize: 'cover',
                })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    var dim = getExpectedDimensions(chocolat)

                    if (dim.imgRatio < dim.containerRatio) {
                        var targetWidth = dim.imgHeight / dim.imgRatio
                        // 1px delta, because of rounded values
                        expect(dim.imgWidth).to.be.closeTo(targetWidth, 1)
                        expect(dim.imgHeight).to.equal(dim.containerHeight)
                    } else {
                        var targetHeight = dim.imgWidth * dim.imgRatio
                        // 1px delta, because of rounded values
                        expect(dim.imgWidth).to.be.closeTo(targetHeight, 1)
                        expect(dim.imgWidth).to.equal(dim.containerWidth)
                    }

                    return done()
                })
        })

        return it('should center the image', function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    imageSize: 'cover',
                })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    var dim = getExpectedDimensions(chocolat)

                    var $content = chocolat.api().getElem('content')

                    var top = parseInt($content.css('top'), 10)
                    var left = parseInt($content.css('left'), 10)

                    var targetTop = (dim.containerHeight - dim.imgHeight) / 2
                    var targetLeft = (dim.containerWidth - dim.imgWidth) / 2

                    // 1px delta, because of rounded values
                    expect(top).to.be.closeTo(targetTop, 1)
                    expect(left).to.be.closeTo(targetLeft, 1)

                    return done()
                })
        })
    })

    describe('ImageSize contain', function() {
        afterEach(function() {
            var chocolat = $('#example0').data('chocolat')
            return chocolat.api().destroy()
        })

        it("should have 'longest' side of the container equal to 'longest' side to the image in container", function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    imageSize: 'contain',
                    container: '#container',
                })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    var dim = getExpectedDimensions(chocolat)

                    if (dim.imgRatio > dim.containerPaddedRatio) {
                        var targetWidth = dim.containerPaddedHeight / dim.imgRatio
                        // 1px delta, because of rounded values
                        expect(dim.imgWidth).to.be.closeTo(targetWidth, 1)
                        expect(dim.imgHeight).to.equal(dim.containerPaddedHeight)
                    } else {
                        var targetHeight = dim.containerPaddedWidth * dim.imgRatio
                        // 1px delta, because of rounded values
                        expect(dim.imgHeight).to.be.closeTo(targetHeight, 1)
                        expect(dim.imgWidth).to.equal(dim.containerPaddedWidth)
                    }

                    return done()
                })
        })

        it("should have 'longest' side of the container equal to 'longest' side to the image in window", function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    imageSize: 'contain',
                })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    var dim = getExpectedDimensions(chocolat)

                    if (dim.imgRatio > dim.containerPaddedRatio) {
                        var targetWidth = dim.containerPaddedHeight / dim.imgRatio
                        // 1px delta, because of rounded values
                        expect(dim.imgWidth).to.be.closeTo(targetWidth, 1)
                        expect(dim.imgHeight).to.equal(dim.containerPaddedHeight)
                    } else {
                        var targetHeight = dim.containerPaddedWidth * dim.imgRatio
                        // 1px delta, because of rounded values
                        expect(dim.imgHeight).to.be.closeTo(targetHeight, 1)
                        expect(dim.imgWidth).to.equal(dim.containerPaddedWidth)
                    }

                    return done()
                })
        })

        return it('should center the image', function(done) {
            var chocolat = $('#example0')
                .Chocolat({
                    imageSize: 'contain',
                })
                .data('chocolat')

            return chocolat
                .api()
                .open()
                .done(function() {
                    var dim = getExpectedDimensions(chocolat)

                    var $content = chocolat.api().getElem('content')

                    var top = parseInt($content.css('top'), 10)
                    var left = parseInt($content.css('left'), 10)

                    var targetTop = (dim.containerHeight - dim.imgHeight) / 2
                    var targetLeft = (dim.containerWidth - dim.imgWidth) / 2

                    // 1px delta, because of rounded values
                    expect(top).to.be.closeTo(targetTop, 1)
                    expect(left).to.be.closeTo(targetLeft, 1)

                    return done()
                })
        })
    })

    describe('API', function() {
        var chocolat = $('<div />')
            .Chocolat({
                backgroundClose: false,
                images: [
                    { src: '../dist/demo-images/1.jpg', title: 'You can zoom in the image' },
                    { src: '../dist/demo-images/2.jpg', title: 'You can zoom in the image' },
                    { src: '../dist/demo-images/3.jpg', title: 'You can zoom in the image' },
                ],
            })
            .data('chocolat')

        it('should have a open method', function() {
            expect(typeof chocolat.api().open).to.equal('function')
        })

        it('should have a close method', function() {
            expect(typeof chocolat.api().close).to.equal('function')
        })

        it('should have a next method', function() {
            expect(typeof chocolat.api().next).to.equal('function')
        })

        it('should have a prev method', function() {
            expect(typeof chocolat.api().prev).to.equal('function')
        })

        it('should have a goto method', function() {
            expect(typeof chocolat.api().goto).to.equal('function')
        })

        it('should have a current method', function() {
            expect(typeof chocolat.api().current).to.equal('function')
        })

        it('should have a place method', function() {
            expect(typeof chocolat.api().place).to.equal('function')
        })

        it('should have a destroy method', function() {
            expect(typeof chocolat.api().destroy).to.equal('function')
        })

        it('should have a set method', function() {
            expect(typeof chocolat.api().set).to.equal('function')
        })

        it('should have a get method', function() {
            expect(typeof chocolat.api().get).to.equal('function')
        })

        it('should have a getElem method', function() {
            expect(typeof chocolat.api().getElem).to.equal('function')
        })
    })
})

// function used to calculate image dimensions
// in order to be compared with what chocolat is really displaying
function getExpectedDimensions(chocolat) {
    var imgWidth = chocolat
        .api()
        .getElem('img')
        .width()
    var imgHeight = chocolat
        .api()
        .getElem('img')
        .height()

    var containerWidth = $(chocolat.api().get('container')).width()
    var containerHeight = $(chocolat.api().get('container')).height()

    var containerOutMarginH =
        chocolat
            .api()
            .getElem('top')
            .outerHeight(true) +
        chocolat
            .api()
            .getElem('bottom')
            .outerHeight(true)
    var containerOutMarginW =
        chocolat
            .api()
            .getElem('left')
            .outerWidth(true) +
        chocolat
            .api()
            .getElem('right')
            .outerWidth(true)

    var containerPaddedWidth = containerWidth - containerOutMarginW
    var containerPaddedHeight = containerHeight - containerOutMarginH

    var imgRatio = imgHeight / imgWidth
    var containerRatio = containerHeight / containerWidth
    var containerPaddedRatio = containerPaddedHeight / containerPaddedWidth

    return {
        imgWidth: imgWidth,
        imgHeight: imgHeight,
        containerWidth: containerWidth,
        containerHeight: containerHeight,
        containerOutMarginH: containerOutMarginH,
        containerOutMarginW: containerOutMarginW,
        containerPaddedWidth: containerPaddedWidth,
        containerPaddedHeight: containerPaddedHeight,
        imgRatio: imgRatio,
        containerRatio: containerRatio,
        containerPaddedRatio: containerPaddedRatio,
    }
}
