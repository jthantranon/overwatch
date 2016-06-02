var Common = require('./public/js/common').getInstance();
    var dedent = Common.dedent;
var Data = require('./public/js/data');
var State = require('./lib/state').getInstance();

var Loader = require('./lib/loader').getInstance(launchReadout);

function launchReadout(){
    console.log(dedent`.
        . ${Data.breaker.equal}
        .   Overwatch Server v${State.public.meta.package.version}
        .   Created & Maintained By: John.Thantranon
        .   Running on NodeJS ${process.version}
        . ${Data.breaker.equal}
        . 
        .   "Hello, Dave. You're looking well today..."
        . 
        . ${Data.breaker.equal}
            Initializing Module Loader. Standby...
        . ${Data.breaker.equal}
    `);
    // State.mods = Loader.mods;
    start();
}

function start(){
    //State.mods.maps.api.create({
    //    name: 'End of Time',
    //    size: '3',
    //    mapClass: 'Universe'
    //});
    //State.mods.entities.api.create({
    //    name: 'Test Entity'
    //});
    //State.mods.resources.api.create();
    //State.mods.resources.api.create();
    //State.mods.resources.api.create();
    //State.mods.resources.api.create({
    //    name: 'Test Resource',
    //    loc: {
    //        eon: 'EndOfTime002',
    //        coords: {
    //            r: 1,
    //            c: 1
    //        }
    //    }
    //});
    //State.mods.users.api.create({
    //    name: 'JFT',
    //    loc: {
    //        eon: 'EndOfTime',
    //        coords: {
    //            r: 2,
    //            c: 2
    //        }
    //    }
    //});
    //State.mods.entities.api.actionRouter({
    //    eon: 'TestResource',
    //    action: 'harvest',
    //    type0: 'resources'
    //});
    //State.mods.containers.api.create({
    //    name: 'Stone Quarry'
    //});
    //State.mods.containers.api.create();
    //State.mods.containers.api.create();
    //State.mods.containers.api.create();
    setTimeout(() => {
        State.mods.socks.emit('FullState',State);
    },1000);

    //console.log(State.mods.maps.api.retrieve.byEON('EndOfTime'));
}
// launchReadout();



