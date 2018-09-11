angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CprCtrl', function($scope,$interval,$ionicPopup) {

  $scope.timer = function(duration, callback){
      var timer = duration, minutes, seconds;
      var contador = $interval(function () {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);
  
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
  
          $scope.CPR_minute = minutes;
          $scope.CPR_seconds = seconds;
  
          if (--timer < 0) {
            $interval.cancel(contador);
            if(callback=='cpr') {
              $scope.showAlertPopup();
            }
          }
      }, 1000);
  }
  
  $scope.date = new Date();
  $scope.CPR = '02:00';
  $scope.CPR_minute = '1';
  $scope.CPR_seconds = '59';
  $scope.Epinephrine = '3';
  $scope.Amiodarone = '3';

  $scope.showAlertPopup = function() {
    $scope.data = {};
  
    // An elaborate, custom popup
    var ephpopup = $ionicPopup.show({
      title: 'CHECK RHYTHM',
      subTitle: 'Continue CPR?',
      scope: $scope,
      buttons: [
        { text: 'NO' },
        {
          text: '<b>YES</b>',
          type: 'button-positive',
          onTap: function(e) {
            
          }
        }
      ]
    });
    ephpopup.then(function(res) {
      console.log('Selected', res);
    });
  }

  $scope.showResetPopup = function() {
    $scope.data = {};
  
    // An elaborate, custom popup
    var ephpopup = $ionicPopup.show({
      template: '<center><p><b>Epinephrine: <span id="te"></span></b></p></center>'+
      '<center><p><b>Amiodarone: <span id="ta"></span></b></strong></p></center>'+
      '<center><p><b>CPR Cycles: <span id="tc"></span></b></p></center>'+
      '<center><p><b>Start Time: <span id="hi"></span></b></p></center>'+
      '<center><p><b>CPR Time: <span id="tcp"></span></b></p></center>',
      title: 'TOTAL CYCLES',
      scope: $scope,
      buttons: [
        { text: 'CONTINUE', type: 'button-calm' },
        {
          text: 'STOP ALL',
          type: 'button-assertive',
          onTap: function(e) {
            
          }
        }
      ]
    });
    ephpopup.then(function(res) {
      console.log('Selected', res);
    });
  }

  $scope.showAmiPopup = function() {
    $scope.data = {};
  
    // An elaborate, custom popup
    var amipopup = $ionicPopup.show({
      template: ' <ion-list>'+
      '<ion-radio ng-model="Amiodarone" ng-value="3">3 minutes</ion-radio>'+
      '<ion-radio ng-model="Amiodarone" ng-value="4">4 minutes</ion-radio>'+
      '<ion-radio ng-model="Amiodarone" ng-value="5">5 minutes</ion-radio>'+
    '</ion-list>',
      title: 'AMIODARONE Time',
      subTitle: 'Set interval',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Set</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.Amiodarone) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.Amiodarone;
            }
          }
        }
      ]
    });
    amipopup.then(function(res) {
      console.log('Selected', res);
    });
  }

  

  $scope.showEphPopup = function() {
    $scope.data = {};
  
    // An elaborate, custom popup
    var ephpopup = $ionicPopup.show({
      template: ' <ion-list>'+
      '<ion-radio ng-model="data.Epinephrine" value="3">3 minutes</ion-radio>'+
      '<ion-radio ng-model="data.Epinephrine" value="4">4 minutes</ion-radio>'+
      '<ion-radio ng-model="data.Epinephrine" value="5">5 minutes</ion-radio>'+
    '</ion-list>',
      title: 'EPINEPHRINE Time',
      subTitle: 'Set interval',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Set</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.Epinephrine) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              $scope.Epinephrine = $scope.data.Epinephrine;
              return $scope.data.Epinephrine;
            }
          }
        }
      ]
    });
    ephpopup.then(function(res) {
      console.log('Selected', res);
    });
  }
    
 
  $scope.CPRTimer = function(totalTime){
   // $scope.date = new Date();
    var fiveMinutes = 60 * 1.98;
    $scope.startTimer = $scope.timer(fiveMinutes,$scope.CPR_minute,$scope.CPR_seconds);
    
  }
 
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
