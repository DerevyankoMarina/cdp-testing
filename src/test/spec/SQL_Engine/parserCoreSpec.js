define(['ParserCore'], function(ParserCore) {

  describe('parserCore', function () {

    var parser = new ParserCore();

    it('should do defined', function () {
      expect(parser).toBeDefined();
    });


    describe('txt', function() {
      it('should be a function', function () {
        expect(parser.txt).toEqual(jasmine.any(Function));
      });


      it('should read predefined text', function () {
        var test = parser.txt('hello');
        var result = test.exec('hello', 0);

        expect(result).toEqual({
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
        var result = test.exec('qqqhello', 3);

        expect(result).toEqual({
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
        var result = rgx.exec('12345qwerty', 0);

        expect(result).toEqual({
          res: '12345',
          end: 5
        });
      });


      it('should return undefined if regExp does not match', function () {
        var rgx = parser.rgx(/\d+/);
        var result = rgx.exec('qqqqwerty', 0);

        expect(result).toBeUndefined();
      });


      it('should match from specified position', function () {
        var rgx = parser.rgx(/\d+/);
        var result = rgx.exec('qqq12345qwerty', 3);

        expect(result).toEqual({
          res: '12345',
          end: 8
        });
      });
    });


    describe('opt', function() {
      it('should be a function', function () {
        expect(parser.opt).toEqual(jasmine.any(Function));
      });


      it('should make pattern optional', function () {
        var select = parser.txt('SELECT');
        var optSelect = parser.opt(select);
        var goodResult = optSelect.exec('SELECT * FROM', 0);
        var badResult = optSelect.exec('SLCT * FROM', 0);

        expect(goodResult).toEqual({
          res: 'SELECT',
          end: 6
        });

        expect(badResult).toEqual({
          res: undefined,
          end: 0
        });
      });
    });


    describe('exc', function() {
      it('should be a function', function () {
        expect(parser.exc).toEqual(jasmine.any(Function));
      });


      it('should parse first pattern', function () {
        var pattern = parser.rgx(/[A-Z]+/);
        var except = parser.txt('FROM');
        var exc = parser.exc(pattern, except);
        var result = exc.exec('SELECT', 0);

        expect(result).toEqual({
          res: 'SELECT',
          end: 6
        });
      });

      it('should return undefined if it CAN parse second pattern', function () {
        var pattern = parser.rgx(/[A-Z]+/);
        var except = parser.txt('FROM');
        var exc = parser.exc(pattern, except);
        var result = exc.exec('FROM', 0);

        expect(result).toBeUndefined();
      });
    });


    describe('any', function() {
      it('should be a function', function () {
        expect(parser.any).toEqual(jasmine.any(Function));
      });

      it('should return first matching result only', function () {
        var p1 = parser.txt("abc");
        var p2 = parser.txt("def");
        var any = parser.any(p1, p2);
        var result1 = any.exec('abc', 0);
        var result2 = any.exec('def', 0);

        expect(result1).toEqual({
          res: 'abc',
          end: 3
        });

        expect(result2).toEqual({
          res: 'def',
          end: 3
        });
      });


      it('should return undefined if any pattern does not match', function () {
        var p1 = parser.txt("abc");
        var p2 = parser.txt("def");
        var any = parser.any(p1, p2);
        var result = any.exec('ABC', 0);

        expect(result).toBeUndefined();
      });
    });


    describe('seq', function() {
      it('should be a function', function () {
        expect(parser.seq).toEqual(jasmine.any(Function));
      });

      it('should sequentially parse the text according to the sequence of patterns and return an array of results', function () {
        var p1 = parser.txt("abc");
        var p2 = parser.txt("def");
        var seq = parser.seq(p1, p2);
        var result = seq.exec('abcdef');

        expect(result).toEqual({
          res: ["abc", "def"],
          end: 6
        });
      });

      it('should return undefined if one of patterns do not match', function () {
        var p1 = parser.txt("abc");
        var p2 = parser.txt("def");
        var seq = parser.seq(p1, p2);
        var result = seq.exec('abcde1');

        expect(result).toBeUndefined();
      });

      it('should match from specified position', function () {
        var p1 = parser.txt("abc");
        var p2 = parser.txt("def");
        var seq = parser.seq(p1, p2);
        var result = seq.exec('qqqabcdef', 3);

        expect(result).toEqual({
          res: ["abc", "def"],
          end: 9
        });
      });
    });


    describe('rep', function() {
      it('should be a function', function () {
        expect(parser.seq).toEqual(jasmine.any(Function));
      });


      it('should read a repeatable sequence', function () {
        var p = parser.rgx(/\d+/);
        var s = parser.txt(",");
        var rep = parser.rep(p, s);
        var result = rep.exec("1,23,456", 0);

        expect(result).toEqual({
          res: ["1", "23", "456"],
          end: 8
        });
      });
    });

  });
});
