/**
 * Created by john.thantranon on 3/18/2016.
 */
// var State = require('./lib/state').getInstance();
var State;
var fs = require('fs');

module.exports = (function () {
    var instance;

    function init() {
        var data = {path:{}};
        var map = {};

        var tools = {
            convertBT: (btag,newDelim)=>{
                var newBT;
                var delims = ['-','#','%23'];
                for(var i in delims){
                    var delim = delims[i];
                    newBT = btag.replace(delim,newDelim);
                    if(newBT.indexOf(newDelim) > -1) return newBT;
                    // console.log(newBT,btag,delim,newDelim);
                }

                // return newBT;
            },
            pickobject: (obj) => {
                return chance.pickone(Object.keys(obj));
            },
            getFile: function(name,ovPath,ovExt){
                console.log('Getting File',name);
                var path = ovPath || './json/';
                var ext  = ovExt  || '.json';
                var fileName = name + ext;

                var _file  = path + fileName,
                    _file2 = '../json/' + fileName,
                    _file3 = '../../json/' + fileName,
                    _file4 = '../' + fileName,
                    _file5 = '../../' + fileName,
                    _file6 = './' + fileName;
                var file = null;
                function logIt(){
                    console.log('>>> ' + name.toUpperCase() + '.JSON LOADED <<<');
                }
                //console.log(_file);
                try{
                    file = JSON.parse(fs.readFileSync(_file, 'utf8'));
                    logIt();
                } catch(err){
                    //console.log(_file2);
                    try{
                        file = JSON.parse(fs.readFileSync(_file2, 'utf8'));
                        logIt();
                    } catch(err){
                        //console.log(_file3);
                        try{
                            file = JSON.parse(fs.readFileSync(_file3, 'utf8'));
                            logIt();
                        } catch(err){
                            try{
                                file = JSON.parse(fs.readFileSync(_file4, 'utf8'));
                                logIt();
                            } catch(err){
                                try{
                                    file = JSON.parse(fs.readFileSync(_file5, 'utf8'));
                                    logIt();
                                } catch(err){
                                    try{
                                        file = JSON.parse(fs.readFileSync(_file6, 'utf8'));
                                        logIt();
                                    } catch(err){
                                        console.log(err);
                                        file =  {};
                                    }
                                }
                            }
                        }
                    }
                }
                return file;
            },
            getLeaves: (tree) => {
                var raws = [];

                function drill(next){
                    var branch = next || tree;
                    for(var i in branch){
                        var res = branch[i];
                        if(res){
                            drill(res);
                        } else {
                            raws.push(i);
                        }

                    }
                }
                drill();
                return raws;
            },
            getLeafPath: (res,tree) => {
                function drillType(type,branch,level){
                    function cleanUp(level){
                        var start = level+1;
                        var end = Object.keys(data.path).length-1;
                        //console.log('clean',start,end);
                        for(var i = start; i <= end; i++){
                            delete data.path['level'+i];
                        }
                        //console.log(data);
                    }

                    var level = level || 0;
                    var branch = branch || tree;
                    var branchArray = Object.keys(branch);
                    var checkLevel = branchArray.indexOf(type);
                    if(checkLevel < 0){
                        for(var iNewBranch in branch){
                            if(level === 0) data.path = {};
                            data.path['level'+level] = iNewBranch;
                            if(iNewBranch === type) break;
                            var newBranch = branch[iNewBranch];
                            if(!newBranch) return;
                            level++;
                            drillType(type,newBranch,level);
                            level--;
                        }
                    } else {
                        data.path['level'+level] = type;
                        cleanUp(level);
                        map[type] = data;
                        data = {path:{}};
                        return;
                    }
                }
                drillType(res);
                if(!map[res]) return;
                map[res].invertedPath = tools.invertKV(map[res].path);
                return map[res];
            },
            getBranch: (res,tree) => {
                var path = tools.getLeafPath(res,tree).path;
                var returnMe;
                for(var i in path){
                    var level = path[i];
                    returnMe = returnMe ? returnMe[level] : tree[level];
                }
                return returnMe;
            },
            invertKV: (obj) => {
                var inverted = {};
                for(var prop in obj){
                    if(obj.hasOwnProperty(prop)){
                        inverted[obj[prop]] = prop;
                    }
                }
                return inverted;

            }

            /// end of tools
            
        };
        return {
            tools: tools,
            echo: 'pong'
        };
    }

    return {
        getInstance: function () {
            if ( !instance ) {
                instance = init();
                setTimeout(() => { // TODO: Does this cause problems?
                    State = require('./state').getInstance();
                },100)
            }
            return instance;
        }
    };
})();//.getInstance();