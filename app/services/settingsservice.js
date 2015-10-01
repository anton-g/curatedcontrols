(function() {
    'use strict';

    angular
        .module('curatedcontrols')
        .factory('settingsservice', settingsservice);

    settingsservice.$inject = ['$q', 'dataservice'];

    function settingsservice($q, dataservice) {
        /*jshint validthis: true */
        var srv = this;
        srv.tags = [];
        srv.selectedTags = [];
        srv.languages = [];
        srv.selectedLang = null;
        srv.search = '';

        var service = {
            getTags: getTags,
            toggleTag: toggleTag,
            clearTags: clearTags,
            getSelectedTags: getSelectedTags,
            tagSelected: tagSelected,

            setFeedStyle: setFeedStyle,
            itemsPerPage: itemsPerPage,

            setSearch: setSearch,
            getSearch: getSearch,

            getLanguages: getLanguages,
            getSelectedLang: getSelectedLang,
            selectLang: selectLang,
            langIsSelected: langIsSelected
        };

        return service;

        function getTags() {
          var defer = $q.defer();

          dataservice.getTags()
          .then(function(tags) {
            srv.tags = tags;
            defer.resolve(srv.tags);
          });

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

        function getLanguages() {
          var defer = $q.defer();

          dataservice.getLanguages()
          .then(function(languages) {
            srv.languages = languages;
            defer.resolve(srv.languages);
          });

          return defer.promise;
        }

        function getSelectedLang() {
          return srv.selectedLang;
        }

        function selectLang(lang) {
          if (srv.selectedLang && lang.id === srv.selectedLang.id) {
            srv.selectedLang = null;
            return;
          }

          srv.selectedLang = lang;
        }

        function langIsSelected(lang) {
          return (srv.selectedLang && lang.id === srv.selectedLang.id);
        }
    }
})();
