/**
 * Created by JFTActual on 5/23/2016.
 */
function test() {
    console.log(arguments);
}

test('hey','yo','wee');

console.log(process.env.TEST);

function stuff(thing){
    thing.wee = 'woo';
}

var that = {};
that.who = 'me';
stuff(that);
console.log(that);