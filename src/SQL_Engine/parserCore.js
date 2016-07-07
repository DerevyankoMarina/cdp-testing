define(['ParserPattern'], function(Pattern) {
  /*'use strict';*/
  console.log(Pattern);

  var SQLParser = function() {};


  SQLParser.prototype = {
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

        var resPattern = pattern(str, pos);
        var result = resPattern.res;
        var endPos = resPattern.end;

        if (typeof result === 'undefined'  ) {
          endPos = 0;
        }

        return {
          res: result,
          end: endPos
        };

      })
    }
  };

  return SQLParser;


  // SELECT * FROM movie



});


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

//SQLEngine.setDb(db);
//SQLEngine.execute('SELECT * FROM actor');


// jsonsql.query("select * from json.channel.items order by title desc", json);

/*

 name = 1 OR name = 2 OR name in(3,4)

 var result = {
 SELECT: {
 table: "zzzz",
 fields: [sdssd, asdasdm, ddasda]
 },

 JOIN: {

 }
 }
 ];*/
