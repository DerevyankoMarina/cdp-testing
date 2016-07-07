define(['SQLParser'], function(SQLParser) {

  describe('parserCore', function () {

    var parser = new SQLParser();

    it('should do defined', function () {
      expect(parser).toBeDefined();
    });

    describe('txt', function() {

      it('should be a function', function () {
        expect(parser.txt).toEqual(jasmine.any(Function));
      });

      it('should read predefined text', function () {

        var test = parser.txt('hello');
        expect(test.exec('hello', 0)).toEqual({
          res: 'hello',
          end: 5
        });
      });

      it('should return undefined if text does not match', function () {
        var hello = parser.txt('qqqqqqqq');
        expect(hello.exec('hllll', 0)).toBe(undefined);
      });

      it('should read from specified position', function () {
        var test = parser.txt('hello');
        expect(test.exec('qqqhello', 3)).toEqual({
          res: 'hello',
          end: 8
        });
      });
    });



  });


});


