/**
 * Created by john.thantranon on 2/23/2016.
 */

var dedent = COMMON.getInstance().dedent;
var Tools = COMMON.getInstance().tools;

var socket = io();

var app = angular.module("theApp", []).controller("theController", ["$scope","$http", "$log", function($scope, $http, $log){
    $scope.moment = moment;
    $scope.tableFilter = 'all';
    $scope.Tools = Tools;
    $scope.$log = $log;
    $scope.getObjLength = (obj) => {
        return Object.keys(obj).length || 0;
    };

    $scope.currentSort = 'player.level';

    $scope.getModel = function(model){
        return model[Object.keys(model)[0]]
    };

    $scope.hiddenFields = [
        'eon',
        'uid',
        'name',
        'code'
    ];

    $scope.getCSSClass = function(type,name){
        switch(type){
            case 'highlight':
                return $scope.view === name ? 'highlight' : '';
                break;
        }
    };

    socket.on('Connected', () => {
        console.info(dedent`.
            . EdenOverwatch Server Connection Established!
            .   Welcome to the future, of science!`
        );
    });
    socket.on('FullState',(msg) => {
        $scope.State = msg.public;
        $scope.Private = msg.private;

        State = msg;
        console.dir(msg);
        $scope.$apply();
    });
}]);

app.filter('percentage', function() {
    return function(input, max) {
        if (isNaN(input)) {
            return input;
        }
        return Math.floor((input * 100)) + '%';
    };
});

app.filter('orderObjectBy', function() {
    return function(items, fields, reverse) {
        var filtered;
        filtered = [];
        angular.forEach(items, function(item) {
            return filtered.push(item);
        });
        filtered.sort(function(a, b) {
            var sifted_item_a, sifted_item_b;
            sifted_item_a = a;
            sifted_item_b = b;
            angular.forEach(fields, function(field) {
                sifted_item_a = sifted_item_a[field];
                return sifted_item_b = sifted_item_b[field];
            });
            if (sifted_item_a > sifted_item_b) {
                return 1;
            } else {
                return -1;
            }
        });
        if (reverse) {
            filtered.reverse();
        }
        return filtered;
    };
});
