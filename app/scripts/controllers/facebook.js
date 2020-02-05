'use strict'

let email, COGNITO_SYNC_TOKEN, COGNITO_SYNC_COUNT

myApp.controller('AuthenticationCtrl', ['$scope', function($scope) {
  $scope.name = 'SIGN IN'
  $scope.FBLogin = function () {
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome to the application!')
        FB.api('/me', { fields: 'name, email' }, function(response) {
          email = response.email
          console.log('Successful login for: ' + response.name)
          console.log(response)
          document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
          let accessToken = FB.getAuthResponse()
          console.log('RESPONSE FACEBOOK: ', accessToken)
          window.location = "http://localhost:9000/#!"
        })
        AWS.config.region = 'us-east-1';
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                AccountId: '************',
                RoleARN: 'arn:aws:iam::*************:role/Cognito_TestFacebookAuth_Role',
                IdentityPoolId: 'us-east-1:*******-****-****-****-**********',
                Logins: {
                    'graph.facebook.com': response.authResponse.accessToken
                }
            })
            AWS.config.credentials.get(function(){
                let accessKeyId = AWS.config.credentials.accessKeyId;
                let secretAccessKey = AWS.config.credentials.secretAccessKey;
                let identityId = AWS.config.credentials.identityId;
                let sessionToken = AWS.config.credentials.sessionToken;
                let credentials = AWS.config.credentials
								console.log("RESPONSE AWS COGNITO: ", credentials)
                let cognitosync = new AWS.CognitoSync()
                cognitosync.listRecords({
                  DatasetName: 'EMAIL_DATASET',
                  IdentityId: identityId,
                  IdentityPoolId: 'us-east-1:******-****-****-****-**********'
                }, function (err, data) {
                  if (err) console.log('listRecords: ' + err, err.stack)
                  else {
                    sessionStorage.setItem('recordAWS', JSON.stringify(data))
                    console.log('listRecords: ' + JSON.stringify(data))
                    COGNITO_SYNC_TOKEN = data.SyncSessionToken
                    COGNITO_SYNC_COUNT = data.DatasetSyncCount
                    console.log('SyncSessionToken: ' + COGNITO_SYNC_TOKEN)
                    console.log('DatasetSyncCount: ' + COGNITO_SYNC_COUNT)
                    let cognitosync = new AWS.CognitoSync()
                    const params = {
                      DatasetName: 'EMAIL_DATASET',
                      IdentityId: identityId,
                      IdentityPoolId: 'us-east-1:******-****-****-****-**********',
                      SyncSessionToken: COGNITO_SYNC_TOKEN,
                      RecordPatches: [
                        {
                          Key: 'USER_EMAIL',
                          Op: 'replace',
                          SyncCount: COGNITO_SYNC_COUNT,
                          Value: email
                        }
                      ]
                    }
                    console.log('Email: ' + email)
                    cognitosync.updateRecords(params, function (err, data) {
                      if (err) console.log('updateRecords: ' + err, err.stack)
                        else console.log('Value: ' + JSON.stringify(data))
                      })
                  }
                })
            })
      } else {
        console.log('User cancelled login')
      }
    }, {
      scope: 'email, user_likes',
      return_scope: true
    })
  }
}])