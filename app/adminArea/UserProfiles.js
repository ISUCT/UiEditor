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


//        form.modelGrid.onMouseClicked = function (event) {
//            if (event.clickCount > 1) {
//                require('UserProfile', function (UserProfile) {
//                    var userView = new UserProfile(model);
//                    userView.showModal();
//                });
//            }
//        };


    }
    return module_constructor;
});
