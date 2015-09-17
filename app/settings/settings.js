(function() {
    'use strict';

    angular
        .module('curatedcontrols.settings')
        .controller('Settings', Settings);

    Settings.$inject = ['$scope', 'settingsservice'];

    function Settings($scope, settingsservice) {
        var vm = this;

        vm.tags = [];
        vm.selectedTags = [];

        vm.toggleTag = settingsservice.toggleTag;
        vm.clearTags = settingsservice.clearTags;
        vm.setStyleGrid = setStyleGrid;
        vm.setStyleList = setStyleList;
        vm.tagIsSelected = settingsservice.tagSelected;
        vm.setSearch = settingsservice.setSearch;

        activate();

        function activate() {
          settingsservice.getTags()
          .then(function(tags) {
            vm.tags = tags;
          });
        }

        function setStyleGrid() {

        }

        function setStyleList() {

        }
    }
})();
/*
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
      vm.onSearch = onSearch;

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

      function onSearch(s) {
        settingsservice.setSearchString(s);
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
*/
