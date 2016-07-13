/**
 * Created by john.thantranon on 3/18/2016.
 */

var http = require('http');
var https = require('https');
// var State = require('./state.js').getInstance();

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
var ref = db.ref("/main");

var instance;
var Data = {};

function extraStats(container){
    container.gamesUp = (container.gamesWon - (container.gamesPlayed/2))*2;
    container.kdr = container.finalBlows/container.deaths;
    container.edr = container.eliminations/container.deaths;
    container.killsUp = container.finalBlows - container.deaths;
    container.elimsUp = container.eliminations - container.deaths;
    container.elimsUp2 = container.eliminations - (container.deaths*2);
    container.winPercentage = container.gamesWon/container.gamesPlayed;
    container.avgGold = container.medalsGold / container.gamesPlayed;
    container.avgSilver = container.medalsSilver / container.gamesPlayed;
    container.avgBronze = container.medalsBronze / container.gamesPlayed;
    container.avgMedal = (container.medalsGold + container.medalsSilver + container.medalsBronze) / container.gamesPlayed;
}

function parseData(dat){
    var timePlayed = 0;
    var bestWinP = 0;
    var bestMinWinP = 0;
    for(var i in dat.data.heroStats){
        var hero = dat.data.heroStats[i];
        var winP = hero.gamesWon / hero.gamesPlayed;
        extraStats(dat.data.heroStats[i]);
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
            if((hero.gamesPlayed >= 15) && (winP > bestWinP)){
                dat.data.hasMin = true;
                dat.data.bestWinP = hero.name;
                dat.data.bestWinPP = winP;
                dat.data.bestWinPData = hero;
                bestWinP = winP;
            } else if(!dat.data.hasMin && (hero.gamesPlayed >= 5) && (winP > bestMinWinP)) {
                dat.data.hasMin = false;
                dat.data.bestWinP = hero.name;
                dat.data.bestWinPP = winP;
                dat.data.bestWinPData = hero;
                bestMinWinP = winP;
            }
        }
    }
    Data[dat.data.player.name] = dat.data;
}

var renames = {
    'Torbj&#xF6;rn': 'Torbjoern',
    'L&#xFA;cio': 'Lucio',
    'Soldier: 76': 'Soldier76',
    'D.Va': 'DVa'
};

function statify(str){
    return typeof str === 'string' ? parseInt(str.replace(/,/g, "")) : str;
}

function derive(dat){
    var deaths = statify(dat.Deaths),
        gamesWon = statify(dat.GamesWon),
        gamesPlayed = statify(dat.GamesPlayed),
        gamesLost = gamesPlayed - gamesWon,
        finalBlows = statify(dat.FinalBlows),
        bronze = statify(dat['Medals-Bronze']),
        silver = statify(dat['Medals-Silver']),
        gold = statify(dat['Medals-Gold']),
        medals = statify(dat.Medals);

    if(deaths > 0){
        dat._edr = statify(dat.Eliminations) / deaths;
        dat._kdr = finalBlows / deaths;
    }
    dat._win = gamesWon / gamesPlayed;
    dat._gamesLost = gamesLost;
    dat._winsOff = gamesWon - gamesLost;
    dat._blowsOff = finalBlows - deaths;
    dat._averageBronze = bronze / gamesPlayed;
    dat._averageSilver = silver / gamesPlayed;
    dat._averageGold = gold / gamesPlayed;
    dat._averageMedals = medals / gamesPlayed;

    return dat;
}

function getSimple(battletag,meta){
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
                if(meta.type === 'profile'){
                    console.log(battletag,dat.data);
                    dat.data.battletag = battletag;
                    ref.child(battletag).child(meta.type).set(dat.data);
                } else if(dat.GamesPlayed > 0){
                    console.log(battletag,meta,dat.GamesPlayed);
                    ///// clean data
                    ////////////////
                    for(var i in dat){
                        for(var j in renames){
                            if(i.indexOf(j) > -1){
                                dat[i.replace(j,renames[j])] = dat[i];
                                delete dat[i];
                            }
                        }
                    }
                    dat = derive(dat);
                    ref.child(battletag).child(meta.type).child(meta.hero).set(dat);
                } else {
                    getSimple(battletag,{
                        type: meta.type,
                        hero: 'All'
                    });
                    function getHero(j){
                        var hero = dat[j];
                        if(hero.GamesPlayed > 0){
                            var heroName = renames[hero.name] || hero.name;
                            getSimple(battletag,{
                                type: meta.type,
                                hero: heroName
                            });
                        }
                        setTimeout(()=>{
                            if(j < dat.length-1){
                                //j++;
                                getHero(j+1);
                            }
                        },1)
                    }
                    getHero(0);
                }
            }
        });
    }

    if(!meta){
        getSimple(battletag,{
            type: 'quick'
        });
        getSimple(battletag,{
            type: 'competitive'
        });
        getSimple(battletag,{
            type: 'profile'
        });
    } else {
        var urlBase = 'https://api.lootbox.eu/pc/us/' + battletag + '/';
        var urlPreType = urlBase + meta.type;
        var urlType = urlPreType + '-play/';

        var url;
        if(meta.hero){
            if(meta.hero === 'All'){
                url = urlType + 'allHeroes/'
            } else {
                url = urlType + 'hero' + '/' + meta.hero + '/';
            }

        } else if(meta.type === 'profile'){
            url = urlPreType;
        } else {
            url = urlType + 'heroes';
            // https.get(urlType + 'allHeroes', get).on('error', function(e){
            //     console.log(urlType,"Got an error: ", e);
            // });
        }

        //console.log(url);
        https.get(url, get).on('error', function(e){
            console.log(url,"Got an error: ", e);
        });
    }
}

//function getPlayerData(battletag){
//    getSimple('https://api.lootbox.eu/pc/us/'+battletag+'/competitive-play/heroes','competitiveHeroes',{
//        battletag: battletag
//    });
//}
getSimple('JFTActual-1112');
getSimple('MadProphet-1298');
getSimple('philoni-1112');
