define(['SQLParser'], function(SQLParser) {

  describe('parserCore', function () {

    console.log('test parser');
    var parser = new SQLParser();

    it('should do defined', function () {
      expect(parser).toBeDefined();
    });

    describe('txt', function() {
        it('should be a function', function () {
          expect(parser.txt).toEqual(jasmine.any(Function));
        })
      }

    );



  });




});


