/**
 * 
 * @author jskonst
 * @rolesAllowed admin
 */
define('UserProfiles', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
    function module_constructor() {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);
//        model.userProfiles.params.userName = "%%";
        self.show = function () {
            form.show();
        };

        // TODO : place your code here

        model.requery(function () {
            // TODO : place your code here
        });


        form.btnSave.onActionPerformed = function () {
            model.save();
        };

        form.btnAdd.onActionPerformed = function () {
            model.profiles.push({});
        };

        form.btnDelete.onActionPerformed = function () {
            if (confirm("Удалить?")) {
                model.profiles.remove(form.modelGrid.selected);
            }
        };

        form.btnSearch.onActionPerformed = function () {
            model.userProfiles.params.userName = '%' + form.txtSearch.text + '%';
            model.requery(function () {
                console.log("Loaded");
            }, function (err) {
                console.log(err);
            });
            console.log("Start loading");

        };


        form.modelGrid.onMouseClicked = function (event) {
            var userProfile = event.source.selected[0];
            if (event.clickCount > 1) {
                require('UserWorks', function (UserWorks) {
                    if (userProfile.userprofile_id) {
                        var uw = new UserWorks(userProfile.userprofile_id);
                        uw.show();
                    }
                });
            }
        };


    }
    return module_constructor;
});
