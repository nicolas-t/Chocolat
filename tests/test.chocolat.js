var expect;

expect = chai.expect;

describe("Chocolat", function() {
  describe("Opening", function() {
    afterEach(function() {
      var chocolat;
      chocolat = $('#example0').data('chocolat');
      chocolat.elems.wrapper.remove();
      chocolat.elems.domContainer.removeClass('chocolat-open chocolat-mobile chocolat-in-container chocolat-cover');
      chocolat.settings.currentImage = false;
      chocolat.settings.initialized = false;
      return $('#example0').data('chocolat', null);
    });
    it("should call markup function and create markup", function() {
      var chocolat, spyMarkup;
      chocolat = $('#example0').Chocolat({
        loop: true,
        container: $('#container')
      }).data('chocolat');
      spyMarkup = sinon.spy(chocolat, 'markup');
      $('#example0').find('.chocolat-image').first().trigger('click');
      expect(spyMarkup.calledOnce).to.be["true"];
      expect($('#container').find('.chocolat-wrapper').length).to.equal(1);
      expect($('#container .chocolat-wrapper').find('.chocolat-overlay').length).to.equal(1);
      expect($('#container .chocolat-wrapper').find('.chocolat-loader').length).to.equal(1);
      expect($('#container .chocolat-wrapper').find('.chocolat-content').length).to.equal(1);
      expect($('#container .chocolat-wrapper').find('.chocolat-top').length).to.equal(1);
      expect($('#container .chocolat-wrapper').find('.chocolat-bottom').length).to.equal(1);
      expect($('#container .chocolat-wrapper').find('.chocolat-left').length).to.equal(1);
      expect($('#container .chocolat-wrapper').find('.chocolat-right').length).to.equal(1);
      expect($('#container .chocolat-top').find('.chocolat-fullscreen').length).to.equal(1);
      expect($('#container .chocolat-top').find('.chocolat-pagination').length).to.equal(1);
      expect($('#container .chocolat-top').find('.chocolat-close').length).to.equal(1);
      expect($('#container .chocolat-bottom').find('.chocolat-description').length).to.equal(1);
      return expect($('#container .chocolat-content').find('.chocolat-img').length).to.equal(1);
    });
    it("should add css classes to parent when in container", function() {
      var chocolat;
      chocolat = $('#example0').Chocolat({
        container: $('#container')
      }).data('chocolat');
      return chocolat.api().open().done(function() {
        expect($('#container').hasClass('chocolat-in-container')).to.be["true"];
        return expect($('#container').hasClass('chocolat-open')).to.be["true"];
      });
    });
    it("should add css classes to body when full window", function() {
      var chocolat;
      chocolat = $('#example0').Chocolat({
        fullWindow: 'cover'
      }).data('chocolat');
      return chocolat.api().open().done(function() {
        expect($('body').hasClass('chocolat-open')).to.be["true"];
        return expect($('body').hasClass('chocolat-' + chocolat.settings.fullWindow)).to.be["true"];
      });
    });
    it("should add custom css classe", function() {
      var chocolat;
      chocolat = $('#example0').Chocolat({
        className: 'custom-class-name'
      }).data('chocolat');
      return chocolat.api().open().done(function() {
        return expect($('body').hasClass('custom-class-name')).to.be["true"];
      });
    });
    it("should call init function", function() {
      var chocolat, spyInit;
      chocolat = $('#example0').Chocolat({
        loop: true,
        container: $('#container')
      }).data('chocolat');
      spyInit = sinon.spy(chocolat, 'init');
      $('#example0').find('.chocolat-image').first().trigger('click');
      expect(spyInit.calledOnce).to.be["true"];
      return expect(spyInit.calledWithExactly(0)).to.be["true"];
    });
    return it("should call load function", function() {
      var chocolat, spyLoad;
      chocolat = $('#example0').Chocolat({
        loop: true,
        container: $('#container')
      }).data('chocolat');
      spyLoad = sinon.spy(chocolat, 'load');
      $('#example0').find('.chocolat-image').first().trigger('click');
      expect(spyLoad.calledOnce).to.be["true"];
      return expect(spyLoad.calledWithExactly(0)).to.be["true"];
    });
  });
  describe("FullScreen", function() {
    afterEach(function() {
      var chocolat;
      chocolat = $('#example0').data('chocolat');
      chocolat.elems.wrapper.remove();
      chocolat.elems.domContainer.removeClass('chocolat-open chocolat-mobile chocolat-in-container chocolat-cover');
      chocolat.settings.currentImage = false;
      chocolat.settings.initialized = false;
      return $('#example0').data('chocolat', null);
    });
    it("should open fullscreen when clicking .fullscreen", function() {
      var chocolat, spyOpen;
      chocolat = $('#example0').Chocolat().data('chocolat');
      spyOpen = sinon.spy(chocolat, 'openFullScreen');
      return chocolat.api().open().done(function() {
        chocolat.elems.fullscreen.click();
        expect(spyOpen.calledOnce).to.be["true"];
        return chocolat.elems.fullscreen.click();
      });
    });
    it("should close fullscreen when clicking .fullscreen twice", function() {
      var chocolat, spyClose;
      chocolat = $('#example0').Chocolat().data('chocolat');
      spyClose = sinon.spy(chocolat, 'exitFullScreen');
      return chocolat.api().open().done(function() {
        chocolat.elems.fullscreen.click();
        chocolat.elems.fullscreen.click();
        return expect(spyClose.calledOnce).to.be["true"];
      });
    });
    it("should close fullscreen when closing chocolat", function() {
      var chocolat, spyClose;
      chocolat = $('#example0').Chocolat().data('chocolat');
      spyClose = sinon.spy(chocolat, 'exitFullScreen');
      return chocolat.api().open().done(function() {
        chocolat.elems.fullscreen.click();
        chocolat.elems.close.click();
        return expect(spyClose.calledOnce).to.be["true"];
      });
    });
    return it("should open fullscreen directly", function() {
      var chocolat, spyOpen;
      chocolat = $('#example0').Chocolat({
        fullScreen: true
      }).data('chocolat');
      spyOpen = sinon.spy(chocolat, 'openFullScreen');
      return chocolat.api().open().done(function() {
        return expect(spyOpen.calledOnce).to.be["true"];
      });
    });
  });
  describe("Change image", function() {
    afterEach(function() {
      var chocolat;
      chocolat = $('#example0').data('chocolat');
      chocolat.elems.wrapper.remove();
      chocolat.elems.domContainer.removeClass('chocolat-open chocolat-mobile chocolat-in-container chocolat-cover');
      chocolat.settings.currentImage = false;
      chocolat.settings.initialized = false;
      return $('#example0').data('chocolat', null);
    });
    it("should go to next image", function() {
      var chocolat, spyChange, spyLoad;
      chocolat = $('#example0').Chocolat().data('chocolat');
      spyLoad = sinon.spy(chocolat, 'load');
      spyChange = sinon.spy(chocolat, 'change');
      return chocolat.api().open().done(function() {
        expect(spyLoad.calledWithExactly(0)).to.be["true"];
        chocolat.elems.right.click();
        expect(spyLoad.calledWithExactly(1)).to.be["true"];
        expect(spyChange.calledOnce).to.be["true"];
        return expect(spyChange.calledWithExactly(1)).to.be["true"];
      });
    });
    it("should go to previous image", function() {
      var chocolat;
      chocolat = $('#example0').Chocolat().data('chocolat');
      return chocolat.api().open().done(function() {
        var spyChange, spyLoad;
        spyLoad = sinon.spy(chocolat, 'load');
        spyChange = sinon.spy(chocolat, 'change');
        return chocolat.api().next().done(function() {
          expect(spyLoad.calledWithExactly(1)).to.be["true"];
          chocolat.elems.left.click();
          expect(spyLoad.calledWithExactly(0)).to.be["true"];
          expect(spyChange.calledOnce).to.be["true"];
          expect(spyChange.calledWithExactly(-1)).to.be["true"];
          return expect(chocolat.api().current()).to.equal(0);
        });
      });
    });
    it("should loop and go to last image", function() {
      var chocolat;
      chocolat = $('#example0').Chocolat({
        loop: true
      }).data('chocolat');
      return chocolat.api().open().done(function() {
        var spyLoad;
        spyLoad = sinon.spy(chocolat, 'load');
        return chocolat.api().prev().done(function() {
          expect(spyLoad.calledWithExactly(chocolat.api().get('lastImage'))).to.be["true"];
          return expect(chocolat.api().current()).to.equal(chocolat.api().get('lastImage'));
        });
      });
    });
    return it("should loop and go to first image", function() {
      var chocolat, lastImage;
      chocolat = $('#example0').Chocolat({
        loop: true
      }).data('chocolat');
      lastImage = chocolat.settings.images.length - 1;
      return chocolat.api().open(lastImage).done(function() {
        var spyLoad;
        spyLoad = sinon.spy(chocolat, 'load');
        return chocolat.api().next().done(function() {
          expect(spyLoad.calledWithExactly(0)).to.be["true"];
          return expect(chocolat.api().current()).to.equal(0);
        });
      });
    });
  });
  return describe("API", function() {
    var chocolat;
    chocolat = $('<div />').Chocolat({
      backgroundClose: false,
      images: [
        {
          src: '../images/chocolat-1.jpg',
          title: 'You can zoom in the image'
        }, {
          src: '../images/chocolat-2.jpg',
          title: 'You can zoom in the image'
        }, {
          src: '../images/chocolat-3.jpg',
          title: 'You can zoom in the image'
        }
      ]
    }).data('chocolat');
    it("should have a open method", function() {
      return expect(typeof chocolat.api().open).to.equal("function");
    });
    it("should have a close method", function() {
      return expect(typeof chocolat.api().close).to.equal("function");
    });
    it("should have a next method", function() {
      return expect(typeof chocolat.api().next).to.equal("function");
    });
    it("should have a prev method", function() {
      return expect(typeof chocolat.api().prev).to.equal("function");
    });
    it("should have a goto method", function() {
      return expect(typeof chocolat.api().goto).to.equal("function");
    });
    it("should have a current method", function() {
      return expect(typeof chocolat.api().current).to.equal("function");
    });
    it("should have a place method", function() {
      return expect(typeof chocolat.api().place).to.equal("function");
    });
    it("should have a set method", function() {
      return expect(typeof chocolat.api().set).to.equal("function");
    });
    it("should have a get method", function() {
      return expect(typeof chocolat.api().get).to.equal("function");
    });
    return it("should have a getElem method", function() {
      return expect(typeof chocolat.api().getElem).to.equal("function");
    });
  });
});
