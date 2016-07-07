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
        expect(hello.exec('hllll', 0)).toBeUndefined();
      });


      it('should read from specified position', function () {
        var test = parser.txt('hello');
        expect(test.exec('qqqhello', 3)).toEqual({
          res: 'hello',
          end: 8
        });
      });
    });


    describe('rgx', function() {
      it('should be a function', function () {
        expect(parser.rgx).toEqual(jasmine.any(Function));
      });


      it('should match predefined regExp', function () {
        var rgx = parser.rgx(/\d+/);
        expect(rgx.exec('12345qwerty', 0)).toEqual({
          res: '12345',
          end: 5
        });
      });


      it('should return undefined if regExp does not match', function () {
        var rgx = parser.rgx(/\d+/);
        expect(rgx.exec('qqqqwerty', 0)).toBeUndefined();
      });


      it('should match from specified position', function () {
        var rgx = parser.rgx(/\d+/);
        expect(rgx.exec('qqq12345qwerty', 3)).toEqual({
          res: '12345',
          end: 8
        });
      });
    });

    describe('opt', function() {
      it('should be a function', function () {
        expect(parser.opt).toEqual(jasmine.any(Function));
      });

/*
    it('should make pattern optional', function () {
      var select = parser.txt('SELECT', 0);
      var optSelect = parser.txt(select);

      expect(optSelect.exec('SELECT * FROM').toEqual({
                                                        res: 'SELECT',
                                                        end: 6
                                                      }));

      expect(optSelect.exec('SLCT * FROM').toEqual({
                                                        res: undefined,
                                                        end: 0
                                                      }));
      });

    });
*/



  });
});
});

