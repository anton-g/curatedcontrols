(function() {
    'use strict';

    angular
        .module('curatedcontrols.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q'];

    function dataservice($http, $q) {
        var dataservice = {
            getControls: getControls,
            getControlById: getControlById,
            getTags: getTags,
            getAuthors: getAuthors,
            getLanguages: getLanguages,
            getLicenses: getLicenses
        };

        //Parse.com setup
        Parse.initialize("j9xiw2SW5WIg3GcFe5L3mJeIX61zKiXqKwdDcwlG", "7e5DCt2qGeJsyOCz01ANCj5BMmxe13PCBbfRj7yh");
        var Control = Parse.Object.extend('control');
        var Author = Parse.Object.extend('author');
        var Tag = Parse.Object.extend('tag');
        var License = Parse.Object.extend('license');
        var Language = Parse.Object.extend('language');

        return dataservice;

        function getControls() {
          return parseFind(Control);
        }

        function getTags() {
          return parseFind(Tag);
        }

        function getAuthors() {
          return parseFind(Author);
        }

        function getLanguages() {
          return parseFind(Language);
        }

        function getLicenses() {
          return parseFind(License);
        }

        function parseFind(Class) {
          var defer = $q.defer();

          var query = new Parse.Query(Class);
          query.find({
            success: function(results) {
              defer.resolve(results);
            },
            error: function(error) {
              defer.reject(error);
            }
          });

          return defer.promise;
        }

        function getControlById(id) {
          var defer = $q.defer();

          var query = new Parse.Query(Control);
          query.include('author');
          query.include('license');
          query.include('language');

          query.get(id, {
            success: function(results) {
              defer.resolve(results);
            },
            error: function(error) {
              defer.reject(error);
            }
          });

          return defer.promise;
        }
    }
})();
