/**
 * 
 * @author user
 */
define('OwnersView', ['orm', 'forms', 'rpc'], function (Orm, Forms, Rpc, ModuleName) {
    function module_constructor() {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);

        self.show = function () {
            form.show();
            model.owners.params.pattern = "%%";
            model.requery(function () {});
        };

        /**
         * Search button click event handler.
         * @param event Event object
         */
        form.btnSearch.onActionPerformed = function (event) {
            model.owners.params.pattern = "%" + form.txtSearch.text + "%";
            model.owners.requery(function () {});
        };

        form.modelGrid.onMouseClicked = function (event) {
            if (event.clickCount > 1) {
                require('OwnerView', function (OwnerView) {
                    var ownerView = new OwnerView(model);
                    ownerView.showModal();
                });
            }
        };

        /**
         * Add button's click event handler.
         * @param event Event object
         */
        form.btnAdd.onActionPerformed = function (event) {
            require('OwnerView', function (OwnerView) {
                var owner = {};
                model.owners.push(owner);
                var ownerView = new OwnerView(model, function () {
                    if (!ownerView.isEdited()) {
                        model.owners.remove(owner);
                    }
                });
                ownerView.showModal();
            });
        };

        /**
         * Delete button's click event handler.
         * @param event Event object
         */
        form.btnDelete.onActionPerformed = function (event) {
            if (confirm("Delete  selected owners?")) {
                model.owners.remove(form.modelGrid.selected);
                model.save(function () {});
            }
        };

        form.btnReport.onActionPerformed = function (event) {
            var reportProxy = new Rpc.Proxy('OwnersReport');
            reportProxy.execute(function (report) {
                report.show();
            });
        };

        form.onWindowClosing = function (event) {
            if (model.modified && confirm("Save changes ?")) {
                model.save(function () {});
            }
        };
        form.btnSave.onActionPerformed = function (event) {
            if (model.modified && confirm("Save changes ?")) {
                model.save(function () {});
            }
        };

        form.txtSearch.onActionPerformed = function (event) {
            form.btnSearch.onActionPerformed();
        };
    }
    return module_constructor;
});