/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
        {
            appDir: "app",
            baseUrl: ".",
            paths: {
                environment: "../WEB-INF/classes/environment",
                orm: "../WEB-INF/classes/orm",
                logger: "../WEB-INF/classes/logger",
                forms: "../WEB-INF/classes/forms",
                ui: "../WEB-INF/classes/ui",
                rpc: "../WEB-INF/classes/rpc",
//                boxing: "../WEB-INF/classes/boxing",
//        managed: "../WEB-INF/classes/managed",
//        orderer: "../WEB-INF/classes/orderer",
//        'application-db-model': "../WEB-INF/classes/datamodel/application-db-model"

            },
            findNestedDependencies: false,
            modules: [
                {
                    name: "TestMain"
                    , exclude: ['environment','orm','forms','ui','logger','rpc']
//                    exclude: ["environment", "orm", "logger", "forms", "ui", "rpc"],
                }

            ],
            onBuildRead: function (moduleName, path, contents) {
                //Always return a value.
                //This is just a contrived example.
//                console.log(this);
//                if (this.platypusApiExcluded.indexOf(moduleName) > -1) {
                if (this.modules[0].exclude.indexOf(moduleName) > -1) {
                    return "define(function(){})";
                } else {
//                    if (!contents) {
//                        console.log(moduleName);
//                    }
                    return contents;
                }
            },
            dir: "../pethotelCompress/app"
        })
