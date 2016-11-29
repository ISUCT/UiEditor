/**
 * @stateless
 * @public
 */
define('OwnersReport', ['orm', 'template'], function (Orm, loadTemplate, ModuleName) {
    function module_constructor() {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , template = loadTemplate(ModuleName, model);
        
        self.execute = function (onSuccess, onFailure) {
            model.ownersQuery.params.pattern = "%%";
            model.requery(function () {
                var report = template.generateReport();
                // report.show(); | report.print(); | var savedTo = report.save(saveTo ?);
                onSuccess(report);
            }, onFailure);
            
        };
    }
    return module_constructor;
});