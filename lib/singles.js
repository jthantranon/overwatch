/**
 * Created by john.thantranon on 3/18/2016.
 */

var http = require('http');
var https = require('https');
var State = require('./state.js').getInstance();

var firebase = require('firebase');

var config = {
    serviceAccount: State.private.fbinit,
    databaseURL: "https://edenoverwatch.firebaseio.com",
};
firebase.initializeApp(config);

var db = firebase.database();
var ref = db.ref("/data");



// var wee = State.tools.convertBT('JFT%231112','-');
// console.log('!@#@!#!@#@!',wee);

module.exports = (function () {
    var instance;
    var Data = {};
    //var DataArray = [];
    function init(modName) {
        State.public.Singles = State.public.Singles || {};
        var count = 0;
        function getSimple(url,type,player,single){
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
                        if(single){
                            // console.log(dat);
                            single(dat);
                        }
                        if(type === 'overwatch' && dat.data && dat.data.heroStats){
                            var timePlayed = 0;
                            var bestWinP = 0;
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
                                var winP = hero.gamesWon / hero.gamesPlayed;
                                if(hero.name !== 'All'){
                                    if(hero.timePlayed > timePlayed){
                                        if(dat.data.mostPlayed){
                                            dat.data.secondMostPlayed = JSON.parse(JSON.stringify(dat.data.mostPlayed));
                                            dat.data.secondMostPlayedWP = JSON.parse(JSON.stringify(dat.data.mostPlayedWP));
                                            dat.data.secondMostPlayedData = JSON.parse(JSON.stringify(dat.data.mostPlayedData));
                                        }
                                        dat.data.mostPlayed = hero.name;
                                        dat.data.mostPlayedWP = winP;
                                        dat.data.mostPlayedData = hero;
                                        timePlayed = hero.timePlayed;
                                    }
                                    if(dat.data.secondMostPlayedData && (hero.timePlayed < dat.data.mostPlayedData.timePlayed) && (hero.timePlayed > dat.data.secondMostPlayedData.timePlayed)){
                                        dat.data.secondMostPlayed = hero.name;
                                        dat.data.secondMostPlayedWP = winP;
                                        dat.data.secondMostPlayedData = hero;
                                    }
                                    if(!dat.data.secondMostPlayedData && (hero.name !== dat.data.mostPlayed)){
                                        dat.data.secondMostPlayed = hero.name;
                                        dat.data.secondMostPlayedWP = winP;
                                        dat.data.secondMostPlayedData = hero;
                                    }

                                    if((hero.gamesPlayed > 5) && (winP > bestWinP)){
                                        dat.data.bestWinP = hero.name;
                                        dat.data.bestWinPP = winP;
                                        dat.data.bestWinPData = hero;
                                        bestWinP = winP;
                                    }

                                    if((hero.gamesPlayed >= 4) && (winP > bestWinP)){
                                        dat.data.bestWinP = hero.name;
                                        dat.data.bestWinPP = winP;
                                        dat.data.bestWinPData = hero;
                                        bestWinP = winP;
                                    }
                                }


                            }
                            Data[player] = dat.data;
                        } else {
                            State.public.Singles[type] = dat;
                        }

                    }
                    count++;
                    // if(count === getSimplesArray.length){
                    //     done();
                    // }
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
        // var getSimplesArray = [];
        var searchArray = [];
        var updateArray = [];
        var statusArray = [];

        var playerMeta = [
            {
                btag: 'JFTActual#1112',
                name: 'John T',
                tags: ['JFT Friends','Gamblit','Winky']

            },
            {
                btag: 'Fortytwo#1991',
                name: 'Maanas',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'Oush#1280',
                name: 'Mark',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'Danzro#1740',
                name: 'Dan',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'GregerousRex#1504',
                name: 'Greg',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'kcthebrewer#1131',
                name: 'Casey B.',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'Oafkad#1958',
                name: 'Mike',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'MadProphet#1298',
                name: 'Edvard',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'Kalialla#1530',
                name: 'Kalialla',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'Bijan711#1230',
                name: 'Anthony',
                tags: ['JFT Friends','Gamblit','Winky']
            },
            {
                btag: 'PvtFett#1432',
                name: 'Randy',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'philoni#1112',
                name: 'Casey',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'whickerwov#1474',
                name: 'Dirk',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'Fluffington#1184',
                name: 'Zach F.',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'DahBunneh#1802',
                name: 'Carlos G.',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'moosecat#1447',
                name: 'Liz',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'Dimethod#1423',
                name: 'Richard',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'moortus#1658',
                name: 'Carlos S.',
                tags: ['JFT Friends','Gamblit']
            },
            {
                btag: 'Catawracked#1752',
                name: 'Chris K.',
                tags: ['JFT Friends','Winky']
            },
            {
                btag: 'Yodi#1241',
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
                getSimple(obj.url,obj.type,obj.player);
            }
            // setTimeout(() => {
            //     getSimples(getArray)
            // },120000);
        }

        // setTimeout(()=>{
        //     getSimples(getSimplesArray);
        // },1000);
        function fetchAll(){
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
        }
        fetchAll();


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
            State.private.tagsMap = tagsMap;

            for(var i in Data){
                var player = Data[i].player;
                if(player.tags.indexOf('All') < 0) player.tags.push('All');
                //console.log(player);
                //tagsData['All'] = tagsData['All'] || {};
                //tagsData['All'].mains = tagsData['All'].mains || {};
                //tagsData['All'].mains[Data[i].mostPlayed] = tagsData['All'].mains[Data[i].mostPlayed] || {};
                //tagsData['All'].mains[Data[i].mostPlayed][player.name] = true;
                //
                //tagsData['All'].mains = tagsData['All'].alts || {};
                //tagsData['All'].mains[Data[i].mostPlayed] = tagsData['All'].mains[Data[i].mostPlayed] || {};
                //tagsData['All'].mains[Data[i].mostPlayed][player.name] = true;;
                for(var j in player.tags){
                    var tag = player.tags[j];
                    tagsData[tag] = tagsData[tag] || {};
                    tagsData[tag].mains = tagsData[tag].mains || {};
                    tagsData[tag].mains[Data[i].mostPlayed] = tagsData[tag].mains[Data[i].mostPlayed] ||{};
                    tagsData[tag].mains[Data[i].mostPlayed][player.name] = true;

                    tagsData[tag].alts = tagsData[tag].alts || {};
                    tagsData[tag].alts[Data[i].secondMostPlayed] = tagsData[tag].alts[Data[i].secondMostPlayed] ||{};
                    tagsData[tag].alts[Data[i].secondMostPlayed][player.name] = true;

                    tagsData[tag].best = tagsData[tag].best || {};
                    tagsData[tag].best[Data[i].bestWinP] = tagsData[tag].best[Data[i].bestWinP] ||{};
                    tagsData[tag].best[Data[i].bestWinP][player.name] = true;
                }
            }

            State.private.tagsData = tagsData;

            // console.log('!!!',State.private.custom);
            State.newFullUpdate();
        }

        State.getSimple = (obj) => {
            console.log(obj);
            var decodedTag = obj.btag.split('#')[0]+'%23'+obj.btag.split('#')[1];
            var search = 'https://api.watcher.gg/players/search/' + decodedTag;
            var update = 'https://api.watcher.gg/players/pc/us/' + decodedTag + '/refresh';
            var overwatch = 'https://api.watcher.gg/players/pc/us/' + decodedTag;

            nameMap[obj.btag] = obj.btag.split('#')[0];
            tagsMap[obj.btag] = obj.tags || [];

            function index(){
                searchArray.push({
                    url: search,
                    type: 'search',
                    player: decodedTag
                });
                updateArray.push({
                    url: update,
                    type: 'update',
                    player: decodedTag
                });
                statusArray.push({
                    url: overwatch,
                    type: 'overwatch',
                    player: decodedTag
                });
                fetchAll();
                State.private.custom[State.tools.convertBT(obj.btag,'-')] = {
                    "btag": obj.btag,
                    "tags": obj.tags || []
                };
                fs = require('fs');
                fs.writeFile('json/custom.json', JSON.stringify(State.private.custom, null, 4), function (err) {
                    if (err) return console.log(err);
                    // console.log('Hello World > helloworld.txt');
                });
                ref.set(State.private.custom);
                console.log('!!!',State.private.custom);
            }

            function finished(dat){
                var hasData = dat.data && dat.data.heroStats || false;
                if(hasData){
                    console.log(dat.data.player);
                    index();
                    console.log('finished!');
                } else {
                    console.log('no data found');
                }
            }

            function getUpdate(){
                getSimple(update,'update',decodedTag,getOverwatch);
            }

            function getOverwatch(){
                getSimple(overwatch,'overwatch',decodedTag,finished);
            }

            getSimple(search,'search',decodedTag,getUpdate);


        };

        function loadCustom(){
            for(var i in State.private.custom){
                var obj = State.private.custom[i];
                State.getSimple(obj);
            }
        }

        ref.on("value",(data)=>{
            if(State.private.custom != data.val()) loadCustom();
            State.private.custom = data.val();
            console.log('got new data from fb');
            // loadCustom();
            // console.log(data.val());
            // console.log(State.private.fb);
        });

        setTimeout(loadCustom,1000);



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