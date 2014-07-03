angular.module('starter.controllers', [])

    .controller('DevicesCtrl', function ($scope, $rootScope, Lanterns, PeripheralManager) {

        $scope.peripheralManager = PeripheralManager;

        PeripheralManager.disconnect();

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

    /*
    .controller('DeviceDetailCtrl', function ($scope, $stateParams, Lanterns) {

        $scope.isConnecting = Lanterns.isConnecting();
        $scope.distance = "unknown";
        $scope.device = Lanterns.get($stateParams.deviceId);

        Lanterns.onData(function(data){
            console.log('onData, success: ',data);
            var a = new Float32Array(data);
            console.log('value: ',  a[0]);
        },function(data){
            console.log('onData, failure: ', data);
        });

        $scope.toggleConnect = function () {
            console.log('toggleConnect');

            $scope.isConnecting = Lanterns.isConnecting();
            if(Lanterns.isConnecting()) return;

            if(Lanterns.get($stateParams.deviceId).isConnected){
                Lanterns.disconnect(disconnectSuccess, disconnectFailure);
            }else{
                Lanterns.connect($stateParams.deviceId, connectSuccess, connectFailure);
            }

            $scope.isConnecting = Lanterns.isConnecting();
        };

        var connectSuccess = function (args) {
            console.log('connnectSuccess, args: ',args);
            $scope.isConnecting = Lanterns.isConnecting();
            $scope.device = Lanterns.get($stateParams.deviceId);
            console.log("device: ",Lanterns.get($stateParams.deviceId));
        };

        var connectFailure = function (args) {
            console.log('connectFailure, args: ',args);
            $scope.isConnecting = Lanterns.isConnecting();
            $scope.device = Lanterns.get($stateParams.deviceId);
        };

        var disconnectSuccess = function (args) {
            console.log('disconnectSuccess, args: ',args);
            $scope.isConnecting = Lanterns.isConnecting();
            $scope.device = Lanterns.get($stateParams.deviceId);
            console.log("device: ",Lanterns.get($stateParams.deviceId));
        };

        var disconnectFailure = function (args) {
            console.log('disconnectFailure, args: ',args);
            $scope.isConnecting = Lanterns.isConnecting();
            $scope.device = Lanterns.get($stateParams.deviceId);
        };

    })
    */

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($scope, $stateParams, Lanterns) {

        var initPage = function(){
            Lanterns.isConnected(function(){
                console.log('isConnected = true');
                $scope.isConnected = true;
            }, function(){
                console.log('isConnected = false');
                $scope.isConnected = false;
            });
            Lanterns.isEnabled(function(){
                console.log('isEnabled = true');
                $scope.isEnabled = true;
            }, function(){
                console.log('isEnabled = false');
                $scope.isEnabled = false;
                alert('BLE is not enabled!');
            });
        };

        document.addEventListener('deviceready', initPage, false);
    });
