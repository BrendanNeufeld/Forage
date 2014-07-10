angular.module('starter.controllers', [])

    .controller('IntroductionCtrl', function ($scope, $rootScope, PeripheralManager) {

        $scope.peripheralManager = PeripheralManager;

        /*PeripheralManager.disconnect();

        $scope.$on('$viewContentLoaded', function(e){
            //alert('sldkjf')
        });*/
    })

    .controller('DevicesCtrl', function ($scope, $rootScope, PeripheralManager) {

        $scope.peripheralManager = PeripheralManager;

        PeripheralManager.disconnect();

        $scope.$on('$viewContentLoaded', function(e){
            //alert('sldkjf')
        });

    })

    .controller('DeviceDetailCtrl', function ($scope, $stateParams, PeripheralManager) {

        $scope.deviceId = $stateParams.deviceId;
        $scope.peripheralManager = PeripheralManager;

        //$scope.device = PeripheralManager.devices[$stateParams.deviceId];

        $scope.toggleConnect = function () {
            console.log('toggleConnect: ',$stateParams.deviceId);

            if(PeripheralManager.devices[$stateParams.deviceId].isConnecting) return;

            if(PeripheralManager.devices[$stateParams.deviceId].isConnected){
                PeripheralManager.disconnect($stateParams.deviceId);
            }else{
                PeripheralManager.connect($stateParams.deviceId);
            }
        };

        $scope.collect = function () {
            console.log('collect: ',$stateParams.deviceId);
            PeripheralManager.collect($stateParams.deviceId);
            return;

            if(PeripheralManager.devices[$stateParams.deviceId].isCollecting) return;

            if(PeripheralManager.devices[$stateParams.deviceId].isCollected){
                PeripheralManager.disconnect($stateParams.deviceId);
            }else{
                PeripheralManager.collect($stateParams.deviceId);
            }
        };

        $scope.reset = function () {
            PeripheralManager.reset($stateParams.deviceId);
        };


    })

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($scope, $stateParams, PeripheralManager) {
        $scope.peripheralManager = PeripheralManager;

    });
