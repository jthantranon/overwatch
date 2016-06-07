/**
 * Created by john.thantranon on 3/18/2016.
 */
var State = require('./state').getInstance();

module.exports = (function () {
    var instance;

    function init(launchReadout,TestMode) {
        var initStarted = {};
        var initMessage = {
            exapp: () => 'Express loaded and listening on *:' + State.mods.exapp.getPort()
        };
        var iLoad = 0;
        var modLoadOrder = [
            'exapp',
            'socks',
            'fetcher'
        ];
        if(TestMode){
            var removeThese = [
                'exapp',
                'socks',
                // 'prefabs'
            ];
            removeThese.push(TestMode);
            function removeMod(mod){
                var index = modLoadOrder.indexOf(mod);
                if(index > -1){
                    modLoadOrder.splice(index,1);
                }
            }
            for(var i in removeThese){
                var mod = removeThese[i];
                removeMod(mod);
            }
        }

        function restart(){
            setTimeout(start,25);
        }

        function start(){
            var cModPath = modLoadOrder[iLoad];
            if(!cModPath){
                done();
                return;
            }
            var cModNameArray = cModPath.split('/') || cModPath;
            var cModName = cModNameArray[cModNameArray.length-1];
            if(!initStarted[cModName]){
                process.stdout.write(modLoadOrder[iLoad].toUpperCase() + ' INITIALIZING >');
                try {
                    State.mods[cModName] = require('./' + cModPath).getInstance(cModName);
                    initStarted[cModName] = true;
                } catch (err) {
                    console.log('\n   ...' + cModName.toUpperCase() + ' initialization ERROR.');
                    console.log(err);
                    return;
                }
            }
            if(State.modStatus[cModName]){
                var xMsg = '';
                try {
                    xMsg = initMessage[cModName]();
                } catch (err) {}
                console.log('\n   ...' + cModName.toUpperCase() + ' INITIALIZED. ' + xMsg);
                iLoad++;
            } else {
                process.stdout.write('>');
            }

            restart();
        }

        function done(){
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
            console.log(' MODULE LOADING COMPLETED!');
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
            State.modStatus._complete = true;
            if(launchReadout) launchReadout();

        }

        start();

        return {
            // ...
        };
    }

    return {
        getInstance: function (launchReadout,TestMode) {
            if ( !instance ) {
                instance = init(launchReadout,TestMode);
            }
            return instance;
        }
    };
})();//.getInstance();