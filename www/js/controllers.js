angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CprCtrl', function($scope,$interval,$ionicPopup) {


  $scope.date = new Date();
  $scope.CPRbtn = true;
  $scope.EPHbtn = false;
  $scope.AMIbtn = false;

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
            } else if(callback=='ami') {
              $scope.AMIbtn = true;
              $scope.AMI_counter = ++$scope.AMI_counter;
            }
            
          }
      }, 1000);
  }
  
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
    
    $scope.CPRbtn = false;
    $scope.EPHbtn = true;
    $scope.AMIbtn = true;
    var minutes = (60 * 2)-1;
    $scope.timer(minutes,'cpr');
  }
  $scope.EPHTimer = function(){
    $scope.EPHbtn = false;
    var minutes = (60 * 2)-1;
    $scope.timer(minutes,'eph');
  }
  $scope.AMITimer = function(){
    $scope.AMIbtn = false;
    var minutes = (60 * 2)-1;
    $scope.timer(minutes,'ami');
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
