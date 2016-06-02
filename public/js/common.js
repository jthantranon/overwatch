/**
 * Created by john.thantranon on 3/8/2016.
 */
var COMMON = (function () {
    var instance;

    function init() {
        function dedent(strings) {
            var values = Array.prototype.slice.call(arguments, 1);
            var output = [];
            for (var i = 0; i < values.length; i++) {
                output.push(strings[i] + values[i]);
            }

            output.push(strings[values.length]);

            var lines = output.join('').split('\n');
            if (lines[0] === '.') {
                lines.shift();
            }

            return lines.map(function(line) {
                return line.replace(/^\s*\. |/gm, '');
            }).join('\n');
        }

        var tools = {

        };

        return {
            dedent: dedent,
            tools: tools
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

try {
    module.exports = COMMON;
} catch(err){
    // console.error(err);
}