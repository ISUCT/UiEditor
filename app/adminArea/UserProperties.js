/**
 * 
 * @author h
 */
define('UserProperties', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
    function module_constructor() {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);
        
        self.show = function () {
            form.show();
        };
        
        // TODO : place your code here
        
        model.requery(function () {
            // TODO : place your code here
        });
        
        
        form.btnSave.onActionPerformed = function (event) {
            if (model.modified) {
            var message = validate();
            if (!message) {
                model.save(function () {
                    callback();
                }, function () {
                    P.Logger.Info("Failed on save");
                });
                form.close();
            } else {
                alert(message);
            }
        } else {
            form.close();
        }
        };
        
        form.btnCancel.onActionPerformed = function (event) {  
            form.close();
        };
        
        
        
    }
    return module_constructor;
});
