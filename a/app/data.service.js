(function() {
    'use strict';

    angular
        .module('curatedcontrols.admin')
        .service('DataService', DataService);

    DataService.$inject = ['$http', '$q'];

    function DataService($http, $q) {
        var srv = this;

        Parse.initialize("j9xiw2SW5WIg3GcFe5L3mJeIX61zKiXqKwdDcwlG", "7e5DCt2qGeJsyOCz01ANCj5BMmxe13PCBbfRj7yh");
        var Control = Parse.Object.extend('control');
        var Author = Parse.Object.extend('author');
        var Tag = Parse.Object.extend('tag');
        var License = Parse.Object.extend('license');
        var Language = Parse.Object.extend('language');

        srv.allControls = [];
        srv.allAuthors = [];
        srv.allTags = [];
        srv.allLicenses = [];
        srv.allLanguages = [];

        srv.getControls = getControls;
        srv.getAuthors = getAuthors;
        srv.getTags = getTags;
        srv.getLicenses = getLicenses;
        srv.getLanguages = getLanguages;

        function getControls() {
          var query = new Parse.Query(Control);
          return query.find()
          .then(
            function(results) {
              srv.allControls = results;
              return results;
            },
            function(error) {
              console.log (error);
            }
          );
        }

        function getAuthors() {
          var query = new Parse.Query(Author);
          return query.find()
          .then(
            function(results) {
              srv.allAuthors = results;
              return results;
            },
            function(error) {
              console.log (error);
            }
          );
        }

        function getTags() {
          var query = new Parse.Query(Tag);
          return query.find()
          .then(
            function(results) {
              srv.allTags = results;
              return results;
            },
            function(error) {
              console.log (error);
            }
          );
        }

        function getLicenses() {
          var deferred = $q.defer();
          var query = new Parse.Query(License);

          query.find({
            success: function(results) {
              srv.allLicenses = results;
              deferred.resolve(results);
            },
            error: function(error) {
              deferred.reject(error.message);
            }
          });

          return deferred.promise;
        }

        function getLanguages() {
          var deferred = $q.defer();
          var query = new Parse.Query(Language);

          query.find({
            success: function(results) {
              srv.allLanguages = results;
              deferred.resolve(results);
            },
            error: function(error) {
              deferred.reject(error.message);
            }
          });

          return deferred.promise;
        }
    }
})();
