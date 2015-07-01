expect = chai.expect

describe "Chocolat", ->
    describe "Opening", ->
        afterEach ->
            chocolat = $('#example0').data('chocolat')

            chocolat.elems.wrapper.remove()

            chocolat.elems.domContainer.removeClass('chocolat-open chocolat-mobile chocolat-in-container chocolat-cover');
            chocolat.settings.currentImage = false;
            chocolat.settings.initialized = false;

            $('#example0').data('chocolat', null)

        it "should call markup function and create markup", ->
            chocolat = $('#example0').Chocolat({
                loop : true,
                container : $('#container'),
            }).data('chocolat');

            spyMarkup = sinon.spy(chocolat, 'markup')

            $('#example0').find('.chocolat-image').first().trigger('click')

            expect(spyMarkup.calledOnce).to.be.true
            expect($('#container').find('.chocolat-wrapper').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-overlay').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-loader').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-content').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-top').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-bottom').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-left').length).to.equal(1)
            expect($('#container .chocolat-wrapper').find('.chocolat-right').length).to.equal(1)
            expect($('#container .chocolat-top').find('.chocolat-fullscreen').length).to.equal(1)
            expect($('#container .chocolat-top').find('.chocolat-pagination').length).to.equal(1)
            expect($('#container .chocolat-top').find('.chocolat-close').length).to.equal(1)
            expect($('#container .chocolat-bottom').find('.chocolat-description').length).to.equal(1)
            expect($('#container .chocolat-content').find('.chocolat-img').length).to.equal(1)

        it "should add css classes to parent when in container", ->
            chocolat = $('#example0').Chocolat({
                container : $('#container'),
            }).data('chocolat')

            chocolat.api().open().done( ->
                expect($('#container').hasClass('chocolat-in-container')).to.be.true
                expect($('#container').hasClass('chocolat-open')).to.be.true
                # expect($('#container').hasClass('chocolat-zoomable')).to.be.true
            )

        it "should add css classes to body when full window", ->
            chocolat = $('#example0').Chocolat({
                fullWindow : 'cover'
            }).data('chocolat')

            chocolat.api().open().done( ->
                expect($('body').hasClass('chocolat-open')).to.be.true
                expect($('body').hasClass('chocolat-' + chocolat.settings.fullWindow)).to.be.true
                # expect($('#container').hasClass('chocolat-zoomable')).to.be.true
            )

        it "should add custom css classe", ->
            chocolat = $('#example0').Chocolat({
                className : 'custom-class-name'
            }).data('chocolat')

            chocolat.api().open().done( ->
                expect($('body').hasClass('custom-class-name')).to.be.true
            )

        it "should call init function", ->

            chocolat = $('#example0').Chocolat({
                loop : true,
                container : $('#container'),
            }).data('chocolat');

            spyInit = sinon.spy(chocolat, 'init')

            $('#example0').find('.chocolat-image').first().trigger('click')

            expect(spyInit.calledOnce).to.be.true
            expect(spyInit.calledWithExactly(0)).to.be.true

        it "should call load function", ->

            chocolat = $('#example0').Chocolat({
                loop : true,
                container : $('#container'),
            }).data('chocolat');

            spyLoad = sinon.spy(chocolat, 'load')

            $('#example0').find('.chocolat-image').first().trigger('click')

            expect(spyLoad.calledOnce).to.be.true
            expect(spyLoad.calledWithExactly(0)).to.be.true

    describe "FullScreen", ->
        afterEach ->
            chocolat = $('#example0').data('chocolat')

            chocolat.elems.wrapper.remove()

            chocolat.elems.domContainer.removeClass('chocolat-open chocolat-mobile chocolat-in-container chocolat-cover');
            chocolat.settings.currentImage = false;
            chocolat.settings.initialized = false;

            $('#example0').data('chocolat', null)

        it "should open fullscreen when clicking .fullscreen", ->
            chocolat = $('#example0').Chocolat().data('chocolat')

            spyOpen = sinon.spy(chocolat, 'openFullScreen')

            chocolat.api().open().done( ->
                chocolat.elems.fullscreen.click()
                expect(spyOpen.calledOnce).to.be.true
                chocolat.elems.fullscreen.click()
            )

        it "should close fullscreen when clicking .fullscreen twice", ->
            chocolat = $('#example0').Chocolat().data('chocolat')

            spyClose = sinon.spy(chocolat, 'exitFullScreen')

            chocolat.api().open().done( ->
                chocolat.elems.fullscreen.click()
                chocolat.elems.fullscreen.click()
                expect(spyClose.calledOnce).to.be.true
            )


        it "should close fullscreen when closing chocolat", ->
            chocolat = $('#example0').Chocolat().data('chocolat')

            spyClose = sinon.spy(chocolat, 'exitFullScreen')

            chocolat.api().open().done( ->
                chocolat.elems.fullscreen.click()
                chocolat.elems.close.click()
                expect(spyClose.calledOnce).to.be.true
            )

        it "should open fullscreen directly", ->
            chocolat = $('#example0').Chocolat(
                fullScreen: true
            ).data('chocolat')

            spyOpen = sinon.spy(chocolat, 'openFullScreen')

            chocolat.api().open().done( ->
                expect(spyOpen.calledOnce).to.be.true
            )

    describe "API", ->

        chocolat = $('<div />').Chocolat({
            backgroundClose: false,
            images         : [
                {src : '../images/chocolat-1.jpg', title : 'You can zoom in the image'},
                {src : '../images/chocolat-2.jpg', title : 'You can zoom in the image'}, 
                {src : '../images/chocolat-3.jpg', title : 'You can zoom in the image'},
            ],
        }).data('chocolat')

        it "should have a open method", ->
            expect(typeof chocolat.api().open).to.equal("function")

        it "should have a close method", ->
            expect(typeof chocolat.api().close).to.equal("function")

        it "should have a next method", ->
            expect(typeof chocolat.api().next).to.equal("function")

        it "should have a prev method", ->
            expect(typeof chocolat.api().prev).to.equal("function")

        it "should have a goto method", ->
            expect(typeof chocolat.api().goto).to.equal("function")

        it "should have a current method", ->
            expect(typeof chocolat.api().current).to.equal("function")

        it "should have a place method", ->
            expect(typeof chocolat.api().place).to.equal("function")

        it "should have a set method", ->
            expect(typeof chocolat.api().set).to.equal("function")

        it "should have a get method", ->
            expect(typeof chocolat.api().get).to.equal("function")

        it "should have a getElem method", ->
            expect(typeof chocolat.api().getElem).to.equal("function")

