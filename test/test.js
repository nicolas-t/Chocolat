describe('Chocolat', function() {
    var chocolat

    beforeEach(function() {})

    afterEach(function() {
        chocolat.api.destroy()
    })

    describe('Opening', function() {
        it('should call markup function and create markup', function() {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                loop: true,
                container: document.querySelector('#container'),
            })

            var spyMarkup = sinon.spy(chocolat, 'markup')

            $('#example0')
                .find('.chocolat-image')
                .first()[0]
                .click()

            expect(spyMarkup.calledOnce).to.be.true
            expect($('#container').find('.chocolat-wrapper').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-overlay').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-loader').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-layout').length).to.equal(1)
            expect(
                $('#container .chocolat-wrapper').find('.chocolat-image-canvas').length
            ).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-center').length).to.equal(1)
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
            expect($('#container .chocolat-image-wrapper').find('.chocolat-img').length).to.equal(1)
        })

        it('should add css classes to parent when in container', function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                container: document.querySelector('#container'),
            })

            chocolat.api.open().then(function() {
                expect($('#container').hasClass('chocolat-in-container')).to.be.true
                expect($('#container').hasClass('chocolat-open')).to.be.true
                // expect($('#container').hasClass('chocolat-zoomable')).to.be.true
                return done()
            })
        })

        it('should add css classes to body when full window', function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                imageSize: 'cover',
            })

            chocolat.api.open().then(function() {
                expect($('body').hasClass('chocolat-open')).to.be.true
                expect($('body').hasClass('chocolat-' + chocolat.settings.imageSize)).to.be.true
                // expect($('#container').hasClass('chocolat-zoomable')).to.be.true
                return done()
            })
        })

        it('should add custom css classes', function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                className: 'custom-class-name',
            })

            chocolat.api.open().then(function() {
                expect($('body').hasClass('custom-class-name')).to.be.true
                return done()
            })
        })

        it('should call init function', function() {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                loop: true,
                container: document.querySelector('#container'),
            })

            var spyInit = sinon.spy(chocolat, 'init')

            $('#example0')
                .find('.chocolat-image')
                .first()[0]
                .click()

            expect(spyInit.calledOnce).to.be.true
            expect(spyInit.calledWithExactly(0)).to.be.true
        })

        it('should call load function', function() {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                loop: true,
                container: document.querySelector('#container'),
            })

            var spyLoad = sinon.spy(chocolat, 'load')

            $('#example0')
                .find('.chocolat-image')
                .first()[0]
                .click()

            expect(spyLoad.calledOnce).to.be.true
            expect(spyLoad.calledWithExactly(0)).to.be.true
        })

        it('should call markup function', function() {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                loop: true,
                container: document.querySelector('#container'),
            })

            var spyMarkup = sinon.spy(chocolat, 'markup')

            $('#example0')
                .find('.chocolat-image')
                .first()[0]
                .click()

            expect(spyMarkup.calledOnce).to.be.true
        })

        it('should append description element in top element (instead of bottom, the default behaviour)', function() {
            var afterMarkup = function() {
                return $(this.elems.description).appendTo(this.elems.top)
            }

            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                loop: true,
                container: document.querySelector('#container'),
                afterMarkup: afterMarkup,
            })

            $('#example0')
                .find('.chocolat-image')
                .first()[0]
                .click()

            const top = chocolat.api.getElem('top')
            const bottom = chocolat.api.getElem('bottom')
            expect($(top).find(chocolat.api.getElem('description')).length).to.equal(1)
            expect($(bottom).find(chocolat.api.getElem('description')).length).to.equal(0)
        })

        it('can define a title', function() {
            var setTitle = function() {
                return 'hello'
            }

            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                container: document.querySelector('#container'),
                setTitle: setTitle,
            })

            $('#example0')
                .find('.chocolat-image')
                .first()[0]
                .click()

            const elem = chocolat.api.getElem('setTitle')
            expect(elem.textContent).to.equal('hello')
        })

        it('can define a description per image', function(done) {
            var description = function() {
                return 'prefix ' + this.images[this.settings.currentImageIndex].title + ' suffix'
            }

            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                container: document.querySelector('#container'),
                description: description,
            })

            chocolat.api.open().then(() => {
                const elem = chocolat.api.getElem('description')
                expect(elem.textContent).to.equal('prefix foo suffix')

                chocolat.api.next().then(() => {
                    const elem = chocolat.api.getElem('description')
                    expect(elem.textContent).to.equal('prefix baz suffix')
                    done()
                })
            })
        })

        it('can define a pagination per image', function(done) {
            var pagination = function() {
                var last = this.settings.lastImageIndex + 1
                var position = this.settings.currentImageIndex + 1

                return 'prefix ' + position + '/' + last + ' suffix'
            }

            chocolat = Chocolat(document.querySelectorAll('#example0 .chocolat-image'), {
                container: document.querySelector('#container'),
                pagination: pagination,
            })

            chocolat.api.open().then(() => {
                const elem = chocolat.api.getElem('pagination')
                expect(elem.textContent).to.equal('prefix 1/3 suffix')

                chocolat.api.next().then(() => {
                    const elem = chocolat.api.getElem('pagination')
                    expect(elem.textContent).to.equal('prefix 2/3 suffix')
                    done()
                })
            })
        })
    })

    describe('Destroy method', function() {
        it('should remove wrapper element', function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'))

            chocolat.api.open().then(function() {
                var lengthBefore = $('.chocolat-wrapper').length
                expect(lengthBefore).to.equal(1)

                chocolat.api.destroy()

                var lengthAfter = $('.chocolat-wrapper').length
                expect(lengthAfter).to.equal(0)
                return done()
            })
        })

        it('should unbind event handler of the links (triggering chocolat.open)', function() {
            const links = document.querySelectorAll('.chocolat-image')
            chocolat = Chocolat(links)

            var eventBefore = Object.values(chocolat.events)
            expect(eventBefore.length).to.be.above(0)

            chocolat.api.destroy()

            var eventAfter = Object.values(chocolat.events)
            expect(eventAfter.length).to.equal(0)

            var spyInit = sinon.spy(chocolat, 'init')

            const link = links[0]
            const linkBefore = link.getAttribute('href')

            link.setAttribute('href', '#')
            link.click()

            expect(spyInit.notCalled).to.be.true
            link.setAttribute('href', linkBefore)
        })
    })

    describe('Change image', function() {
        it('should go to next image', function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'))

            var spyLoad = sinon.spy(chocolat, 'load')
            var spyChange = sinon.spy(chocolat, 'change')

            chocolat.api.open().then(function() {
                expect(spyLoad.calledWithExactly(0)).to.be.true

                chocolat.elems.right.click()

                expect(spyLoad.calledWithExactly(1)).to.be.true

                expect(spyChange.calledOnce).to.be.true
                expect(spyChange.calledWithExactly(1)).to.be.true

                return done()
            })
        })

        it('should go to previous image', function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'))

            chocolat.api.open().then(function() {
                var spyLoad = sinon.spy(chocolat, 'load')

                chocolat.api.next().then(function() {
                    expect(spyLoad.calledWithExactly(1)).to.be.true
                    var spyChange = sinon.spy(chocolat, 'change')

                    chocolat.api.prev().then(function() {
                        expect(spyLoad.calledWithExactly(0)).to.be.true

                        expect(spyChange.calledOnce).to.be.true
                        expect(spyChange.calledWithExactly(-1)).to.be.true

                        expect(chocolat.api.current()).to.equal(0)

                        return done()
                    })
                })
            })
        })

        it('should loop and go to last image', function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                loop: true,
            })

            chocolat.api.open().then(function() {
                var spyLoad = sinon.spy(chocolat, 'load')

                chocolat.api.prev().then(function() {
                    expect(spyLoad.calledWithExactly(chocolat.api.get('lastImageIndex'))).to.be.true
                    expect(chocolat.api.current()).to.equal(chocolat.api.get('lastImageIndex'))

                    return done()
                })
            })
        })

        return it('should loop and go to first image', function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                loop: true,
            })

            var lastImageIndex = chocolat.images.length - 1

            chocolat.api.open(lastImageIndex).then(function() {
                var spyLoad = sinon.spy(chocolat, 'load')

                chocolat.api.next().then(function() {
                    expect(spyLoad.calledWithExactly(0)).to.be.true
                    expect(chocolat.api.current()).to.equal(0)

                    return done()
                })
            })
        })
    })

    describe('ImageSize cover', function() {
        it('should add class chocolat-cover to parent', function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                imageSize: 'cover',
            })

            chocolat.api.open().then(function() {
                expect(chocolat.api.get('imageSize')).to.equal('cover')
                expect(
                    chocolat.api.getElem('container').classList.contains('chocolat-cover')
                ).to.be.true
                return done()
            })
        })

        it("should have 'shortest' side of the container equal to 'shortest' side to the image in container", function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                imageSize: 'cover',
                container: document.querySelector('#container'),
            })

            chocolat.api.open().then(function() {
                var dim = getExpectedDimensions(chocolat)

                if (dim.imgRatio < dim.containerRatio) {
                    var targetWidth = dim.imgHeight / dim.imgRatio
                    // 1px delta, because of rounded values
                    expect(dim.imgWidth).to.be.closeTo(targetWidth, 1)
                    expect(dim.imgHeight).to.be.closeTo(dim.containerHeight, 1)
                } else {
                    var targetHeight = dim.imgWidth * dim.imgRatio
                    // 1px delta, because of rounded values
                    expect(dim.imgHeight).to.be.closeTo(targetHeight, 1)
                    expect(dim.imgWidth).to.be.closeTo(dim.containerWidth, 1)
                }

                return done()
            })
        })

        it("should have 'shortest' side of the container equal to 'shortest' side to the image in window", function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                imageSize: 'cover',
            })

            chocolat.api.open().then(function() {
                var dim = getExpectedDimensions(chocolat)

                if (dim.imgRatio < dim.containerRatio) {
                    var targetWidth = dim.imgHeight / dim.imgRatio
                    // 1px delta, because of rounded values
                    expect(dim.imgWidth).to.be.closeTo(targetWidth, 1)
                    expect(dim.imgHeight).to.be.closeTo(dim.containerHeight, 1)
                } else {
                    var targetHeight = dim.imgWidth * dim.imgRatio
                    // 1px delta, because of rounded values
                    expect(dim.imgHeight).to.be.closeTo(targetHeight, 1)
                    expect(dim.imgWidth).to.be.closeTo(dim.containerWidth, 1)
                }

                return done()
            })
        })
    })

    describe('ImageSize contain', function() {
        it("should have 'longest' side of the container equal to 'longest' side to the image in container", function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                imageSize: 'contain',
                container: document.querySelector('#container'),
            })

            chocolat.api.open().then(function() {
                var dim = getExpectedDimensions(chocolat)

                if (dim.imgRatio > dim.canvasRatio) {
                    var targetWidth = dim.canvasHeight / dim.imgRatio
                    // 1px delta, because of rounded values
                    expect(dim.imgWidth).to.be.closeTo(targetWidth, 1)
                    expect(dim.imgHeight).to.be.closeTo(dim.canvasHeight, 1)
                } else {
                    var targetHeight = dim.canvasWidth * dim.imgRatio
                    // 1px delta, because of rounded values
                    expect(dim.imgHeight).to.be.closeTo(targetHeight, 1)
                    expect(dim.imgWidth).to.be.closeTo(dim.canvasWidth, 1)
                }

                return done()
            })
        })

        it("should have 'longest' side of the container equal to 'longest' side to the image in window", function(done) {
            chocolat = Chocolat(document.querySelectorAll('.chocolat-image'), {
                imageSize: 'contain',
            })

            chocolat.api.open().then(function() {
                var dim = getExpectedDimensions(chocolat)

                if (dim.imgRatio > dim.canvasRatio) {
                    var targetWidth = dim.canvasHeight / dim.imgRatio
                    // 1px delta, because of rounded values
                    expect(dim.imgWidth).to.be.closeTo(targetWidth, 1)
                    expect(dim.imgHeight).to.be.closeTo(dim.canvasHeight, 1)
                } else {
                    var targetHeight = dim.canvasWidth * dim.imgRatio
                    // 1px delta, because of rounded values
                    expect(dim.imgHeight).to.be.closeTo(targetHeight, 1)
                    expect(dim.imgWidth).to.be.closeTo(dim.canvasWidth, 1)
                }

                return done()
            })
        })
    })

    describe('API', function() {
        before(function() {
            chocolat = Chocolat([
                { src: '../demo/demo-images/1.jpg', title: 'You can zoom in the image' },
                { src: '../demo/demo-images/2.jpg', title: 'You can zoom in the image' },
                { src: '../demo/demo-images/3.jpg', title: 'You can zoom in the image' },
            ])
        })

        it('should have a open method', function() {
            expect(typeof chocolat.api.open).to.equal('function')
        })

        it('should have a close method', function() {
            expect(typeof chocolat.api.close).to.equal('function')
        })

        it('should have a next method', function() {
            expect(typeof chocolat.api.next).to.equal('function')
        })

        it('should have a prev method', function() {
            expect(typeof chocolat.api.prev).to.equal('function')
        })

        it('should have a goto method', function() {
            expect(typeof chocolat.api.goto).to.equal('function')
        })

        it('should have a current method', function() {
            expect(typeof chocolat.api.current).to.equal('function')
        })

        it('should have a position method', function() {
            expect(typeof chocolat.api.position).to.equal('function')
        })

        it('should have a destroy method', function() {
            expect(typeof chocolat.api.destroy).to.equal('function')
        })

        it('should have a set method', function() {
            expect(typeof chocolat.api.set).to.equal('function')
        })

        it('should have a get method', function() {
            expect(typeof chocolat.api.get).to.equal('function')
        })

        it('should have a getElem method', function() {
            expect(typeof chocolat.api.getElem).to.equal('function')
        })
    })

    describe('srcset and sizes attributes', function() {
        before(function() {
            chocolat = Chocolat(document.querySelectorAll('#example1 .chocolat-image'), {})
        })
        it('Should include the same srcset and sizes attributes from the trigger link (data-srcset and data-sizes)', function() {
            const trigger = document.querySelector('#example1 .chocolat-image')

            chocolat.api.open().then(function() {
                const openedImg = document.querySelector('.chocolat-image-wrapper img.chocolat-img')

                expect(openedImg.getAttribute('srcset')).to.be.equal(
                    trigger.getAttribute('data-srcset')
                )
                expect(openedImg.getAttribute('sizes')).to.be.equal(
                    trigger.getAttribute('data-sizes')
                )
            })
        })
        it('Should not add empty srcset or sizes attributes', function() {
            const trigger = document.querySelector('#example0 .chocolat-image')

            chocolat.api.open().then(function() {
                const openedImg = document.querySelector('.chocolat-image-wrapper img.chocolat-img')

                expect(openedImg.getAttribute('srcset')).to.be.null()
                expect(openedImg.getAttribute('sizes')).to.be.null()
            })
        })
    })
})

function getJqueryElement(name) {}

// function used to calculate image dimensions
// in order to be compared with what chocolat is really displaying
function getExpectedDimensions(chocolat) {
    var imgWidth = chocolat.api.getElem('img').width
    var imgHeight = chocolat.api.getElem('img').height

    var containerWidth = chocolat.api.getElem('container').clientWidth
    var containerHeight = chocolat.api.getElem('container').clientHeight

    var canvasWidth = chocolat.api.getElem('imageCanvas').clientWidth
    var canvasHeight = chocolat.api.getElem('imageCanvas').clientHeight

    var imgRatio = imgHeight / imgWidth
    var containerRatio = containerHeight / containerWidth
    var canvasRatio = canvasHeight / canvasWidth

    return {
        imgWidth: imgWidth,
        imgHeight: imgHeight,
        containerWidth: containerWidth,
        containerHeight: containerHeight,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        imgRatio: imgRatio,
        containerRatio: containerRatio,
        canvasRatio: canvasRatio,
    }
}
