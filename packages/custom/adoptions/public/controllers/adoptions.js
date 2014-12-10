'use strict';

angular.module('mean.adoptions').controller('AdoptionsController', ['$scope', '$stateParams', '$location', 'Global', 'Adoptions',
  function($scope, $stateParams, $location, Global, Adoptions) {
    $scope.global = Global;
    $scope.package = {
      name: 'adoptions'
    };

    $scope.hasAuthorization = function(adoption) {
      if (!adoption || !adoption.user) return false;
      return $scope.global.isAdmin || adoption.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {

      if (isValid) {
        var adoption = new Adoptions({
          dateApproved: this.dateApproved,
          cleanupDate: this.cleanupDate,
          expirationDate: this.expirationDate,
          streetLocation: this.streetLocation,
          streetLength: this.streetLength,
          signVerbiage: this.signVerbiage,
          notes: this.notes,
          status: this.status,
          ochAcknowledgement: this.ochAcknowledgement,
          catAcknowledgement: this.catAcknowledgement
        });
        adoption.$save(function(response) {
          $location.path('adoptions/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(adoption) {
      if (adoption) {
        adoption.$remove(function(response) {
          for (var i in $scope.adoptions) {
            if ($scope.adoptions[i] === adoption) {
              $scope.adoptions.splice(i, 1);
            }
          }
          $location.path('adoptions');
        });
      } else {
        $scope.adoption.$remove(function(response) {
          $location.path('adoptions');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var adoption = $scope.adoption;
        if (!adoption.updated) {
          adoption.updated = [];
        }
        adoption.updated.push(new Date().getTime());

        adoption.$update(function() {
          $location.path('adoptions/' + adoption._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Adoptions.query(function(adoptions) {
        $scope.adoptions = adoptions;
      });
    };

    $scope.findOne = function() {
      Adoptions.get({
        adoptionId: $stateParams.adoptionId
      }, function(adoption) {
        $scope.adoption = adoption;
      });
    };
  }
]);
