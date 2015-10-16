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
        vm.clearSettings = clear;
        vm.tagIsSelected = settingsservice.tagSelected;

        vm.setStyleGrid = setStyleGrid;
        vm.setStyleList = setStyleList;

        vm.setSearch = settingsservice.setSearch;

        vm.setLanguage = settingsservice.selectLang;
        vm.langIsSelected = settingsservice.langIsSelected;

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

        function clear() {
          settingsservice.clearSettings();
          vm.searchString = '';
        }

        function setStyleGrid() {

        }

        function setStyleList() {

        }
    }
})();
