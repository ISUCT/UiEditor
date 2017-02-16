/**
 * 
 * @author h
 * @rolesAllowed admin
 */
define('AdminForm', ['orm', 'forms', 'ui', 'Templates', 'UserProfiles', 'TextAdmin', 'UsersWorks']
        , function (Orm, Forms, Ui, Templates, UserProfiles, TextEditor, UsersWorks, ModuleName) {
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
                };

                form.btnTextEdit.onActionPerformed = function (event) {
                    var txtEdit = new TextEditor();
                    txtEdit.show();
                };
                
                form.btnWorks.onActionPerformed = function (event) {
                    var works = new UsersWorks();
                    works.show();
                };

            }
            return module_constructor;
        });
