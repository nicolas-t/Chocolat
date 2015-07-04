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

        it "should add css classes to parent when in container", (done) ->
            chocolat = $('#example0').Chocolat({
                container : $('#container'),
            }).data('chocolat')

            chocolat.api().open().done( ->
                expect($('#container').hasClass('chocolat-in-container')).to.be.true
                expect($('#container').hasClass('chocolat-open')).to.be.true
                # expect($('#container').hasClass('chocolat-zoomable')).to.be.true
                done()
            )

        it "should add css classes to body when full window", (done) ->
            chocolat = $('#example0').Chocolat({
                fullWindow : 'cover'
            }).data('chocolat')

            chocolat.api().open().done( ->
                expect($('body').hasClass('chocolat-open')).to.be.true
                expect($('body').hasClass('chocolat-' + chocolat.settings.fullWindow)).to.be.true
                # expect($('#container').hasClass('chocolat-zoomable')).to.be.true
                done()
            )

        it "should add custom css classe", (done) ->
            chocolat = $('#example0').Chocolat({
                className : 'custom-class-name'
            }).data('chocolat')

            chocolat.api().open().done( ->
                expect($('body').hasClass('custom-class-name')).to.be.true
                done()
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

            chocolat?.elems?.wrapper?.remove()

            chocolat?.elems?.domContainer?.removeClass('chocolat-open chocolat-mobile chocolat-in-container chocolat-cover');
            chocolat?.settings.currentImage = false;
            chocolat?.settings.initialized = false;

            $('#example0').data('chocolat', null)

        it "should open fullscreen when clicking .fullscreen", (done) ->

            chocolat = $('#example0').Chocolat().data('chocolat')

            # test only if browser fullscreenAPI is available
            if typeof Element.prototype.requestFullscreen == 'undefined' and
            typeof Element.prototype.mozRequestFullScreen == 'undefined' and
            typeof Element.prototype.webkitRequestFullscreen == 'undefined' and
            typeof Element.prototype.msRequestFullscreen == 'undefined'
                return done()

            spyOpen = sinon.spy(chocolat, 'openFullScreen')

            chocolat.api().open().done( ->
                chocolat.elems.fullscreen.click()
                expect(spyOpen.calledOnce).to.be.true
                expect(chocolat.api().get('fullscreenOpen')).to.be.true
                chocolat.elems.fullscreen.click()
                expect(chocolat.api().get('fullscreenOpen')).to.be.false
                done()
            ) 

        it "should close fullscreen when clicking .fullscreen twice", (done) ->

            chocolat = $('#example0').Chocolat().data('chocolat')

            # test only if browser fullscreenAPI is available
            if typeof Element.prototype.requestFullscreen == 'undefined' and
            typeof Element.prototype.mozRequestFullScreen == 'undefined' and
            typeof Element.prototype.webkitRequestFullscreen == 'undefined' and
            typeof Element.prototype.msRequestFullscreen == 'undefined'
                return done()

            spyClose = sinon.spy(chocolat, 'exitFullScreen')

            chocolat.api().open().done( ->
                chocolat.elems.fullscreen.click()
                chocolat.elems.fullscreen.click()
                expect(spyClose.calledOnce).to.be.true

                done()
            )

        it "should close fullscreen when closing chocolat", (done) ->

            chocolat = $('#example0').Chocolat().data('chocolat')

            # test only if browser fullscreenAPI is available
            if typeof Element.prototype.requestFullscreen == 'undefined' and
            typeof Element.prototype.mozRequestFullScreen == 'undefined' and
            typeof Element.prototype.webkitRequestFullscreen == 'undefined' and
            typeof Element.prototype.msRequestFullscreen == 'undefined'
                return done()

            spyClose = sinon.spy(chocolat, 'exitFullScreen')

            chocolat.api().open().done( ->
                chocolat.elems.fullscreen.click()
                chocolat.elems.close.click()
                expect(spyClose.calledOnce).to.be.true
                done()
            )

        it "should open fullscreen directly", (done) ->
            chocolat = $('#example0').Chocolat(
                fullScreen: true
            ).data('chocolat')
    
            # test only if browser fullscreenAPI is available
            if typeof Element.prototype.requestFullscreen == 'undefined' and
            typeof Element.prototype.mozRequestFullScreen == 'undefined' and
            typeof Element.prototype.webkitRequestFullscreen == 'undefined' and
            typeof Element.prototype.msRequestFullscreen == 'undefined'
                return done()

            spyOpen = sinon.spy(chocolat, 'openFullScreen')

            chocolat.api().open().done( ->
                expect(spyOpen.calledOnce).to.be.true
                done()
            )

    describe "Change image", ->
        afterEach ->
            chocolat = $('#example0').data('chocolat')

            chocolat.elems.wrapper.remove()

            chocolat.elems.domContainer.removeClass('chocolat-open chocolat-mobile chocolat-in-container chocolat-cover');
            chocolat.settings.currentImage = false;
            chocolat.settings.initialized = false;

            $('#example0').data('chocolat', null)

        it "should go to next image", (done) ->
            chocolat = $('#example0').Chocolat().data('chocolat')

            spyLoad = sinon.spy(chocolat, 'load')
            spyChange = sinon.spy(chocolat, 'change')

            chocolat.api().open().done( ->
                expect(spyLoad.calledWithExactly(0)).to.be.true

                chocolat.elems.right.click()

                expect(spyLoad.calledWithExactly(1)).to.be.true

                expect(spyChange.calledOnce).to.be.true
                expect(spyChange.calledWithExactly(1)).to.be.true

                done()
            )

        it "should go to previous image", (done) ->
            chocolat = $('#example0').Chocolat().data('chocolat')

            chocolat.api().open().done( ->
                spyLoad = sinon.spy(chocolat, 'load')

                chocolat.api().next().done( ->


                    expect(spyLoad.calledWithExactly(1)).to.be.true
                    spyChange = sinon.spy(chocolat, 'change')

                    chocolat.api().prev().done( ->
                        expect(spyLoad.calledWithExactly(0)).to.be.true
                        
                        expect(spyChange.calledOnce).to.be.true
                        expect(spyChange.calledWithExactly(-1)).to.be.true

                        expect(chocolat.api().current()).to.equal(0)

                        done()
                    )


                )

            )

        it "should loop and go to last image", (done) ->
            chocolat = $('#example0').Chocolat({
                loop : true
            }).data('chocolat')

            chocolat.api().open().done( ->
                
                spyLoad = sinon.spy(chocolat, 'load')

                chocolat.api().prev().done( ->
                    expect(spyLoad.calledWithExactly(chocolat.api().get('lastImage'))).to.be.true
                    expect(chocolat.api().current()).to.equal(chocolat.api().get('lastImage'))

                    done()
                )

            )

        it "should loop and go to first image", (done) ->
            chocolat = $('#example0').Chocolat({
                loop : true
            }).data('chocolat')

            lastImage = chocolat.settings.images.length - 1

            chocolat.api().open(lastImage).done( ->
                
                spyLoad = sinon.spy(chocolat, 'load')
                
                chocolat.api().next().done( ->
                    expect(spyLoad.calledWithExactly(0)).to.be.true
                    expect(chocolat.api().current()).to.equal(0)

                    done()
                )

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

