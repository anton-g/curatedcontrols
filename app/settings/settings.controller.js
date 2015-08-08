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
      vm.styleList = false;

      vm.toggleTag = toggleTag;
      vm.tagIsSelected = tagIsSelected;
      vm.clearTags = clearTags;
      vm.setStyleGrid = setStyleGrid;
      vm.setStyleList = setStyleList;

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

      function setStyleGrid() {
        vm.styleList = false;
        settingsservice.setStyleList(false);
      }

      function setStyleList() {
        vm.styleList = true;
        settingsservice.setStyleList(true);
      }
    }
})();
