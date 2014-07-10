angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('Friends', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var friends = [
            { id: 0, name: 'Scruff McGruff' },
            { id: 1, name: 'G.I. Joe' },
            { id: 2, name: 'Miss Frizzle' },
            { id: 3, name: 'Ash Ketchum' }
        ];

        return {
            all: function () {
                return friends;
            },
            get: function (friendId) {
                // Simple index lookup
                return friends[friendId];
            }
        }
    })

    .factory('Game', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var ingredients = [
            { id: "morel", uuid:'', name: "Morels", image: "img/Morchella.jpg", description: "Morchella, the true morels, is a genus of edible mushrooms closely related to anatomically simpler cup fungi. These distinctive mushrooms appear honeycomb-like in that the upper portion is composed of a network of ridges with pits between them. The ascocarps are prized by gourmet cooks, particularly for French cuisine. Commercial value aside, morels are hunted by thousands of people every year simply for their taste and the joy of the hunt."},
            { id: "asparagus", uuid:'', name: "Wild Asparagus", image: "img/asparagus-spear.jpg", description: "Asparagus officinalis is a spring vegetable, a flowering perennial[1] plant species in the genus Asparagus. It was once classified in the lily family, like its Allium cousins, onions and garlic, but the Liliaceae have been split and the onion-like plants are now in the family Amaryllidaceae and asparagus in the Asparagaceae. Asparagus officinalis is native to most of Europe, northern Africa and western Asia, and is widely cultivated as a vegetable crop."},
            { id: "garlic", uuid:'', name: "Wild Garlic", image: "img/Allium_canadense.jpg", description: "Wild onion (Allium canadense), also known as Canada onion, wild garlic, meadow garlic, and Canadian garlic,[3] is a perennial plant native to eastern North America from Texas to Florida to New Brunswick to Montana. The species is also cultivated in other regions as an ornamental and as a garden culinary herb.[4] The plant is also reportedly naturalized in Cuba."},
            { id: "redfife",  uuid:'', name: "Red Fife Wheat", image: "img/red-fife-1.jpg", description: "Red Fife is a cultivar of bread wheat that originated in Peterborough, Ontario in 1842. It is believed to have crossed several continents and the Atlantic before arriving in Canada, where it gained a foothold on the land of David Fife, from which it is named."},
            { id: "fiddleheads", uuid:'', name: "Fiddlehead Greens", image: "img/fiddlehead.jpg", description: "Fiddlehead greens are the furled fronds of a young fern,[1] harvested for use as a vegetable. Left on the plant, each fiddlehead would unroll into a new frond (circinate vernation)"}
        ];

        return {
            allIngredients: function () {
                return ingredients;
            },
            getIngredient: function (ingredientId) {
                //alert('sdfljhsl')
                // Simple index lookup
                var ingId;
                console.log('ingredients[ingredientId]: ',ingredients[ingredientId]);
                for (var i=0; i<ingredients.length; i++){
                    if(ingredientId == ingredients[i].id){
                        ingId = i;


                    }
                }
                if(ingId)   return ingredients[ingId]
                return false;
            }
        }
    })

    .service("User", function ($rootScope) {
        var self = this;
        this.userName = '';
        this.userId = '';

        if(window.localStorage[userId]){
            self.userId = window.localStorage[userId];
        }

        if(window.localStorage[userName]){
            self.userName = window.localStorage[userName];
        }

        this.setUserName = function(userName){
            self.userName = userName;
            window.localStorage[userId] = userName;
        };
        this.userId = function(userId){
            self.userId = userId;
            window.localStorage[userId] = userId;
        };



    })

    .service("PeripheralManager", function ($rootScope) {

        var self = this;
        var discoverTimout;
        var connectTimout;
        var discoverTime = .3;
        var maxIterations = 3;
        var doDiscover = true;

        // sample #1 from environment (rssi -45dBm = distance 1.5ft)
        var r1 = -45;
        var d1 = .5;

        // sample #2 from environment (rssi -75dBm = distance 20ft)
        var r2 = -75;
        var d2 = 20;

        // constant to account for loss due to reflection, polzarization, etc
        // n will be ~2 for an open space
        // n will be ~3 for "typical" environment
        // n will be ~4 for a cluttered industrial site
        Math.log10 = function(n) {
            return (Math.log(n)) / (Math.log(10));
        };

        var n = (r2 - r1) / (10 * Math.log10(d1 / d2));
        n = Math.round(n*100)/100;

        this.isConnected = false;
        this.isConnecting = false;
        this.isDiscovering = false;
        this.isCollecting = false;
        this.isEnabled = false;

        this.isCheckedIn = false;
        this.isOnSite = false;
        this.readyToCheckIn = false;

        this.devices = {};

        //this.discoveredDevices = [];

        this.get = function (uuid) {
            return self.devices[uuid];
        };

        this.discoverPeripherals = function (sec) {
            if (!doDiscover){
                self.isDiscovering = false;
                return;
            }
            self.isDiscovering = true;
            //console.log('discoverPeripherals');
            var discTime = sec || discoverTime;
            rfduino.discover(discTime, function (device) {
                //console.log('rfduino.discover');
                $rootScope.$apply(function () {
                    if(self.devices[device.uuid]){
                        device.isConnecting = self.devices[device.uuid].isConnecting;
                        device.isConnected = self.devices[device.uuid].isConnected;
                        device.iterations = self.devices[device.uuid].iterations;
                        device.totalRssi = self.devices[device.uuid].totalRssi;
                        device.isCollecting = self.devices[device.uuid].isCollecting;
                        device.isCollected = self.devices[device.uuid].isCollected;
                        device.amount = self.devices[device.uuid].amount;
                    }else{
                        device.isConnecting = false;
                        device.isConnected = false;
                        device.iterations = 0;
                        device.totalRssi = 0;
                        device.averageRssi = device.rssi;
                        device.isCollected = false;
                        device.isCollecting = false;
                        device.amount = 0;
                    }

                    if(device.rssi > -127 && device.rssi < 0){
                        device.iterations++;
                        device.totalRssi += device.rssi;
                        //device.averageRssi = Math.round(100*(device.totalRssi/device.iterations))/100;
                        device.averageRssi = device.totalRssi/device.iterations;
                        var distance = d1 * Math.pow(10, ((r1 - device.averageRssi) / (10 * n)));
                        device.distance = Math.round(distance*100)/100;

                        console.log('n is: ',n);
                        console.log('device.iterations: ',device.iterations);
                        console.log('device.rssi: ',device.rssi);
                        console.log('device.averageRssi: ',device.averageRssi);
                        console.log('device.distance: ',device.distance);
                        console.log('\n\r');

                        if(device.iterations >= maxIterations){
                            //device.averageRssi = device.totalRssi/device.iterations;
                            device.iterations = 0;
                            device.totalRssi = 0;
                        }
                        //n = Math.round(n*100)/100
                    }else{
                        device.distance = 'out of range'
                    }
                    self.devices[device.uuid] = device;
                });
            }, function () {
                alert('discover error!');
            });
            //if(!doDiscover) return;
            discoverTimout = setTimeout(function () {
                self.discoverPeripherals();
            }, discTime * 1500);
        };

        /*this.averageRSSI = function(rssi){

        };*/

        this.connect = function (uuid) {
            console.log('this.connect: ',uuid);
            console.log('self.devices[device.uuid].isConnected: ',self.devices[uuid].isConnected);
            //var deviceId = uuid;
            if(self.devices[uuid].isConnected) return;
            //clearTimeout(discoverTimout);
            if(self.isDiscovering){
                doDiscover = false;
                self.isConnecting = true;
                self.devices[uuid].isConnecting = true;
                self.devices[uuid].isConnected = false;
                connectTimout = setTimeout(function(){
                    self.connect(uuid);
                }, discoverTime*1500);

                return;
            }
            //clearTimeout(connectTimout);

            //$rootScope.$apply(function () {
                doDiscover = false;
                self.isConnecting = true;
                self.devices[uuid].isConnecting = true;
                self.devices[uuid].isConnected = false;
            //});
            rfduino.connect(uuid, function (device) {
                console.log('connected to : ', uuid);
                $rootScope.$apply(function () {
                    self.connectedDeviceId = uuid;
                    self.isConnecting = false;
                    self.isConnected = true;
                    self.devices[uuid].isConnecting = false;
                    self.devices[uuid].isConnected = true;
                });


                rfduino.onData(function (data) {
                    //var args = arguments;

                    var a = new Float32Array(data);
                    /*if(a[0] <= 0){
                        alert('collected!!!!');
                    }else{

                    }*/
                    $rootScope.$apply(function () {
                        if(self.isCollecting){
                            self.devices[uuid].amount = 10 - a[0];
                            if(a[0] <= 0){
                                self.isCollecting = false;
                                self.devices[uuid].isCollected = true;
                                self.disconnect(uuid);
                            }else{
                                self.devices[uuid].isCollected = false;
                            }
                        }else{
                            self.devices[uuid].distance = a[0];
                        }

                    });
                }, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        console.log('onData ERROR: ',args);
                        self.devices[uuid].data = args;
                    });
                });


            }, function () {
                console.log('connect failure');
                $rootScope.$apply(function () {
                    self.isConnecting = false;
                    self.isConnected = false;
                    self.devices[uuid].isConnecting = false;
                    self.devices[uuid].isConnected = false;
                    self.connectedDeviceId = null;
                });
                doDiscover = true;
                self.discoverPeripherals();
            });
        };

        this.disconnect = function (uuid) {
            console.log('disconnect');
            if(!self.isConnected) return;
            if(!uuid) uuid = self.connectedDeviceId;
            self.isConnecting = true;
            rfduino.disconnect(function () {
                $rootScope.$apply(function () {
                    self.connectedDeviceId = null;
                    self.isConnecting = false;
                    self.isConnected = false;
                    self.devices[uuid].isConnecting = false;
                    self.devices[uuid].isConnected = false;
                });
                //doDiscover = true;
                //self.discoverPeripherals();
            }, function () {
                $rootScope.$apply(function () {
                    self.isConnecting = false;
                    self.isConnected = true;
                    self.devices[uuid].isConnecting = false;
                    self.devices[uuid].isConnected = true;
                });
            });
        };

        this.collect = function(uuid){
            console.log('PeripheralManager.collect: ',uuid);
            /*if(self.devices[uuid].isCollected || self.devices[uuid].isCollecting) return;
            self.isCollecting = true;
            self.devices[device.uuid].isCollecting = true;*/
            //device.isCollected = self.devices[device.uuid].isCollected;
            rfduino.write("collect", function(){
                console.log('write success');
                //$rootScope.$apply(function () {
                    self.isCollecting = true;
                    self.devices[uuid].isCollecting = true;
                //});
            }, function(){
                //$rootScope.$apply(function () {
                    self.isCollecting = false;
                    self.devices[uuid].isCollecting = false;
                //});
            });
        };

        this.reset = function(uuid) {
            //$rootScope.$apply(function () {
                self.isCollecting = false;
                self.devices[uuid].isCollecting = false;
                self.devices[uuid].isCollected = false;
                self.devices[uuid].amount = 0;
                self.disconnect(uuid);
            //});
        }



        this.enabled = function () {
            rfduino.isEnabled(
                function () {
                    console.log("RFduino is enabled");
                    self.discoverPeripherals();
                    $rootScope.$apply(function () {
                        self.isEnabled = true;
                    });
                },
                function () {
                    console.log("RFduino is *not* enabled");
                    alert('enable bluetooth on your device!');
                    $rootScope.$apply(function () {
                        self.isEnabled = false;
                    });
                }
            );
        };



        this.init = function () {
            console.log('init');
            //console.log()
            self.enabled();
        };

        document.addEventListener('deviceready', this.init, false);


        this.greetTo = function (name) {
            this.greet = "Hello " + name;
        }
    });
