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
                            dat.data.heroStats[0].gamesUp = (dat.data.heroStats[0].gamesWon - (dat.data.heroStats[0].gamesPlayed/2))*2;
                            dat.data.heroStats[0].killsUp = dat.data.heroStats[0].finalBlows - dat.data.heroStats[0].deaths;
                            dat.data.heroStats[0].elimsUp = dat.data.heroStats[0].eliminations - dat.data.heroStats[0].deaths;
                            dat.data.heroStats[0].elimsUp2 = dat.data.heroStats[0].eliminations - (dat.data.heroStats[0].deaths*2);
                            dat.data.heroStats[0].winPercentage = dat.data.heroStats[0].gamesWon/dat.data.heroStats[0].gamesPlayed;
                            dat.data.heroStats[0].avgGold = dat.data.heroStats[0].medalsGold / dat.data.heroStats[0].gamesPlayed;
                            dat.data.heroStats[0].avgSilver = dat.data.heroStats[0].medalsSilver / dat.data.heroStats[0].gamesPlayed;
                            dat.data.heroStats[0].avgBronze = dat.data.heroStats[0].medalsBronze / dat.data.heroStats[0].gamesPlayed;
                            dat.data.heroStats[0].avgMedal = (dat.data.heroStats[0].medalsGold + dat.data.heroStats[0].medalsSilver + dat.data.heroStats[0].medalsBronze) / dat.data.heroStats[0].gamesPlayed;
                            dat.data.player.realName = nameMap[dat.data.player.name];
                            dat.data.player.tags = tagsMap[dat.data.player.name];
                            for(var i in dat.data.heroStats){
                                var hero = dat.data.heroStats[i];
                                if(hero.name !== 'All'){
                                    if(hero.timePlayed > timePlayed){
                                        dat.data.mostPlayed = hero.name;
                                        dat.data.mostPlayedData = hero;
                                        timePlayed = hero.timePlayed;
                                        //for(var i in dat.data.player.tags){
                                        //    var tag = dat.data.player.tags[i];
                                        //    tagsData[tag] = tagsData[tag] || {};
                                        //    tagsData[tag].mains = tagsData[tag].mains || {};
                                        //    tagsData[tag].mains[hero.name] = tagsData[tag].mains[hero.name] || 0;
                                        //    tagsData[tag].mains[hero.name]++;
                                        //}
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
                name: 'John T',
                tags: ['JFT Friends','Gamblit','Winky']

            },
            {
                btag: 'Fortytwo#1991',
                nick: '42',
                name: 'Maanas',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'Oush#1280',
                nick: 'MJW',
                name: 'Mark',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'Danzro#1740',
                nick: 'Danzro',
                name: 'Dan',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'GregerousRex#1504',
                nick: 'Gregerous',
                name: 'Greg',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'kcthebrewer#1131',
                nick: 'kc',
                name: 'Casey B.',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'Oafkad#1958',
                nick: 'Mike',
                name: 'Mike',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'MadProphet#1298',
                nick: 'MadProphet',
                name: 'Edvard',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'Kalialla#1530',
                nick: 'Kalialla',
                name: 'Kalialla',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'Bijan711#1230',
                nick: 'Bijan',
                name: 'Anthony',
                tags: ['JFT Friends','Gamblit','Winky']
            },
            {
                btag: 'PvtFett#1432',
                nick: 'PvtFett',
                name: 'Randy',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'philoni#1112',
                nick: 'Philoni',
                name: 'Casey',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'whickerwov#1474',
                nick: 'whickerwov',
                name: 'Dirk',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'Fluffington#1184',
                nick: 'Fluffington',
                name: 'Zach F.',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'DahBunneh#1802',
                nick: 'DahBunneh',
                name: 'Carlos G.',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'moosecat#1447',
                nick: 'Moosecat',
                name: 'Liz',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'Dimethod#1423',
                nick: 'Dimethod',
                name: 'Richard',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'moortus#1658',
                nick: 'moortus',
                name: 'Carlos S.',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'Catawracked#1752',
                nick: 'Catawracked',
                name: 'Chris K.',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'Yodi#1241',
                nick: 'Yodi',
                name: 'Peter G.',
                tags: ['JFT Friends','Winky']
            }
        ];

        var players = [];
        var nameMap = {};
        var tagsMap = {};

        for(var i in playerMeta){
            var meta = playerMeta[i];
            players.push(meta.btag.split('#')[0]+'%23'+meta.btag.split('#')[1]);
            nameMap[meta.btag] = meta.name;
            tagsMap[meta.btag] = meta.tags;
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

        State.updateAll = () => {
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
        };

        var tagsData = {};
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
            State.private.nameMap = nameMap;

            for(var i in Data){
                var player = Data[i].player;
                //console.log(player);
                tagsData['All'] = tagsData['All'] || {};
                tagsData['All'].mains = tagsData['All'].mains || {};
                tagsData['All'].mains[Data[i].mostPlayed] = tagsData['All'].mains[Data[i].mostPlayed] || {};
                tagsData['All'].mains[Data[i].mostPlayed][player.name] = true;;
                for(var j in player.tags){
                    var tag = player.tags[j];
                    tagsData[tag] = tagsData[tag] || {};
                    tagsData[tag].mains = tagsData[tag].mains || {};
                    tagsData[tag].mains[Data[i].mostPlayed] = tagsData[tag].mains[Data[i].mostPlayed] ||{};
                    tagsData[tag].mains[Data[i].mostPlayed][player.name] = true;
                }
            }

            State.private.tagsData = tagsData;
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