/*
 var rfduino = rfduino || {
 discover: function(device){

 }
 };
 */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {


        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html",
		        controller: "TabsCtrl"
            })

            // Each tab has its own nav history stack:

            .state('introduction', {
                url: '/introduction',
                templateUrl: 'templates/introduction.html',
                controller: 'IntroductionCtrl'
            })

//            .state('ingredients', {
//                url: '/ingredients',
//                templateUrl: 'templates/tab-ingredients.html',
//                controller: 'IngredientsCtrl'
//            })

	        .state('tab.ingredients', {
		        url: '/ingredients',
		        views: {
			        'tab-ingredients': {
				        templateUrl: 'templates/tab-ingredients.html',
				        controller: 'IngredientsCtrl'
			        }
		        }
	        })

	        .state('tab.ingredient-detail', {
		        url: '/ingredient/:ingredientId',
		        views: {
			        'tab-ingredients': {
				        templateUrl: 'templates/ingredient-detail.html',
				        controller: 'IngredientDetailCtrl'
			        }
		        }
	        })

            /*.state('ingredient-detail', {
                url: '/ingredient/:ingredientId',
                templateUrl: 'templates/ingredient-detail.html',
                controller: 'IngredientDetailCtrl'
            })*/

            .state('tab.devices', {
                url: '/devices',
                views: {
                    'tab-devices': {
                        templateUrl: 'templates/tab-devices.html',
                        controller: 'DevicesCtrl'
                    }
                }
            })

            .state('tab.device-detail', {
                url: '/device/:deviceId',
                views: {
                    'tab-devices': {
                        templateUrl: 'templates/device-detail.html',
                        controller: 'DeviceDetailCtrl'
                    }
                }
            })

            .state('tab.recipes', {
                url: '/recipes',
                views: {
                    'tab-recipes': {
                        templateUrl: 'templates/tab-recipes.html',
                        controller: 'RecipesCtrl'
                    }
                }
            })
            .state('tab.recipe-detail', {
                url: '/recipe/:recipeId',
                views: {
                    'tab-recipes': {
                        templateUrl: 'templates/recipe-detail.html',
                        controller: 'RecipeDetailCtrl'
                    }
                }
            })

            .state('tab.about', {
                url: '/about',
                views: {
                    'tab-about': {
                        templateUrl: 'templates/about.html',
                        controller: 'AboutCtrl'
                    }
                }
            })

        // if none of the above states are matched, use this as the fallback
        //$urlRouterProvider.otherwise('/tab/devices');
        $urlRouterProvider.otherwise('/tab/about');
//        $urlRouterProvider.otherwise('/tab/ingredients');

    });

