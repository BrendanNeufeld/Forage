angular.module('starter.controllers', [])

	.controller('AboutCtrl', ['$scope', '$stateParams', 'PeripheralManager', 'Config', '$state', function ($scope, $stateParams, PeripheralManager, Config, $state) {
		$scope.peripheralManager = PeripheralManager;
		$scope.doDebug = Config.doDebug;
		$scope.st = Config.staticText.get('about');
		$scope.play = function(){
			$state.go('tab.ingredients');
		};
	}])

	.controller('TabsCtrl', function ($scope, $rootScope, Config) {
		$scope.doDebug = Config.doDebug;
	})

    .controller('IngredientsCtrl', ['$scope', '$rootScope', 'PeripheralManager', 'Game', 'Config', function ($scope, $rootScope, PeripheralManager, Game, Config) {

        $scope.peripheralManager = PeripheralManager;

        $scope.ingredients = Game.getList('ingredients');

		$scope.st = Config.staticText.get('ingredients');

        /*PeripheralManager.disconnect();

        $scope.$on('$viewContentLoaded', function(e){
            //alert('sldkjf')
        });
        */

    }])

    .controller('IngredientDetailCtrl', function ($scope, $rootScope, $stateParams, PeripheralManager, Game) {
        console.log('IngredientDetailCtrl');

        $scope.toggleConnect = function(){

        }

//        $scope.ingredient = Game.getIngredient($stateParams.ingredientId);
        $scope.ingredient = Game.getListItem('ingredients', $stateParams.ingredientId);

        //console.log('Game: ',Game);

        //console.log('$stateParams.ingredientId: ',$stateParams.ingredientId);

        console.log("ingredient:", $scope.ingredient);
    })

	.controller('RecipesCtrl', ['$scope', 'Game', function ($scope, Game) {
//		console.log(Game.getList('recipes'))
		$scope.recipes = Game.getList('recipes');
	}])

	.controller('RecipeDetailCtrl', ['$scope', '$stateParams', 'Game', 'Config', function ($scope, $stateParams, Game, Config) {
		$scope.recipe = Game.getListItem('recipes', $stateParams.recipeId);
		$scope.st = Config.staticText.get('recipes');
//		console.log($scope.recipe);
	}])

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

	.controller('IntroductionCtrl', ['$scope','$rootScope','PeripheralManager','Game', 'User', '$state', function ($scope, $rootScope, PeripheralManager, Game, User, $state) {
		$scope.peripheralManager = PeripheralManager;
		$scope.game = Game;
		$scope.user = User;
		$scope.checkIn = function(user){
			User.setUserName(user.userName);
			$state.go('tab.ingredients');
		};
		/*PeripheralManager.disconnect();
		 $scope.$on('$viewContentLoaded', function(e){
		 //alert('sldkjf')
		 });*/
	}]);