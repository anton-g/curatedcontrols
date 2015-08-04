(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .controller('TagController', TagController);

    TagController.$inject = ['$scope', 'dataservice'];

    function TagController($scope, dataservice) {
      var vm = this;

      vm.tags = [];
      vm.selectedTags = [];

      vm.toggleTag = toggleTag;
      vm.tagIsSelected = tagIsSelected;
      vm.clearTags = clearTags;

      activate();

      function activate() {
        dataservice.getTags()
        .then(function(tags) {
          vm.tags = [...tags] //Because Angular doesn't like sets.
        });
      }

      function toggleTag(tag) {
        var index = vm.selectedTags.indexOf(tag);

        if (index > -1) {
          vm.selectedTags.splice(index, 1);
        } else {
          vm.selectedTags.push(tag);
        }
      }

      function tagIsSelected(tag) {
        return (vm.selectedTags.indexOf(tag) > -1);
      }

      function clearTags() {
        vm.selectedTags = [];
      }
    }
})();
