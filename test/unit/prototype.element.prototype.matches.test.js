define([
  'intern!object',
  'intern/chai!expect',
  'ally/prototype/element.prototype.matches',
], function(registerSuite, expect) {

  registerSuite(function() {

    function getFunctionName(func) {
      var s = String(func).match(/function\s+([^\(]+)\(/);
      return s && s[1] || null;
    }

    return {
      name: 'prototype/element.prototype.matches',

      prefixed: function() {
        if (getFunctionName(Element.prototype.matches) === 'matches') {
          this.skip('Element.prototype.matches supported natively');
        }

        var prefixed;
        'webkitMatchesSelector mozMatchesSelector msMatchesSelector'.split(' ').some(function(key) {
          if (Element.prototype[key]) {
            prefixed = key;
            return true;
          }
        });

        if (!prefixed) {
          this.skip('Element.prototype.matches is not vendor prefixed');
        }

        var element = document.createElement('div');
        expect(element.matches).to.be.a('function');
        expect(element.matches('div')).to.equal(true);
        expect(element.matches('body')).to.equal(false);
      },
      polyfilled: function() {
        if (getFunctionName(Element.prototype.matches) !== 'matchesSelectorPolyfill') {
          this.skip('Element.prototype.matches supported without polyfill');
        }

        var element = document.createElement('div');
        expect(element.matches).to.be.a('function');
        expect(element.matches('div')).to.equal(true);
        expect(element.matches('body')).to.equal(false);
      },
    };
  });
});
