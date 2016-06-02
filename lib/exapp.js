/**
 * Created by john.thantranon on 3/18/2016.
 */
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var State = require('./state').getInstance();
var Config = require('./config').getInstance();

module.exports = (function () {
    var instance;

    function init(modName) {
        var port = Config.server.port;
        app.use('/', express.static('public'));
        app.use('/node_modules', express.static('node_modules'));
        app.use('/views', express.static('views'));
        app.get('/', function(req, res){
                res.sendFile(path.join(__dirname, '../public','index.html'));
        });
        http.listen(port, function(){
            State.modStatus[modName] = true;
        });

        return {
            getPort: function(){
                return port;
            },
            getHttp: function(){
                return http;
            }
        };
    }

    return {
        getInstance: function (modName) {
            if ( !instance ) { instance = init(modName); }
            return instance;
        }
    };
})();