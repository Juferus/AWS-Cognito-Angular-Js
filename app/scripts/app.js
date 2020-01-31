'use strict'

const myApp = angular.module('testAppApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'AuthenticationCtrl',
        controllerAs: 'facebook'
      })
      .otherwise({
        redirectTo: '/'
      })
  })

window.fbAsyncInit = function() {
    FB.init({
      appId      : '******************',
      cookie     : false,
      xfbml      : true,
      version    : 'v2.3'
    })
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response)
    })
  }

  
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) return
    js = d.createElement(s); js.id = id
    js.src = "https://connect.facebook.net/en_US/sdk.js"
    fjs.parentNode.insertBefore(js, fjs)
  }(document, 'script', 'facebook-jssdk'))
