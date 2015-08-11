angular.module('firebase.config', [])
  .constant('FBURL', 'https://glaring-fire-2223.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','google'])

  .constant('loginRedirectPath', '/login');
