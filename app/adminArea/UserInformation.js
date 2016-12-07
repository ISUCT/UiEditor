/**
 * 
 * @author h
 */
define('UserInformation', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
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
        
        form.btnOK.onActionPerformed = function() {
            model.save();
        }
    }
    return module_constructor;
});
