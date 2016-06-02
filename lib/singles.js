/**
 * Created by john.thantranon on 3/18/2016.
 */

var http = require('http');
var https = require('https');
var State = require('./state.js').getInstance();

module.exports = (function () {
    var instance;
    var Data = {};
    //var DataArray = [];
    function init(modName) {
        State.public.Singles = State.public.Singles || {};
        var count = 0;
        function getSimple(url,type,player){
            function get(res){
                var body = '';
                res.on('data', function(chunk){
                    body += chunk;
                });
                res.on('end', function(){
                    var dat;
                    try {
                        dat = JSON.parse(body);
                    } catch (err){}

                    if(dat){

                        if(type === 'overwatch'){
                            var timePlayed = 0;
                            dat.data.heroStats[0].winPercentage = dat.data.heroStats[0].gamesWon/dat.data.heroStats[0].gamesPlayed;
                            dat.data.heroStats[0].avgGold = dat.data.heroStats[0].medalsGold / dat.data.heroStats[0].gamesPlayed;
                            for(var i in dat.data.heroStats){
                                var hero = dat.data.heroStats[i];
                                if(hero.name !== 'All'){
                                    if(hero.timePlayed > timePlayed){
                                        dat.data.mostPlayed = hero.name;
                                        timePlayed = hero.timePlayed;
                                    }

                                }

                            }
                            Data[player] = dat.data;
                        } else {
                            State.public.Singles[type] = dat;
                        }

                    }
                    count++;
                    if(count === getSimplesArray.length){
                        done();
                    }
                });
            }
            try {
                https.get(url, get).on('error', function(e){
                    console.log("Got an error: ", e);
                });

            } catch (err){
                http.get(url, get).on('error', function(e){
                    console.log("Got an error: ", e);
                });
            }

        }
        var getSimplesArray = [];
        var searchArray = [];
        var updateArray = [];
        var statusArray = [];

        var playerMeta = [
            {
                btag: 'JFTActual#1112',
                nick: 'JFT',
                name: 'John T'

            },
            {
                btag: 'Fortytwo#1991',
                nick: '42',
                name: 'Maanas'
            },
            {
                btag: 'Oush#1280',
                nick: 'MJW',
                name: 'Mark'
            },
            {
                btag: 'Danzro#1740',
                nick: 'Danzro',
                name: 'Dan'
            },
            {
                btag: 'GregerousRex#1504',
                nick: 'Gregerous',
                name: 'Greg'
            },
            {
                btag: 'kcthebrewer#1131',
                nick: 'kc',
                name: 'Casey B.'
            },
            {
                btag: 'Oafkad#1958',
                nick: 'Mike',
                name: 'Mike'
            },
            {
                btag: 'MadProphet#1298',
                nick: 'MadProphet',
                name: 'Edvard'
            },
            {
                btag: 'Kalialla#1530',
                nick: 'Kalialla',
                name: 'Kalialla'
            },
            {
                btag: 'Bijan711#1230',
                nick: 'Bijan',
                name: 'Anthony'
            },
            {
                btag: 'PvtFett#1432',
                nick: 'PvtFett',
                name: 'Randy'
            },
            {
                btag: 'philoni#1112',
                nick: 'Philoni',
                name: 'Casey'
            },
            {
                btag: 'whickerwov#1474',
                nick: 'whickerwov',
                name: 'Dirk'
            },
            {
                btag: 'Fluffington#1184',
                nick: 'Fluffington',
                name: 'Zach F.'
            },
            {
                btag: 'DahBunneh#1802',
                nick: 'DahBunneh',
                name: 'Carlos G.'
            },
            {
                btag: 'moosecat#1447',
                nick: 'Moosecat',
                name: 'Liz'
            },
            {
                btag: 'Dimethod#1423',
                nick: 'Dimethod',
                name: 'Richard'
            },
            {
                btag: 'moortus#1658',
                nick: 'moortus',
                name: 'Carlos S.'
            }
        ];

        var players = [];

        for(var i in playerMeta){
            var meta = playerMeta[i];
            players.push(meta.btag.split('#')[0]+'%23'+meta.btag.split('#')[1]);
        }

        for(var i in players){
            var player = players[i];

            searchArray.push({
                url: 'https://api.watcher.gg/players/search/' + player,
                type: 'search',
                player: player
            });
            updateArray.push({
                url: 'https://api.watcher.gg/players/pc/us/' + player + '/refresh',
                type: 'update',
                player: player
            });
            statusArray.push({
                url: 'https://api.watcher.gg/players/pc/us/' + player,
                type: 'overwatch',
                player: player
            });

        }

        function getSimples(getArray){
            for (var i = 0; i < getArray.length; i++) {
                var obj = getArray[i];
                getSimple(obj.url,obj.type,obj.player)
            }
            setTimeout(() => {
                getSimples(getArray)
            },120000);
        }

        setTimeout(()=>{
            getSimples(getSimplesArray);
        },1000);
        setTimeout(()=>{
            getSimples(searchArray);
            setTimeout(()=>{
                getSimples(updateArray);
                setTimeout(()=>{
                    getSimples(statusArray);
                    setTimeout(done,2000);
                },1000);
                setTimeout(()=>{
                    getSimples(statusArray);
                    setTimeout(done,2000);
                },9000);
            },1000);
        },1000);




        function done(){
            console.log('wee');
            // console.log(State.singles);
            State.modStatus[modName] = true;
            State.private.overwatch = Data;
            var DataArray = [];
            for(var i in Data){
                DataArray.push(Data[i]);
            }
            State.private.overwatchA = DataArray;
            State.newFullUpdate();
        }

        return {

        };
    }

    return {
        getInstance: function (modName) {
            if ( !instance ) {
                instance = init(modName);
            }
            return instance;
        }
    };
})();//.getInstance();