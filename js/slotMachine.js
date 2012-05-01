Array.prototype.equals = function (needle) {
  var length = this.length, needleLength = needle.length;
  if (length != needleLength) return false;

  return this.join('') === needle.join('');
};

var SlotMachine = {

  matches: {
    coffee: ['maker','filter','grounds'],
    tea: ['pot','strainer','loose'],
    espresso: ['machine','tamper','beans']
  },

  _wheels: null,

  _init: function () {
    var matches = this.matches;
    this._wheels = {};
    
    for (var i=0;i<3;i++) {
      this._wheels[i] = [];
      for (var key in matches) {
        this._wheels[i].push(matches[key][i]);
      }
    }
  },

  _spinIt: function () {
    var results = [],
      wheels = this._wheels,
      wheel;

    if (!wheels) {
      this._init();
      wheels = this._wheels;
    }

    for (var i=0;i<3;i++) {
      wheel = wheels[i];
      results.push(wheel[Math.floor(Math.random()*3)]);
    }

    return results;
  },

  /**
    You only need to call this.
    
    returns {Hash} {results: Array, won: (String|False)}
  */ 
  showMeTheMoney: function () {
    var results = this._spinIt(),
      matches = this.matches, ret = false;
    for (var match in matches) {
      ret = matches[match].equals(results);
      if (ret) {
        ret = match;
        break;
      }
    }
    return {results: results, won: ret};
  }
};