define(['SQLParser'], function(SQLParser) {

  describe('SQLParser', function () {

    var parser = new SQLParser();

    it('should do defined', function () {
      expect(parser).toBeDefined();
    });

      describe('parsing', function() {
        it('should have parse method', function () {
          expect(parser.parse).toEqual(jasmine.any(Function));
        });


        it('should be able to parse simple select query', function () {
          var result = parser.parse('SELECT * FROM movie');

          expect(result).toEqual({
            select: {
              column: '*',
              from: 'movie'
            }
          });
        });

        it('should be able to parse simple select query with specific parameter', function () {
          var result = parser.parse('SELECT movie.actor FROM movie');

          expect(result).toEqual({
            select: {
              column: {
                table: 'movie',
                column: 'actor'
              },
              from: 'movie'
            }
          });
        });
      });
  });
});
