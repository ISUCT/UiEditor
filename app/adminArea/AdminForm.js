/**
 * 
 * @author h
 */
define('AdminForm', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
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
        
        
        
        form.button.onActionPerformed = function(event) {
            var userProfiles = new UserProfiles();
            userProfiles.show();
        };
        
        form.btnUserProperties.onActionPerformed = function (event) {
            var userProperties = new UserProperties();
            userProperties.show();
        };
        
        form.btnUserInformation.onActionPerformed = function(event){
            var userInformation = new UserInformation();
            userInformation.show();
        };
        
        form.btnTemplateTypes.onActionPerformed = function(event){
            var templateTypes = new TemplateTypes();
            templateTypes.show();
        }
        
        form.btnTemplates.onActionPerformed = function(event) {
            var templates = new Templates();
            templates.show();
        }
    } 
    return module_constructor;
});
