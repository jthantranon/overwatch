/**
 * Created by john.thantranon on 3/18/2016.
 */

var Helpers = require('./helpers').getInstance();
// var Maps =    require('./maps'   ).getInstance();
module.exports = (function () {
    var instance;
    function init() {
        return {
            public: {
                meta: {
                    package: Helpers.tools.getFile('package','./'),
                    node: {
                        versions: process.versions
                    },
                    eden: {
                        uptime: Date.now()
                    },
                    test: {

                    }
                }
            },
            private: {
                // custom: Helpers.tools.getFile('custom'),
                fbinit: Helpers.tools.getFile('edenoverwatch-43b4eeff33a6'),
                playerMeta: [
                    {
                        btag: 'JFTActual#1112',
                        name: 'John T',
                        tags: ['JFT Friends','Gamblit','Winky']

                    },
                    {
                        btag: 'Fortytwo#1991',
                        name: 'Maanas',
                        tags: ['JFT Friends','Winky']
                    },
                    {
                        btag: 'Oush#1280',
                        name: 'Mark',
                        tags: ['JFT Friends','Winky']
                    },
                    {
                        btag: 'Danzro#1740',
                        name: 'Dan',
                        tags: ['JFT Friends','Winky']
                    },
                    {
                        btag: 'GregerousRex#1504',
                        name: 'Greg',
                        tags: ['JFT Friends','Winky']
                    },
                    {
                        btag: 'kcthebrewer#1131',
                        name: 'Casey B.',
                        tags: ['JFT Friends','Winky']
                    },
                    {
                        btag: 'Oafkad#1958',
                        name: 'Mike',
                        tags: ['JFT Friends','Gamblit']
                    },
                    {
                        btag: 'MadProphet#1298',
                        name: 'Edvard',
                        tags: ['JFT Friends','Gamblit']
                    },
                    {
                        btag: 'Kalialla#1530',
                        name: 'Kalialla',
                        tags: ['JFT Friends','Winky']
                    },
                    {
                        btag: 'Bijan711#1230',
                        name: 'Anthony',
                        tags: ['JFT Friends','Gamblit','Winky']
                    },
                    {
                        btag: 'PvtFett#1432',
                        name: 'Randy',
                        tags: ['JFT Friends','Gamblit']
                    },
                    {
                        btag: 'philoni#1112',
                        name: 'Casey',
                        tags: ['JFT Friends','Winky']
                    },
                    {
                        btag: 'whickerwov#1474',
                        name: 'Dirk',
                        tags: ['JFT Friends','Gamblit']
                    },
                    {
                        btag: 'Fluffington#1184',
                        name: 'Zach F.',
                        tags: ['JFT Friends','Gamblit']
                    },
                    {
                        btag: 'DahBunneh#1802',
                        name: 'Carlos G.',
                        tags: ['JFT Friends','Gamblit']
                    },
                    {
                        btag: 'moosecat#1447',
                        name: 'Liz',
                        tags: ['JFT Friends','Gamblit']
                    },
                    {
                        btag: 'Dimethod#1423',
                        name: 'Richard',
                        tags: ['JFT Friends','Gamblit']
                    },
                    {
                        btag: 'moortus#1658',
                        name: 'Carlos S.',
                        tags: ['JFT Friends','Gamblit']
                    },
                    {
                        btag: 'Catawracked#1752',
                        name: 'Chris K.',
                        tags: ['JFT Friends','Winky']
                    },
                    {
                        btag: 'Yodi#1241',
                        name: 'Peter G.',
                        tags: ['JFT Friends','Winky']
                    }
                ]
            },
            tools: Helpers.tools,
            modStatus: {},
            mods: {},
            fullUpdate: () => {
                if(this.mods && this.mods.socks) State.mods.socks.fullStateUpdate();
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