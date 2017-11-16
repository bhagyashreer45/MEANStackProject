var app = angular.module('myApp',[]);

app.controller('mainCtrl', function ($scope, $http) {
    var refresh= function () {
        $http.get('/contactList')
            .then(function (response) {
            $scope.contactList = response.data;
            $scope.contact={} ;
        });
    };
    refresh();
    $scope.addContact=function(){
        $http.post('/contactList', $scope.contact)
            .then(function (response) {
            refresh();
        });
    };

    $scope.remove=function(id){
        $http.delete('/contactList/' + id)
            .then(function (response) {
            refresh();
        });
    };

    $scope.edit=function (id) {
      $http.get('/contactList/' + id)
          .then(function(response){
              $scope.contact=response.data;
          });
    };

    $scope.update=function () {
        console.log($scope.contact._id);
        $http.put('/contactList/' + $scope.contact._id, $scope.contact)
            .then(function (response) {
                refresh();
            });
    };
    
    $scope.deselect=function () {
        $scope.contact={};
    }
});