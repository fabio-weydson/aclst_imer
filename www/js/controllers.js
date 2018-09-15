angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope,$ionicPopup){
    $scope.exitApp = function() {
      $ionicPopup.confirm({
        title: 'Exit App',
        content: 'Do you want to exit?',
        okText: 'OK',
        cancelText: 'Cancel'
    }).then(function (res) {
            if (res) {
                navigator.app.exitApp();
            }
    });
  }
})

.controller('DashCtrl', function($scope) {})

.controller('CprCtrl', function($scope,$interval,$ionicPopup) {


  $scope.date = new Date();
  $scope.CPRbtn = true;
  $scope.EPHbtn = false;
  $scope.AMIbtn = false;

  $scope.procedure_start = "00:00:00";
  
  $scope.CPR_counter = 0;
  $scope.EPH_counter = 0;
  $scope.AMI_counter = 0;

  $scope.CPR_total_time = '0:00';

  $scope.CPR_minute = '2';
  $scope.CPR_seconds = '00';

  $scope.EPH_minute = '3';
  $scope.EPH_seconds = '00';

  $scope.AMI_minute = '3';
  $scope.AMI_seconds = '00';

  $scope.showNotification = function(title, msg, sound){
    cordova.plugins.notification.local.schedule({
      id: 1,
      title: title,
      text: msg,
      sound: isAndroid ? 'file://'+sound+'.mp3' : 'file://'+sound+'.caf',
      badge: 1
    });
  }
 

  $scope.SumTime = function(hms) {
    var a = hms.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var novo = parseInt(a[0])+2;
    var newseconds = novo < 10 ? "0" + novo +':00' : novo +':00';
    return newseconds;
  }

  $scope.timer = function(duration, callback){
      var timer = duration, minutes, seconds;
      var contador = $interval(function () {

          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);
  
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          if(callback=='cpr') {
            $scope.CPR_minute = minutes;
            $scope.CPR_seconds = seconds;
          } else if(callback=='eph') {
            $scope.EPH_minute = minutes;
            $scope.EPH_seconds = seconds;
          } else if (callback=='ami') {
            $scope.AMI_minute = minutes;
            $scope.AMI_seconds = seconds;
          }
          

          if (--timer < 0) {
            
            $interval.cancel(contador);
            if(callback=='cpr') {
              $scope.CPRbtn = true;
              $scope.CPR_counter = ++$scope.CPR_counter;
              $scope.CPR_total_time = $scope.SumTime($scope.CPR_total_time);
              $scope.showAlertPopup();
            } else if(callback=='eph') {
              $scope.EPHbtn = true;
              $scope.EPH_counter = ++$scope.EPH_counter;
              $scope.showNotification('Epinephrine','Open the CPR App to check','beep');
            } else if(callback=='ami') {
              $scope.AMIbtn = true;
              $scope.AMI_counter = ++$scope.AMI_counter;
              $scope.showNotification('Amiodarone','Open the CPR App to check','beep');
            }
            
          }
      }, 1000);
  }
  
  $scope.showAlertPopup = function() {
    $scope.showNotification('CHECK RHYTHM','Open the CPR App to check rhythm','alarm');
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
            $scope.CPRTimer();
          }
        }
      ]
    });
  }

  $scope.showResetPopup = function() {
    $scope.data = {};
  
    // An elaborate, custom popup
    var ephpopup = $ionicPopup.show({
      scope: $scope,
      template: '<center><p><b>Epinephrine:</b> <span ng-bind="EPH_counter"></span></p></center>'+
      '<center><p><b>Amiodarone:</b> <span ng-bind="AMI_counter"></span></p></center>'+
      '<center><p><b>CPR Cycles:</b> <span ng-bind="CPR_counter"></span></p></center>'+
      "<center><p><b>Start Time:</b> <span>{{procedure_start | date:'H:m:s'}}</span></p></center>"+
      '<center><p><b>CPR Time:</b> <span ng-bind="CPR_total_time"></span></p></center>',
      title: 'TOTAL CYCLES',
      buttons: [
        { text: 'CONTINUE', type: 'button-calm', 
          onTap: function(e) {} 
        },
        {
          text: 'STOP ALL',
          type: 'button-assertive',
          onTap: function(e) {
            $scope.StopAll();
          }
        }
      ]
    });
  }


  $scope.showEphPopup = function() {
    $scope.data = {};
    // An elaborate, custom popup
    var ephpopup = $ionicPopup.show({
      scope: $scope,
      template: ' <ion-list>'+
      '<ion-radio ng-model="EPH_minute" value="3">3 minutes</ion-radio>'+
      '<ion-radio ng-model="EPH_minute" value="4">4 minutes</ion-radio>'+
      '<ion-radio ng-model="EPH_minute" value="5">5 minutes</ion-radio>'+
    '</ion-list>',
      title: 'EPINEPHRINE Time',
      subTitle: 'Set interval',
     
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Set</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.EPH_minute) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              $scope.EPH_minute = this.scope.EPH_minute;
              return $scope.EPH_minute;
            }
          }
        }
      ]
    });
    ephpopup.then(function(res) {
      //console.log('Selected', res);
    });
  }
  
  $scope.showAmiPopup = function() {
    $scope.data = {};
    // An elaborate, custom popup
    var ephpopup = $ionicPopup.show({
      scope: $scope,
      template: ' <ion-list>'+
      '<ion-radio ng-model="AMI_minute" value="3">3 minutes</ion-radio>'+
      '<ion-radio ng-model="AMI_minute" value="4">4 minutes</ion-radio>'+
      '<ion-radio ng-model="AMI_minute" value="5">5 minutes</ion-radio>'+
    '</ion-list>',
      title: 'AMIODARONE Time',
      subTitle: 'Set interval',
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Set</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.AMI_minute) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              $scope.AMI_minute = this.scope.AMI_minute;
              return $scope.AMI_minute;
            }
          }
        }
      ]
    });
    ephpopup.then(function(res) {
      //console.log('Selected', res);
    });
  }

  $scope.CPRTimer = function(){
    $scope.procedure_start = $scope.date;
    $scope.CPRbtn = false;
    $scope.EPHbtn = true;
    $scope.AMIbtn = true;
    var minutes = (60 * 2)-1;
    $scope.timer(minutes,'cpr');
  }
  $scope.EPHTimer = function(){
    $scope.EPHbtn = false;
    var minutes = (60 * $scope.EPH_minute)-1;
    $scope.timer(minutes,'eph');
  }
  $scope.AMITimer = function(){
    $scope.AMIbtn = false;
    var minutes = (60 * $scope.AMI_minute)-1;
    $scope.timer(minutes,'ami');
  }
  $scope.StopAll = function(){
    $scope.CPRbtn = true;
    $scope.EPHbtn = false;
    $scope.AMIbtn = false;
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
