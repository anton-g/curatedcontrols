(function() {
    'use strict';

    angular
        .module('curatedcontrols.settings')
        .controller('Settings', Settings);

    /* @ngInject */
    function Settings($scope, settingsservice) {
        var vm = this;

        vm.tags = [];
        vm.languages = [];
        vm.selectedTags = [];

        vm.toggleTag = settingsservice.toggleTag;
        vm.clearTags = settingsservice.clearTags;
        vm.tagIsSelected = settingsservice.tagSelected;

        vm.setStyleGrid = setStyleGrid;
        vm.setStyleList = setStyleList;

        vm.setSearch = settingsservice.setSearch;

        vm.setLanguage = settingsservice.selectLang;
        vm.langIsSelected = settingsservice.langIsSelected;

        function test() {
          console.log('test');
        }

        activate();

        function activate() {
          settingsservice.getTags()
          .then(function(tags) {
            vm.tags = tags;
          });

          settingsservice.getLanguages()
          .then(function(langs) {
            vm.languages = langs;
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
