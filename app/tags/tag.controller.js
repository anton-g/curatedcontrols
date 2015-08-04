(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .controller('TagController', TagController);

    TagController.$inject = ['$scope', 'tagservice'];

    function TagController($scope, tagservice) {
      var vm = this;

      vm.tags = [];
      vm.selectedTags = [];

      vm.toggleTag = toggleTag;
      vm.tagIsSelected = tagIsSelected;
      vm.clearTags = clearTags;

      activate();

      function activate() {
        $scope.$watch(function(){
          return tagservice.tags;
        }, function (newValue) {
          vm.tags = newValue;
        });
      }

      function toggleTag(tag) {
        tagservice.toggle(tag);
      }

      function clearTags() {
        tagservice.clearSelected();
      }

      function tagIsSelected(tag) {
        return tagservice.isSelected(tag);
      }
    }
})();
