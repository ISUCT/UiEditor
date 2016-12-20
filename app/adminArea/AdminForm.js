/**
 * 
 * @author h
 * @rolesAllowed admin
 */
define('AdminForm', ['orm', 'forms', 'ui', 'Templates', 'UserProfiles']
        , function (Orm, Forms, Ui, Templates, UserProfiles, ModuleName) {
            function module_constructor() {
                var self = this
                        , model = Orm.loadModel(ModuleName)
                        , form = Forms.loadForm(ModuleName, model);

                self.show = function () {
                    form.show();
                };
                self.showModal = function () {
                    form.showModal();
                };
                // TODO : place your code here

                model.requery(function () {
                    // TODO : place your code here
                });

                form.btnProfiles.onActionPerformed = function (event) {
                    var userProfiles = new UserProfiles();
                    userProfiles.show();
                };

                form.btnTemplates.onActionPerformed = function (event) {
                    var templates = new Templates();
                    templates.show();
                }
            }
            return module_constructor;
        });
