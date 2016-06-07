/**
 * Created by john.thantranon on 3/18/2016.
 */

var http = require('http');
var https = require('https');
var State = require('./state.js').getInstance();

var firebase = require('firebase');

var config = {
    serviceAccount: {
        "type": "service_account",
        "project_id": "edenoverwatch",
        "private_key_id": "43b4eeff33a62b883869c02b014d6fed026c8e06",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCLF3F0+Aq7yPwj\nBONcLO43DMDR8qm0NEH1YJlwpgZetbhQIKKPgI7482v7zOx5BPha0IQxm3K+mQe2\ngdVTLGdnD+T+VDCF1jotU8WrDKzCq0XPYPxkUMIM1w7x5Baq4MAWZWpQAmJbEWZa\nUR92bsO9J9zWJnIEBDgQG2gApMp8mPetJGaj1qarAke7XI0MaFv1BaGgiql9MEX0\nl8yZbvCzMNG7xUwB0eXowc/YhqIJmWMZmFjEaJcsDpI8FSudkCr3UrdMBdJWI/eY\nsUY4MUyZCR+Sjv7wWo4W3YNOzVnMjetlLP+ATGPBK2EpbQYpx6pNoH6F+UCX3Jxb\nFXpy6SsNAgMBAAECggEAX8vAn4/qTJVLWo8WTDjBxHZrIu4fhXZsaySh6VzfjEFZ\n9Q3VCELBtaJpn93ujBcpOdrdARGQAMeC8WcQVp2BhhEDZUr0tGjsXqWQwZMUNWsi\nxIaGrkyUqaVArMar+fqbMZGdnAdYWGJufQvcQIRfGZsn1PJbmnqRZj6J7c+Riif8\n+cq1hpyKdgDl+ewEI0w1Ie9x0hiSIsvyWudE9Gpfwwvkbzim0hWCGd9QE7SfmR4N\nWuSTHqw7Fl4mPwHwLEAgYLeccehleS3aA0Jb4APyjMLsAS1A5PWZhWYo2HQ1FUQc\n3Ou1Od/wVmdQqhwxU+V193ueDtsxfh3Od2W5HdUYnQKBgQD+LWePznE/UdevxeC/\nRosZ6VtG9wvkaC5o5hTKbIF5q8/ODUi127cXkWUwp8EziK+/0Bx4uPAgkFSPrNdS\ntYlGwlYPrGIrYMyd9MmJuiNxxXm+0a9sBZa2rMnd9RJdqvAKsZh4ejem+mLXf5CS\nSZxJsKgUMvsaWLwD1pSl02Y3IwKBgQCMFsZU6XNZjUUAMtyoYkBrDmbNBBSCvS/6\nhYhqE2LsWYAWIus9WBY70BAbNMKTvT5hasm9pR/If1miYoxUhiIOEH7rb6zdzLge\nR8pRHAVphqxCWOfGT+SUvSDMCH1jVctlvwcn35HbnHU/5V/Q9qcn2KHs+olnGwI8\n6gBjWhtQDwKBgHAbwrPREG4nQQTMOGblTHEvVg0k5d/me6HU6ZKm7SynNU7i2REt\nScJhZMpjE3oRbcMinYw5teAHCOUeDRLz8wp8qMzc8afEWDvLPiE7Mmr5+MrLXZ49\nkM4dxCPb9i/ON3XgAyoQbf9+LJ50K2X6ha6S9m+CVPK39KWUvZeueEUVAoGAAVlK\nyZCB2s/gZTMYKsrfYeh+luS+KdAWgSv99z9+iVYHRK9LYojRlfvX29szMGb3DcsQ\nbDIFz1FilIysWzf7ZfVEs5GcsXoCH9CDIyrI5o40ZGMkwCUOx1vW0AAY7PbrgWxI\nblrZtaqY+meD96gYTerpDDYRUpvQ9rMuE8bPUoMCgYEAlZBN4ex/9+/s/c12WUhG\nb9G/smiXUXbvca+GLaDUgsjujsxlQWr++uuAnqUnqIKhrmlzU7pzGwmPKVUpe2H3\nkIj81xkXT813v6L6oV/am2kPtJtTFhDHmO9NdyEJVQyObezvS3FQXfpCjuUGkPae\nmesAyWxhV32hB4VQ1z+mw4s=\n-----END PRIVATE KEY-----\n",
        "client_email": "eoserver@edenoverwatch.iam.gserviceaccount.com",
        "client_id": "104888694031182493575",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/eoserver%40edenoverwatch.iam.gserviceaccount.com"
    },
    databaseURL: "https://edenoverwatch.firebaseio.com",
};
firebase.initializeApp(config);

var db = firebase.database();
var ref = db.ref("/data");

module.exports = (function () {
    var instance;
    var Data = {};

    function parseData(dat){
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
        // dat.data.player.realName = State.private.custom[State.tools.convertBT(dat.data.player.name,'-')] || dat.data.player.name.split('#')[0]; //nameMap[dat.data.player.name];
        // dat.data.player.tags = tagsMap[dat.data.player.name];
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
        Data[dat.data.player.name] = dat.data;
    }

    function init(modName) {
        function getSimple(url,type,single){
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
                        if(type === 'overwatch' && dat.data && dat.data.heroStats) parseData(dat);
                        if(single) single(dat);
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

        // var playerMeta = State.private.playerMeta;
        // var nameMap = {};
        // var tagsMap = {};
        // var tagsData = {};
        State.modStatus[modName] = true;

        function done(){
            var tagsData = {};
            for(var i in Data){
                var player = Data[i].player;
                var tags = State.private.tagsMap[player.name];
                Data[i].player.tags = State.private.tagsMap[player.name] || {};
                Data[i].player.realName = State.private.nameMap[player.name] || player.name.split('#')[0];
                if(tags && tags.indexOf('All') < 0) State.private.tagsMap[player.name].push('All');
                for(var j in tags){
                    var tag = tags[j];
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
            State.private.overwatch = Data;
            State.private.overwatchA = [];
            for(var i in Data){
                State.private.overwatchA.push(Data[i]);
            }
            State.newFullUpdate();
        }

        State.addBT = (obj)=>{
            var btag = obj.btag;
            obj.name = obj.name || obj.btag.split('#')[0];
            obj.tags = obj.tags || ['All'];
            ref.child(State.tools.convertBT(btag,'-')).set(obj);
        };

        State.getSingle = (obj) => {
            console.log(obj);
            var decodedTag = obj.btag.split('#')[0]+'%23'+obj.btag.split('#')[1];
            var search = 'https://api.watcher.gg/players/search/' + decodedTag;
            var update = 'https://api.watcher.gg/players/pc/us/' + decodedTag + '/refresh';
            var overwatch = 'https://api.watcher.gg/players/pc/us/' + decodedTag;

            function finished(dat){
                var hasData = dat.data && dat.data.heroStats || false;
                if(hasData){
                    console.log(dat.data.player.name,'loaded!');
                    done();
                } else {
                    console.log('no data found');
                }
            }

            function getUpdate(){
                getSimple(update,'update',getOverwatch);
            }

            function getOverwatch(){
                getSimple(overwatch,'overwatch',finished);
            }

            getSimple(search,'search',getUpdate);
        };

        ref.once("value",(data)=>{
            console.log('loading new data...');
            var dat = data.val();
            for(var i in dat){
                var player = dat[i];

                dat[i].tags = dat[i].tags || [];
                if(player.tags.indexOf('All') < 0) dat[i].tags.push('All');

                dat[i].name = dat[i].name || dat[i].btag.split('#')[0];
            }
            ref.set(dat);
        });

        ref.on("value",(data)=>{
            console.log('loading new data...');
            var dat = data.val();
            for(var i in dat){
                var player = dat[i];
                State.getSingle(player);
                State.private.nameMap = State.private.nameMap || {};
                State.private.nameMap[player.btag] = player.name;
                State.private.tagsMap = State.private.tagsMap || {};
                State.private.tagsMap[player.btag] = player.tags;

            }
            State.private.custom = dat;
        });

        State.addGroup = (obj) => {
            console.log(obj);
            if(State.private.overwatch[obj.btag].player.tags.indexOf(obj.group) < 0) State.private.overwatch[obj.btag].player.tags.push(obj.group);
            ref.child(State.tools.convertBT(obj.btag,'-')).child('tags').set(State.private.overwatch[obj.btag].player.tags);
        };

        return {};
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