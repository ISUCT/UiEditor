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

        function save() {
            model.save();
        }

        form.btnSave.onActionPerformed = save;

        form.btnDelete.onActionPerformed = function () {
            if (confirm("Удалить?")) {
                model.allTexts.remove(form.modelGrid.selected);
            }
        };

        form.btnAdd.onActionPerformed = function () {
            model.texts.push({});
        };

        form.btnEdit.onActionPerformed = function () {
            require('TextEditor', function (TextEditor) {
                var textEdit = new TextEditor(model.allTexts.cursor, save);
                textEdit.show();
            });
        };

        form.btnPreview.onActionPerformed = function () {
            require('TextView', function (TextView) {
                var txtView = new TextView(model.allTexts.cursor);
                txtView.show();
            });
        };


    }
    return module_constructor;
});
