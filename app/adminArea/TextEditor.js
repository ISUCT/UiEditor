/**
 * 
 * @author jskonst
 */
define('TextEditor', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
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
            require('TextView', function (TextView) {
                var templ = new TextView(form.htmlArea.value);
                templ.show();
            });
        };

    }
    return module_constructor;
});
