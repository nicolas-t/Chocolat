expect = chai.expect

chocolat = $('<div />').Chocolat({
    backgroundClose: false,
    images         : [
        {src : 'images/chocolat-1.jpg', title : 'You can zoom in the image'},
        {src : 'images/chocolat-2.jpg', title : 'You can zoom in the image'}, 
        {src : 'images/chocolat-3.jpg', title : 'You can zoom in the image'},
    ],
}).data('api-chocolat')

describe "Chocolat", ->
    describe "API", ->
        it "should have a open method", ->
            expect(typeof chocolat.open).to.equal("function")

        it "should have a close method", ->
            expect(typeof chocolat.close).to.equal("function")

        it "should have a next method", ->
            expect(typeof chocolat.next).to.equal("function")

        it "should have a prev method", ->
            expect(typeof chocolat.prev).to.equal("function")

        it "should have a goto method", ->
            expect(typeof chocolat.goto).to.equal("function")

        it "should have a current method", ->
            expect(typeof chocolat.current).to.equal("function")

        it "should have a place method", ->
            expect(typeof chocolat.place).to.equal("function")

        it "should have a set method", ->
            expect(typeof chocolat.set).to.equal("function")

        it "should have a get method", ->
            expect(typeof chocolat.get).to.equal("function")

        it "should have a getElem method", ->
            expect(typeof chocolat.getElem).to.equal("function")

