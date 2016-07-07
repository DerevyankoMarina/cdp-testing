define([], function() {

  var Pattern  = function(execFn) {
    this.exec = execFn;
  };

  Pattern.prototype = {
    constructor: Pattern,

    then: function(transformedFn) {
      var exec = this.exec;

      return new Pattern(function(str, pos) {
        var result;
        result = exec(str, pos || 0);

        return result && {
            res: transformedFn(result.res),
            end: result.end
          }
      })
    }


  };

  return Pattern;


});