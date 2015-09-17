(function() {
    'use strict';

    angular
        .module('curatedcontrols.feed')
        .controller('Feed', Feed);

    Feed.$inject = ['dataservice', 'settingsservice'];

    function Feed(dataservice, settingsservice) {
        var vm = this;

        vm.controls = [];
        vm.msg = "Loading..";
        vm.itemsPerPage = settingsservice.itemsPerPage;
        //vm.feedStyle =

        vm.dateSort = dateSort;
        vm.tags = tags;
        vm.isNew = isNew;
        vm.search = search;

        activate();

        function activate() {
          dataservice.getControls()
          .then(function(controls) {
            vm.controls = controls;

            vm.msg = "No controls found :(";
          });
        }

        function dateSort(control) {
          return new Date(control.createdAt);
        }

        function isNew(control) {
          var ctrlDate = new Date(control.createdAt);
          var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));

          return (ctrlDate > yesterday);
        }

        function tags(control) {
          var found = true;
          settingsservice.getSelectedTags().forEach(function(tag) {
            if (indexOfObj(tag, control.get('tags')) < 0) {
              found = false;
            }
          });
          return found;
        }

        function search(control) {
          return ((control.get('name').indexOf(settingsservice.getSearch()) != -1) || (control.get('description').indexOf(settingsservice.getSearch()) != -1));
        }

        function indexOfObj(obj, arr) {
          for(var i = 0; i < arr.length; i++) {
            if (arr[i].id === obj.id) {
              return i;
            }
          }
          return -1;
        }
    }
})();
