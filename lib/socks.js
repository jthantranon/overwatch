/**
 * Created by john.thantranon on 3/18/2016.
 */
var State = require('./state.js').getInstance();
var http = require('./exapp.js').getInstance().getHttp();
var io = require('socket.io')(http);

module.exports = (function () {
    var instance;

    function init() {
        io.on('connection', (socket) => {
            function logIt(){
                if(State.modStatus._complete){
                    console.log(socket.client.request.headers.host,socket.client.request.headers['user-agent'],' - connected.');
                } else {
                    setTimeout(logIt,1000);
                }
            }
            logIt();

            var on = {
                create: {},
                action: (msg) => {
                    console.log(msg);
                    var source = State.private.concepts[msg.source.eon];
                    var target = State.private.concepts[msg.target.eon];
                    source.api.actions[msg.action]({
                        target: target,
                        inputs: msg.inputs
                    },() => {
                        socket.emit('FullState',State);
                    });
                    // console.log(source);
                },
                UpdateAll: () => {
                    State.updateAll();
                },
                AddTag: (data) => {
                    console.log('addtag',data);
                    State.addBT(data);
                },
                AddGroup: (data) => {
                    console.log('addgroup',data);
                    State.addGroup(data);
                }
            };



            socket.on('Action', on.action);
            socket.on('UpdateAll', on.UpdateAll);
            socket.on('AddTag', on.AddTag);
            socket.on('AddGroup', on.AddGroup);
            socket.emit('Connected');
            socket.emit('FullState',State);
        });

        State.modStatus.socks = true;
        State.newFullUpdate = () => {
            io.emit('FullState',State);
        };
        return {
            emit: (type,msg) => {
                console.log('emit',type);
                io.emit(type,msg);
            },
            fullStateUpdate: () => {
                io.emit('FullState',State);
            }
        };
    }

    return {
        getInstance: function () {
            if ( !instance ) { instance = init(); }
            return instance;
        }
    };
})();