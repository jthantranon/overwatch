/**
 * Created by john.thantranon on 3/18/2016.
 */
module.exports = (function () {
    var instance;

    function init() {
        var server = {
            port: 3232
        };

        return {
            server: server
        };
    }

    return {
        getInstance: function () {
            if ( !instance ) {
                instance = init();
            }
            return instance;
        }
    };
})();//.getInstance();