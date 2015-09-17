(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .factory('settingsservice', settingsservice);

    settingsservice.$inject = ['$q', 'dataservice'];

    function settingsservice($q, dataservice) {
        var srv = this;
        srv.tags = [];
        srv.selectedTags = [];
        srv.search = "";

        var settingsservice = {
            getTags: getTags,
            toggleTag: toggleTag,
            clearTags: clearTags,
            setFeedStyle: setFeedStyle,
            tagSelected: tagSelected,
            setSearch: setSearch,
            itemsPerPage: itemsPerPage,
            getSelectedTags: getSelectedTags,
            getSearch: getSearch
        };

        return settingsservice;

        function getTags() {
          var defer = $q.defer();

          if (srv.tags.length > 0) {
            defer.resolve(srv.tags);
          } else {
            dataservice.getTags()
            .then(function(tags) {
              srv.tags = tags;
              defer.resolve(srv.tags);
            });
          }

          return defer.promise;
        }

        function toggleTag(tag) {
          var index = indexOfTag(tag);

          if (index > -1) {
            srv.selectedTags.splice(index, 1);
          } else {
            srv.selectedTags.push(tag);
          }
        }

        function clearTags() {
          srv.selectedTags = [];
        }

        function setFeedStyle(feedStyle) {
        }

        function tagSelected(tag) {
          return (indexOfTag(tag) > -1);
        }

        function indexOfTag(tag) {
          var index = -1;
          for(var i = 0; i < srv.selectedTags.length; i++) {
            if (srv.selectedTags[i].id === tag.id) {
              index = i;
              break;
            }
          }
          return index;
        }

        function setSearch(search) {
          srv.search = search;
        }

        function itemsPerPage() {
          return 5;
        }

        function getSelectedTags() {
          return srv.selectedTags;
        }

        function getSearch() {
          return srv.search;
        }
    }
})();
