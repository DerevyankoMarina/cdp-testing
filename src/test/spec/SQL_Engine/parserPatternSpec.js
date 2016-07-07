define(['ParserPattern'], function(Pattern) {

  describe('ParserPattern', function () {

    it('should do defined', function () {
      expect(Pattern).toBeDefined();
    });

    it('should accept exec function', function () {
      var execFn = jasmine.createSpy('execFn');
      var txt = new Pattern(execFn);

      txt.exec('testString', 0);
      expect(execFn).toHaveBeenCalledWith('testString', 0);

    });

    it('should be able to transform result', function () {
      var txt = new Pattern(function(str, pos) {
        return {
          res: str,
          end: 2
        }
      })
        .then(function(res) {
          return "transformed" + res
        });

      expect(txt.exec('testString', 0)).toEqual({
                                                  res: 'transformedtestString',
                                                  end: 2
                                                });
    });

    it('return nothing if pattern does not match', function () {
      var txt = new Pattern(function(str, pos) { return })
        .then(function(res) {
          return "It's not going to be returned"
        });

      expect(txt.exec('qqqqqqq', 0)).toBeUndefined();
    });

  });
});


