angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CprCtrl', function($scope,$interval) {
  $scope.CPR = '02:00';
  $scope.CPR_minute = '1';
  $scope.CPR_seconds = '59';
  $scope.Epinephrine = '03:00';
  $scope.Amiodarone = '03:00';
 
  $scope.timer = function(totalTime){

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
