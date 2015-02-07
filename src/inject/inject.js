// Google
(function() {
  "use strict";
  var googRegex = /https?.\/\/.+google[^\/]*/gi;
  if (document.location.href.match(googRegex)) {
    var scrubLinks = function() {
      var els = document.getElementsByTagName('a');
      for(var i=0, il=els.length; i<il; i++) {
        var el = els[i];
        
        // Old school redirects
        var ni = el.attributes.getNamedItem('onmousedown');
        if (ni && ni.value.substring(0, 10) === "return rwt") {
          el.attributes.removeNamedItem('onmousedown');
        }
        
        // New school redirects
        ni = el.dataset.href;
        if (typeof ni !== "undefined") {
          el.href = ni.value;
        }
      }
    };

    var timeoutId = false;
    document.body.addEventListener("DOMNodeInserted", function() {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(scrubLinks, 1000);
    }, false);
    
    /*
    * Disable the url rewrite function
    */
    Object.defineProperty(window, 'rwt', {
        value: function() { return true; },
        writable: false, // set the property to read-only
        configurable: false
    });
    
  }
})();
