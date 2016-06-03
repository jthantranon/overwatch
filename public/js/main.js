/**
 * Created by john.thantranon on 2/23/2016.
 */

var dedent = COMMON.getInstance().dedent;
var Tools = COMMON.getInstance().tools;

var socket = io();

var app = angular.module("theApp", []).controller("theController", ["$scope","$http", "$log", "$location", function($scope, $http, $log, $location){
    $scope.moment = moment;
    $scope.tableFilter = 'all';
    $scope.Tools = Tools;
    $scope.$log = $log;
    $scope.$location = $location;
    $scope.decodeURIComponent = decodeURIComponent;
    $scope.getObjLength = (obj) => {
        return Object.keys(obj).length || 0;
    };
    $scope.highest = {
        all: {}
    };
    $scope.highlightHighest = (type,value,tags) => {
        for(var i in tags){
            var tag = tags[i];
            $scope.highest[tag] = $scope.highest[tag] || {};
            $scope.highest[tag][type] = $scope.highest[tag][type] || 0;
            $scope.highest[tag][type] = value > $scope.highest[tag][type] ? value : $scope.highest[tag][type];
        }
        $scope.highest['all'][type] = $scope.highest['all'][type] || 0;
        $scope.highest['all'][type] = value > $scope.highest['all'][type] ? value : $scope.highest['all'][type];
        //if(!$scope.highest[decodeURIComponent($location.url().split('/')[1])]) return;
        var path = decodeURIComponent($location.url().split('/')[1]) || 'all';
        if(!$scope.highest[path]) return;
        return $scope.highest[path][type] === value ? 'highlightHighest' : '';
    };

    $scope.stdName = (name) => {
        if(name === 'Torbjörn') name = 'torbjorn';
        if(name === 'Lúcio') name = 'lucio';
        return name.toLowerCase();
    };

    $scope.updateAll = () => {
        socket.emit('UpdateAll')
    };

    $scope.currentSort = 'heroStats[0].winPercentage';
    $scope.currentSortDir = '-';
    $scope.changeSortDir = () => {
        $scope.currentSortDir = $scope.currentSortDir === '-'? '' : '-';
    };
    //$scope.filter = 'All';

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
