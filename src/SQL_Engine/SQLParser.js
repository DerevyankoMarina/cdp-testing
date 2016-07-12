define(['ParserCore'], function(ParserCore) {
  var parser = new ParserCore();
  var txt = parser.txt;
  var rgx = parser.rgx;
  var opt = parser.opt;
  var any = parser.any;
  var seq = parser.seq;
  var rep = parser.rep;

  //Key words
  var SELECT = txt('SELECT');
  var FROM = txt('FROM');

  //Service
  var ws = rgx(/\s+/);
  var table = rgx(/[a-z][a-z0-9]+/i);
  var column = table;
  var tableColumn = seq(table, txt('.'), column)
    .then(function(res) {
      return {
        table: res[0],
        column: res[2]
      }
    });

  var selectSection = seq(
    SELECT, ws,
    any(tableColumn, txt('*')), ws,
    FROM, ws,
    table
  ).then(function(res) {
    return {
      select: {
        column: res[2],
        from: res[6]
      }
    }
  });

  var SQLParser = function () {
  };

  SQLParser.prototype = {
    parse: function (str) {
      var result = selectSection.exec(str, 0);
      if (result) {
        return result.res;
      }
    }

  };

  return SQLParser;

});