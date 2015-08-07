(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope', 'settingsservice'];

    function SettingsController($scope, settingsservice) {
      var vm = this;

      vm.tags = [];
      vm.selectedTags = [];

      vm.toggleTag = toggleTag;
      vm.tagIsSelected = tagIsSelected;
      vm.clearTags = clearTags;

      activate();

      function activate() {
        $scope.$watch(function(){
          return settingsservice.tags;
        }, function (newValue) {
          vm.tags = newValue;
        });
      }

      function toggleTag(tag) {
        settingsservice.toggle(tag);
      }

      function clearTags() {
        settingsservice.clearSelected();
      }

      function tagIsSelected(tag) {
        return settingsservice.isSelected(tag);
      }
    }
})();
