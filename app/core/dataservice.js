(function() {
    'use strict';

    angular
        .module('curatedcontrols.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', '$cacheFactory'];

    function dataservice($http, $q, $cacheFactory) {
        var dataservice = {
            getControls: getControls,
            getControlById: getControlById,
            getTags: getTags,
            getAuthors: getAuthors,
            getLanguages: getLanguages,
            getLicenses: getLicenses
        };

        var cache = $cacheFactory('datacache');

        //Parse.com setup
        Parse.initialize("j9xiw2SW5WIg3GcFe5L3mJeIX61zKiXqKwdDcwlG", "7e5DCt2qGeJsyOCz01ANCj5BMmxe13PCBbfRj7yh");
        var Control = Parse.Object.extend('control');
        var Author = Parse.Object.extend('author');
        var Tag = Parse.Object.extend('tag');
        var License = Parse.Object.extend('license');
        var Language = Parse.Object.extend('language');

        return dataservice;

        function getControls() {
          return parseRequest(Control, 'controlCache');
        }

        function getTags() {
          return parseRequest(Tag, 'tagCache');
        }

        function getAuthors() {
          return parseRequest(Author, 'authorCache');
        }

        function getLanguages() {
          return parseRequest(Language, 'languageCache');
        }

        function getLicenses() {
          return parseRequest(License, 'licenseCache');
        }

        function parseRequest(Class, cacheKey) {
          var defer = $q.defer();

          var cacheData = cache.get(cacheKey);
          if (cacheData) {
            defer.resolve(cacheData);
            console.log ('--------------------------');
            console.log ('Returned data from CACHE: ');
            console.log (cacheData);
          }
          else {
            parseFind(Class, cacheKey, defer);
          }

          return defer.promise;
        }

        function parseFind(Class, cacheKey, defer) {
          var query = new Parse.Query(Class);
          query.find({
            success: function(results) {
              defer.resolve(results);
              cache.put(cacheKey, results)
              console.log ('--------------------------');
              console.log ('Returned data from ZE INTERNETZ: ');
              console.log (results);
            },
            error: function(error) {
              defer.reject(error);
            }
          });
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
