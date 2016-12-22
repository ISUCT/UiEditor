/**
 * 
 * @author jskonst
 * @rolesAllowed admin
 */
define('Users', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
    function module_constructor() {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);

        self.show = function () {
            form.show();
        };

        model.requery(function () {
            console.log("Requery");
        });

        form.btnSave.onActionPerformed = function () {
            model.save();
        };

        form.btnAdd.onActionPerformed = function () {
            model.users.push({});
        };

        form.btnDelete.onActionPerformed = function () {
            if (confirm("Удалить?")) {
                model.users.remove(form.modelGrid.selected);
            }
        };



    }
    return module_constructor;
});
