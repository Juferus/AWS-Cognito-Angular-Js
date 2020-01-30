'use strict'

myApp.controller('AuthenticationCtrl', ['$scope', function($scope) {
  $scope.name = 'Login please'
  $scope.FBLogin = function () {
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome')
          console.log(response)
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name)
          console.log(response)
          document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
        })
      } else {
        console.log('User cancelled login')
      }
    })
  }
}])