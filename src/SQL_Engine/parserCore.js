define(['ParserPattern'], function(Pattern) {

  var ParserCore = function() {};

  ParserCore.prototype = {
    txt: function(text) {
      return new Pattern(function (str, pos) {
        if (str.substr(pos, text.length) == text) {
          return {
            res: text,
            end: pos + text.length
          }
        }
      });
    },

    rgx: function(regexp) {
      return new Pattern(function (str, pos) {
        var result = regexp.exec(str.slice(pos));
        if (result && result.index === 0) {
          return {
            res: result[0],
            end: pos + result[0].length
          }
        }
      })
    },

    opt: function(pattern) {
      return new Pattern(function (str, pos) {

        var result = pattern.exec(str, pos);
        var res;
        var end = 0;
        if (result) {
          res = result.res;
          end = result.end;
        }

        return {
          res:  res,
          end: end
        };
      })
    },

    exc: function(pattern, except) {
      return new Pattern(function (str, pos) {
        var res = !except.exec(str, pos) && pattern.exec(str, pos);
        if (!res) return;
        return res;
      });
    },

    any: function() {
      var patterns = [].slice.call(arguments, 0);

      return new Pattern(function (str, pos) {
        for (var i = 0; i < patterns.length; i++) {
          var res = patterns[i].exec(str, pos);
          if ( !!res ) return res;
        }
      });
    },

    seq: function() {
      var patterns = [].slice.call(arguments, 0);

      return new Pattern(function (str, pos) {
        var resArr = [];

        for (var i = 0; i < patterns.length; i++) {
          var pos = pos || 0;
          var result = patterns[i].exec(str, pos);
          if ( !result ) return;
          resArr.push(result.res);
          pos = result.end;
        }

        return {
          res: resArr,
          end: pos
        };
      });
    },

    rep: function(pattern, separator) {
      var separated= !separator ? pattern :
                                            this.seq(separator, pattern).then(function(r) {
                                              return r[1];
                                            });

      return new Pattern(function (str, pos) {
        var res = [],
          end = pos,
          r = pattern.exec(str, end);

        while (r && r.end > end) {
          res.push(r.res);
          end = r.end;
          r = separated.exec(str, end);
        }

        return { res: res, end: end };

      });
    }

  };

  return ParserCore;

});


var strng = "SELECT * FROM movie";

var db  = {
  movie: [
    { id: 1,
      title: 'Avatar',
      directorID: 1,
      year: 2000
    },
    { id: 2,
      title: 'Titanic',
      directorID: 1,
      year: 1997
    }
  ],
  actor: [
    { id: 1, name: 'Leonardo DiCaprio' },
    { id: 2, name: 'Sigourney Weaver' },
    { id: 3, name: 'Daniel Craig' }
  ],
  director: [
    { id: 1, name: 'James Cameron' },
    { id: 2, name: 'Douglas McGrath' }
  ],
  actor_to_movie: [
    { movieID: 1, actorID: 2 },
    { movieID: 2, actorID: 1 },
    { movieID: 3, actorID: 2 }
  ]
};