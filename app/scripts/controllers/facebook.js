'use strict'

myApp.controller('AuthenticationCtrl', ['$scope', function($scope) {
  $scope.name = 'Login please'
  $scope.FBLogin = function () {
    FB.login(function(response) {
      if (response.authResponse) {
        $scope.tokenFacebook = response.authResponse.accessToken
        AWS.config.region = 'us-east-1';
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                AccountId: '*************',
                RoleARN: 'arn:aws:iam::*************:role/Cognito_TestFacebookAuth_Role',
                IdentityPoolId: 'us-east-1:********-****-****-****-************',
                Logins: {
                    'graph.facebook.com': response.authResponse.accessToken
                }
            })
            AWS.config.credentials.get(function(){
                let accessKeyId = AWS.config.credentials.accessKeyId;
                let secretAccessKey = AWS.config.credentials.secretAccessKey;
                let sessionToken = AWS.config.credentials.sessionToken;
                let credentials = AWS.config.credentials
								console.log("CREDENCIALES DE AWS: ",credentials)
                return credentials
            }) 
        console.log('Welcome to the application!')
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name)
          console.log(response)
          document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
          let accessToken = FB.getAuthResponse()
          console.log(accessToken)
          window.location = "http://localhost:9000/#!/main"
          // console.log(sessionStorage.token)
        })
      } else {
        console.log('User cancelled login')
      }
    })
  }
}])