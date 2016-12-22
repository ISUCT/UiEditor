/**
 * 
 * @author jskonst
 */
define('TextAdmin', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
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

        form.btnSave.onActionPerformed = function () {
            model.save();
        };

        form.btnDelete.onActionPerformed = function () {
            if (confirm("Удалить?")) {
                model.texts.remove(form.modelGrid.selected);
            }
        };
        form.btnAdd.onActionPerformed = function () {
                model.texts.push({});
        };


    }
    return module_constructor;
});
