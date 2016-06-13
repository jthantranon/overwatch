/**
 * Created by john.thantranon on 2/23/2016.
 */

var dedent = COMMON.getInstance().dedent;
var Tools = COMMON.getInstance().tools;

var socket = io();

var app = angular.module("theApp", []).controller("theController", ["$scope","$http", "$log", "$location", function($scope, $http, $log, $location){
    $location.path('/All');
    $scope.moment = moment;
    $scope.tableFilter = 'all';
    $scope.Tools = Tools;
    $scope.$log = $log;
    $scope.$location = $location;

    $scope.addTag = () => {
        var tag =  window.prompt('btag#1234');
        socket.emit('AddTag',{
            btag: tag
        })
    };

    $scope.addGroup = (name) => {
        console.log(name);
        var group =  window.prompt('group name, everything sensitive');
        socket.emit('AddGroup',{
            btag: name,
            group: group
        });
    };

    //$scope.$path = decodeURIComponent($location.url().split('/')[1]) || 'All';
    $scope.decodeURIComponent = decodeURIComponent;
    $scope.getObjLength = (obj) => {
        return Object.keys(obj).length || 0;
    };

    $scope.obCount = (obj) => {
        if(!obj) return 0;
        return Object.keys(obj).length;
    };

    $scope.heroOV = (name) => {
        if(!$scope.Private || !$scope.Private.tagsData) return;
        return $scope.Private.tagsData[decodeURIComponent($location.url().split('/')[1]) || 'All']['mains'][name];
    };

    $scope.hero2OV = (name) => {
        if(!$scope.Private || !$scope.Private.tagsData || !$scope.Private.tagsData[decodeURIComponent($location.url().split('/')[1]) || 'All']) return;
        return $scope.Private.tagsData[decodeURIComponent($location.url().split('/')[1]) || 'All']['alts'][name];
    };

    $scope.heroBest = (name) => {
        if(!$scope.Private || !$scope.Private.tagsData) return;
        return $scope.Private.tagsData[decodeURIComponent($location.url().split('/')[1]) || 'All']['best'][name];
    };

    $scope.highest = {
        all: {}
    };

    $scope.heroes = {
        offense: {
            'Genji': true,
            'McCree': true,
            'Pharah': true,
            'Reaper': true,
            'Soldier: 76': true,
            'Tracer': true
        },
        defense: {
            'Bastion': true,
            'Hanzo': true,
            'Junkrat': true,
            'Mei': true,
            'Torbjörn': true,
            'Widowmaker': true
        },
        tank: {
            'D.Va': true,
            'Reinhardt': true,
            'Roadhog': true,
            'Winston': true,
            'Zarya': true
        },
        support: {
            'Lúcio': true,
            'Mercy': true,
            'Symmetra': true,
            'Zenyatta': true
        }
    };
    $scope.highlightHighest = (type,value,tags) => {
        for(var i in tags){
            var tag = tags[i];
            $scope.highest[tag] = $scope.highest[tag] || {};
            $scope.highest[tag][type] = $scope.highest[tag][type] || 0;
            $scope.highest[tag][type] = value > $scope.highest[tag][type] ? value : $scope.highest[tag][type];
            // if($scope.private){
            //     $scope.private.highest = $scope.private.highest || {};
            //     $scope.private.highest = $scope.highest;
            // }

        }
        $scope.highest['all'][type] = $scope.highest['all'][type] || 0;
        $scope.highest['all'][type] = value > $scope.highest['all'][type] ? value : $scope.highest['all'][type];
        //if(!$scope.highest[decodeURIComponent($location.url().split('/')[1])]) return;
        var path = decodeURIComponent($location.url().split('/')[1]) || 'all';
        if(!$scope.highest[path]) return;
        return $scope.highest[path][type] == value ? 'highlightHighest' : '';
    };

    $scope.stdName = (name) => {
        if(name === 'Torbjörn') name = 'torbjorn';
        if(name === 'Lúcio') name = 'lucio';
        if(name === 'Soldier: 76') name = 'soldier-76';
        if(name === 'D.Va') name = 'dva';

        return name && name.toLowerCase();
    };

    $scope.updateAll = () => {
        socket.emit('UpdateAll')
    };

    $scope.currentSort = 'heroStats[0].winPercentage';
    $scope.currentSortPH = 'winPercentage';
    $scope.currentSortDir = '-';
    $scope.currentSortDirPH = '-';
    $scope.changeSortDir = () => {
        $scope.currentSortDir = $scope.currentSortDir === '-'? '' : '-';
    };
    $scope.changeSortDirHero = () => {
        $scope.currentSortDirHero = $scope.currentSortDirHero === '-'? '' : '-';
    };
    $scope.changeSortDirPH = () => {
        $scope.currentSortDirPH = $scope.currentSortDirPH === '-'? '' : '-';
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
        $scope.Private.highest = $scope.highest;
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

app.filter('orderObjectBy', function(){
    return function(input, attribute) {
        if (!angular.isObject(input)) return input;

        var array = [];
        for(var objectKey in input) {
            array.push(input[objectKey]);
        }

        array.sort(function(a, b){
            a = parseInt(a[attribute]);
            b = parseInt(b[attribute]);
            return a - b;
        });
        return array;
    }
});

// app.filter('orderObjectBy', function() {
//     return function(items, fields, reverse) {
//         var filtered;
//         filtered = [];
//         angular.forEach(items, function(item) {
//             return filtered.push(item);
//         });
//         filtered.sort(function(a, b) {
//             var sifted_item_a, sifted_item_b;
//             sifted_item_a = a;
//             sifted_item_b = b;
//             angular.forEach(fields, function(field) {
//                 sifted_item_a = sifted_item_a[field];
//                 return sifted_item_b = sifted_item_b[field];
//             });
//             if (sifted_item_a > sifted_item_b) {
//                 return 1;
//             } else {
//                 return -1;
//             }
//         });
//         if (reverse) {
//             filtered.reverse();
//         }
//         return filtered;
//     };
// });
