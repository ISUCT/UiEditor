/**
 * 
 * @author jskonst
 */
define('UsersWorks', ['orm', 'forms', 'ui', 'resource'], function (Orm, Forms, Ui, Resource, ModuleName) {
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

        var dtFrom = new Date();
        dtFrom.setHours(0, 0, 0, 0);
        var dtTo = new Date();
        dtTo.setHours(23, 59, 59, 999);

        var interval = {
            fromTime: dtFrom,
            toTime: dtTo
        }

        form.mdtFrom.data = interval;
        form.mdtFrom.field = 'fromTime';
        form.mdtTo.data = interval;
        form.mdtTo.field = 'toTime';

        //model.allUsersWorks.params.published = true;
        model.allUsersWorks.params.timeFrom = interval.fromTime;
        model.allUsersWorks.params.timeTo = interval.toTime;

        form.mdtFrom.onValueChange = function () {
            //console.log(interval);
            model.allUsersWorks.params.timeFrom = interval.fromTime;
            model.requery();
        }
        form.mdtTo.onValueChange = function () {
            //console.log(interval);
            model.allUsersWorks.params.timeTo = interval.toTime;
            model.requery();
        }

        self.show = function () {
            form.show();
        };


        model.requery(function () {
            // TODO : place your code here
        });

        form.btnSave.onActionPerformed = function () {
            model.save();
        };

        form.btnDelete.onActionPerformed = function () {
            if (confirm("Удалить?")) {
                model.allUsersWorks.remove(form.modelGrid.selected);
            }
        };

        form.modelGrid.onItemSelected = function (event) {

            Resource.loadText(event.item.link, function (aLoaded) {
                svg.innerHTML = aLoaded;
                svg.viewBox.baseVal.width = svg.getBBox().width;
                svg.viewBox.baseVal.height = svg.getBBox().height;
            }, function (e) {
                console.log("bad");
            });
        };

        form.btnDownload.onActionPerformed = function () {
            if (form.modelGrid.selected) {
                var link = document.createElement('a');
                link.setAttribute('download', 'download');
                for (var i in form.modelGrid.selected) {
                    link.setAttribute("href", form.modelGrid.selected[i].link);
                    link.click();
                }
            }
        };

        form.pnlPreview.onComponentResized = function (evt) {
            svg.setAttribute('width', evt.source.element.offsetWidth);
            svg.setAttribute('height', evt.source.element.offsetHeight);
        };


    }
    return module_constructor;
});
