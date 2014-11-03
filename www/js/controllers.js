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

    .controller('IngredientDetailCtrl', function ($scope, $rootScope, $stateParams, PeripheralManager, Game, Config) {
        console.log('IngredientDetailCtrl');

        $scope.peripheralManager = PeripheralManager;
        $scope.st = Config.staticText.get('ingredients');
        $scope.ingredient = Game.getListItem('ingredients', $stateParams.ingredientId);
        $scope.recipes = Game.getIngredientRecipes($stateParams.ingredientId);
        console.log('$scope.recipes: ',$scope.recipes);
        var deviceId = $scope.ingredient.device.uuid;
        $scope.deviceId = deviceId;
        console.log('$scope.deviceId: ',$scope.deviceId);

        $scope.$watch('ingredient.isCollected', function() {
            /*$rootScope.$apply(function () {
                //$scope.recipes = Game.getIngredientRecipes($stateParams.ingredientId);
            }*/
        });

        $scope.showRecipe = function($event, recipe){
            if(recipe.hasIngredients){
                $location.path('/tab/recipe/'+recipe.id);
            }else{
                var $i = $($event.currentTarget).find('i');
                if(!$i.hasClass('shake')){
                    $i.addClass('shake').on( 'webkitAnimationEnd', function() {
                        $i.off( 'webkitAnimationEnd' );
                        $i.removeClass('shake');
                    });
                }
            }
        };

        $scope.toggleConnect = function () {
            console.log('toggleConnect: ',deviceId);

            if(PeripheralManager.devices[deviceId].isConnecting) return;

            if(PeripheralManager.devices[deviceId].isConnected){
                PeripheralManager.disconnect(deviceId);
            }else{
                PeripheralManager.connect(deviceId);
            }
        };

        $scope.collect = function () {
            console.log('collect: ',deviceId);
            PeripheralManager.collect(deviceId);
/*            return;

            if(PeripheralManager.devices[deviceId].isCollecting) return;

            if(PeripheralManager.devices[deviceId].isCollected){
                PeripheralManager.disconnect(deviceId);
            }else{
                PeripheralManager.collect(deviceId);
            }*/
        };

        $scope.reset = function () {
            PeripheralManager.reset(deviceId);
        };

        console.log("ingredient:", $scope.ingredient);
    })

	.controller('RecipesCtrl', ['$scope', 'Game', 'Config', '$location', function ($scope, Game, Config, $location) {
		$scope.recipes = Game.getList('recipes');
        $scope.st = Config.staticText.get('ingredients');
        $scope.showRecipe = function($event, recipe){
            if(recipe.hasIngredients){
                $location.path('/tab/recipe/'+recipe.id);
            }else{
                var $i = $($event.currentTarget).find('i');
                if(!$i.hasClass('shake')){
                    $i.addClass('shake').on( 'webkitAnimationEnd', function() {
                        $i.off( 'webkitAnimationEnd' );
                        $i.removeClass('shake');
                    });
                }
            }
        };
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
/*            return;

            if(PeripheralManager.devices[$stateParams.deviceId].isCollecting) return;

            if(PeripheralManager.devices[$stateParams.deviceId].isCollected){
                PeripheralManager.disconnect($stateParams.deviceId);
            }else{
                PeripheralManager.collect($stateParams.deviceId);
            }*/
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