(function() {
    var app = angular.module('ghostPS', ['ngRoute', 'ngAnimate', 'ngMessages', 'angular-scroll-animate']);
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
        // home page
            .when('/', {
                templateUrl: 'home.html',
                controller: 'mainController',
                title: 'Sayan Sinha | Home'
            })
            // about page
            .when('/about', {
                templateUrl: 'about.html',
                controller: 'aboutController',
                resolve: {
                    delay: function($q, $timeout) {
                        var delay = $q.defer();
                        $timeout(delay.resolve, 1500);
                        return delay.promise;
                    }
                },
                title: 'About me'
            })
            // contact page
            .when('/contact', {
                templateUrl: 'contact.html',
                controller: 'projectsController',
                resolve: {
                    delay: function($q, $timeout) {
                        var delay = $q.defer();
                        $timeout(delay.resolve, 1500);
                        return delay.promise;
                    }
                },
                title: 'Contact'
            }).otherwise({
                redirectTo: '/'
            });

        // use the HTML5 History API
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });
    });
    app.controller('ParticlesController', function() {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 75,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    });
    app.controller('mainController', ['$scope', '$http', '$sce', '$location',
        function($scope, $http, $sce, $location) {
            $scope.pageClass = 'page-home';
            $scope.goNext = function(hash) {
                $location.path(hash);
            }
        }
    ]);
    app.controller('aboutController', ['$scope', '$http', '$sce', '$location',
        function($scope, $http, $sce, $location) {
            $scope.pageClass = 'page-about';
            $scope.goNext = function(hash) {
                $location.path(hash);
            }
        }
    ]);
    app.controller('projectsController', ['$scope', '$http', '$sce', '$location',
        function($scope, $http, $sce, $location) {
            $scope.pageClass = 'page-projects';
            $scope.goNext = function(hash) {
                $location.path(hash);
            }
            $scope.animateElementIn = function($el) {
                $el.removeClass('not-visible');
                $el.addClass('animated zoomIn');
            };

            $scope.animateElementOut = function($el) {
                $el.addClass('not-visible');
                $el.removeClass('animated zoomIn');
            };
        }
    ]);

    app.directive('showDuringResolve', function($rootScope) {
        return {
            link: function(scope, element) {

                element.addClass('ng-hide');

                var unregister = $rootScope.$on('$routeChangeStart', function() {
                    element.removeClass('ng-hide');
                });

                scope.$on('$destroy', unregister);
            }
        };
    });

    app.directive('hideDuringResolve', function($rootScope) {
        return {
            link: function(scope, element) {

                element.removeClass('ng-hide');

                var unregister = $rootScope.$on('$routeChangeStart', function() {
                    element.addClass('ng-hide');
                });

                scope.$on('$destroy', unregister);
            }
        };
    });

    app.directive('resolveLoader', function($rootScope, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="alert alert-success ng-hide"><strong>Welcome!</strong> Content is loading, please hold.</div>',
            link: function(scope, element) {

                $rootScope.$on('$routeChangeStart', function(event, currentRoute, previousRoute) {
                    if (previousRoute) return;

                    $timeout(function() {
                        element.removeClass('ng-hide');
                    });
                });

                $rootScope.$on('$routeChangeSuccess', function() {
                    element.addClass('ng-hide');
                });
            }
        };
    });
    app.run(function($route, $rootScope) {
        $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute) {
            $rootScope.title = $route.current.title;
        });
    })
})();
