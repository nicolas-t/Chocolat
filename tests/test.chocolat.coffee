expect = chai.expect

chocolat = $('<div />').Chocolat({
    backgroundClose: false,
    images         : [
        {src : 'images/chocolat-1.jpg', title : 'You can zoom in the image'},
        {src : 'images/chocolat-2.jpg', title : 'You can zoom in the image'}, 
        {src : 'images/chocolat-3.jpg', title : 'You can zoom in the image'},
    ],
}).data('chocolat')


describe "Chocolat", ->
    describe "API", ->
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

