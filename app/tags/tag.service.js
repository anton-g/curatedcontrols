(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .service('tagservice', tagservice);

    function tagservice() {
      var srv = this;

      srv.add = add;

      srv.tags = new Set();

      function add(tagsToAdd) {
        tagsToAdd.forEach(function(tag) {
          srv.tags.add(tag);
        });
      }
    }
})();
