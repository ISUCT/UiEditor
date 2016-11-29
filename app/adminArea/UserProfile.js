/**
 * 
 * @author jskonst
 */
define('UserProfile', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
    function module_constructor(aModel, onClose) {
        var self = this
                ,  model = aModel
                , form = Forms.loadForm(ModuleName, model);
        var user = model.userProfiles.cursor;
        
        self.show = function () {
            form.show();
        };
        
          self.showModal = function () {
            form.modelFormattedField.data =  user;
            form.modelFormattedField.field = 'surname';
            form.showModal();
        };
        
        // TODO : place your code here
        
        model.requery(function () {
            // TODO : place your code here
        });
        
    }
    return module_constructor;
});
