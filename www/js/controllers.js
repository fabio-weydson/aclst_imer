angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CprCtrl', function($scope,$interval,$ionicPopup) {

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
    
 
  $scope.timer = function(totalTime){
    $scope.date = new Date();
      var timerTemp = totalTime.split(':');
      var minutes = parseInt(timerTemp[0], 10);
      var seconds = parseInt(timerTemp[1], 10);

      cprMinute = parseInt((minutes === '' ? 0 : minutes));
      cprSecond = parseInt((seconds === '' ? 0 : seconds));

      console.log(totalTime, cprMinute,cprSecond);
      var aux = 0;
      var final = cprMinute * 60;
      var cronometro = $interval(function(){
          if(aux==60){
            aux=0;
            $scope.CPR = $scope.CPR--;
            $scope.CPR_seconds = 59;
          } else {
            $scope.CPR_seconds = final;
          }

          if(($scope.CPR==0)&&(final==0)) {
            console.log('acabou')
            $interval.cancel(cronometro);
          }
          
          $scope.CPR = (final--);
          aux++;
      },1000);
      /* cprSecond = cprSecond - 1;
      if (cprSecond == 0 && cprMinute == 0) {
          $scope.cprTime = totalTime;
          console.log('finalizou cpr');
          $scope.totalCprCycles = totalCprCycles + 1;

          $scope.totalCprTime = totalCprTime + 2;

          //audio.play();
      } else if (cprSecond < 10 && cprMinute === 0) {
        $scope.cprTime = "00:0" + cprSecond;
      } else if (cprMinute >= 1) {
        $scope.cprTime = (cprMinute < 10 ? '0' + cprMinute : cprMinute) + ":" + (cprSecond < 10 ? '0' + cprSecond : cprSecond);
      } else {
        $scope.cprTime = "00:" + cprSecond;
      }
      */
    
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
