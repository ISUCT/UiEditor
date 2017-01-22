/**
 * 
 * @author jskonst
 */
define('UserWorks', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
    function module_constructor(profile_id) {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('width', form.pnlPreview.width);
        svg.setAttribute('height', form.pnlPreview.height);
        svg.setAttribute('viewBox', "0 0 " + 185 + " " + 70);
        svg.setAttribute('preserveAspectRatio', "xMinYMin meet");
        form.pnlPreview.element.appendChild(svg);
        var snap = Snap(svg);

        model.allWorks.params.profile_id = profile_id;

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
                model.allWorks.remove(form.modelGrid.selected);
            }
        };

        form.modelGrid.onItemSelected = function (event) {
            snap.clear();
            svg.setAttribute('width', form.pnlPreview.element.offsetWidth);
            svg.setAttribute('height', form.pnlPreview.element.offsetHeight);
            Snap.load(event.item.link, function (f) {
                //console.log(svg);
                //var g = f.select("g");
                snap.append(f);
            });
        };




    }
    return module_constructor;
});
