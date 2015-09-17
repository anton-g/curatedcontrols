(function() {
    'use strict';

    angular
        .module('curatedcontrols.admin')
        .controller('NewController', NewController);

    NewController.$inject = ['$scope', '$q', 'GitHubService', 'DataService'];

    function NewController($scope, $q, GitHubService, DataService) {
        var vm = this;

        vm.fetch = fetch;
        vm.send = send;
        vm.reset = reset;
        vm.selectTag = selectTag;
        vm.newLicense = newLicense;
        vm.newTag = newTag;
        vm.newLanguage = newLanguage;

        vm.ready = false;

        //Core data
        vm.licenses = [];
        vm.languages = [];
        vm.allTags = [];
        vm.allAuthors = [];
        vm.allControls = [];

        //Adding
        vm.controlLink = "";
        vm.controlName = "";
        vm.controlDesc = "";
        vm.controlLicense = "MIT";
        vm.controlAuthor = "";
        vm.controlLang = "Objective-C";
        vm.controlTags = [];

        //Parse.com setup
        Parse.initialize("j9xiw2SW5WIg3GcFe5L3mJeIX61zKiXqKwdDcwlG", "7e5DCt2qGeJsyOCz01ANCj5BMmxe13PCBbfRj7yh");
        var Control = Parse.Object.extend('control');
        var Author = Parse.Object.extend('author');
        var Tag = Parse.Object.extend('tag');
        var License = Parse.Object.extend('license');
        var Language = Parse.Object.extend('language');

        activate();

        function activate() {
          $('#tags').tagsinput({
            itemText: function(item) {
              return item.get('name');
            },
            itemValue: function(item) {
              return item.id;
            }
          });

          $scope.$watch(function(){
            return GitHubService.github;
          }, function (result) {
            if (result) {
              var names = result.full_name.split('/');

              vm.controlName = names[1];
              vm.controlDesc = result.description;
              vm.controlAuthor = names[0];
              vm.controlLang = result.language;
              vm.controlLicense = guessLicense
            }
          });

          fetchAllData()
          .then(function(results) {
            console.log ('FETCHED ALL DATA');
            vm.ready = true;
          });
        }

        function getExistingAuthor() {
          for (var i = 0; i < vm.allAuthors.length; i++) {
            vm.allAuthors[i]
            if (vm.allAuthors[i].get('name') == vm.controlAuthor) {
              return vm.allAuthors[i];
            }
          }
          return false;
        }

        function send() {
          if (!vm.ready) {
            alert('not ready');
            return;
          }

          uploadNewControl().then(function(control) {
            vm.reset();
          });
        }

        function fetch(url) {
          GitHubService.fetch(url)
          .then(function(results) {
            vm.controlLang = results.language;
          });
        }

        function reset() {
          vm.controlLink = "";
          vm.controlName = "";
          vm.controlDesc = "";
          vm.controlLicense = "MIT";
          vm.controlAuthor = "";
          vm.controlLang = "Objective-C";
          vm.controlTags = [];
          $('#tags').tagsinput('removeAll');
        }

        function guessLicense(license) {
          var index = license.indexOf("The MIT License");
          if (index > -1) {
            return "MIT";
          }

          return "Unknown";
        }

        function selectTag(tag) {
          $('#tags').tagsinput('add', tag);
        }

        function images(control) {
          var dfd = $q.defer();
          uploadPreviews(control).then(function(a,b,c,d,e) {
            console.log (a);
            var previewArray = tightArray([a,b,c,d,e]);
            console.log ('PREVIEW');
            console.log (previewArray);
            uploadGifs(control).then(function(f,g,h,i,j) {
              console.log (f);
              var gifArray = tightArray([f,g,h,i,j]);
              console.log ('GIFS');
              console.log (gifArray);

              dfd.resolve([previewArray, gifArray]);
            });
          });
          return dfd.promise;
        }

        function uploadPreviews(control) {
          var fileUpload = $('#previewupload')[0];
          if (fileUpload.files.length > 0) {
            return uploadImages(control, fileUpload.files, "preview");
          }
        }

        function uploadGifs(control) {
          var fileUpload = $('#gifupload')[0];
          if (fileUpload.files.length > 0) {
            return uploadImages(control, fileUpload.files, "gif");
          }
        }

        function uploadImages(control, files, suffix) {
          var promises = [];
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var temp = file.name.split('.');
            var extension = temp[temp.length - 1];
            var name = control + "_" + suffix + (i + 1) + '.' + extension;

            var parseImg = new Parse.File(name, file);

            promises.push(parseImg.save());
          }

          return Parse.Promise.when(promises);
        }

        function newTag(tag) {
          console.log ('new tag');

          var newTag = new Tag();
          newTag.set('name', tag);
          newTag.save();
        }

        function newLanguage(lang) {
          console.log ('new lang');

          var newLang = new Language();
          newLang.set('name', lang);
          newLang.save();
        }

        function newLicense(lic) {
          console.log ('new lic');

          var newLic = new License();
          newLic.set('name', lic);
          newLic.save();
        }

        function uploadNewControl() {
          var defer = $q.defer();

          images(vm.controlName).then(function(images) {
            console.log ('COMPLETE');
            var previews = images[0];
            var gifs = images[1];
            // BEWARE FULKOD BELOW ಠ_ಠ

            var lang = "";
            for (var i = 0; i < vm.languages.length; i++) {
              if (vm.languages[i].get('name') == vm.controlLang) {
                lang = vm.languages[i];
              }
            }

            var license = "";
            for (var i = 0; i < vm.licenses.length; i++) {
              if (vm.licenses[i].get('name') == vm.controlLicense) {
                license = vm.licenses[i];
              }
            }

            var author = getExistingAuthor();
            if (!author) {
              author = new Author();
              author.set('name', vm.controlAuthor)
            }

            var control = new Control();

            vm.controlTags = $('#tags').tagsinput('items');

            var data = {
              name: vm.controlName,
              description: vm.controlDesc,
              author: author,
              language: lang,
              license: license,
              link: vm.controlLink,
              images: gifs,
              previews: previews,
              tags: vm.controlTags
            };

            control.save(data, {
              success: function(data) {
                console.log ('UPLOAD SUCCESS!');
                defer.resolve(data);
              },
              error: function(data, error) {
                $('.error').html(error.message);
                defer.reject(error);
              }
            });
          });
          return defer.promise;
        }

        function fetchAllData() {
          var defer = $q.defer();

          var controlPromise = DataService.getControls()
                              .then(function(results) {
                                vm.allControls = results;
                              });

          var tagPromise = DataService.getTags()
                          .then(function(results) {
                            vm.allTags = results;
                          });

          var authorPromise = DataService.getAuthors()
                              .then(function(results) {
                                vm.allAuthors = results;
                              });

          var licensePromise = DataService.getLicenses()
                              .then(function(results) {
                                vm.licenses = results;
                              });

          var langPromise = DataService.getLanguages()
                            .then(function(results) {
                              vm.languages = results;
                            });

          Parse.Promise.when([controlPromise, tagPromise, authorPromise, licensePromise, langPromise])
          .then(function(results) {
            defer.resolve(results);
          });

          return defer.promise;
        }

        function tightArray(array) {
          var tempArr = [];
          for (var i = 0; i < array.length; i++) {
            if (array[i]) {
              tempArr.push(array[i]);
            }
          }
          return tempArr;
        }
    }
})();
