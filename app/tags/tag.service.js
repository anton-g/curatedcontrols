(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .service('tagservice', tagservice);

    function tagservice() {
      var srv = this;

      srv.internalTags = new Set();
      srv.tags = [];
      srv.selectedTags = [];

      srv.add = add;
      srv.toggle = toggle;
      srv.isSelected = isSelected;
      srv.clearSelected = clearSelected;

      function add(tagsToAdd) {
        tagsToAdd.forEach(function(tag) {
          srv.internalTags.add(tag);
        });

        srv.tags = [...srv.internalTags];
      }

      function toggle(tag) {
        var index = srv.selectedTags.indexOf(tag);

        if (index > -1) {
          srv.selectedTags.splice(index, 1);
        } else {
          srv.selectedTags.push(tag);
        }
      }

      function isSelected(tag) {
        return (srv.selectedTags.indexOf(tag) > -1);
      }

      function clearSelected() {
        srv.selectedTags = [];
      }
    }
})();
