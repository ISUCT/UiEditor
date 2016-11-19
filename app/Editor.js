/**
 * 
 * @author jskonst
 */
define('Editor', ['orm', 'forms', 'ui', 'resource'], function (Orm, Forms, Ui, Resource, ModuleName) {
    function module_constructor() {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);


        var draw = SVG(form.pnlCanvas.element).size('100%', '100%');
        //var rect = draw.rect(100, 100).attr({fill: '#f02'});
        //var use = draw.use(rect, 'app/resources/templates/drawing.svg')

//
//        var object = document.createElement("object");
//        object.type = "image/svg+xml";
//        object.data = "app/resources/templates/drawing.svg";
        // на кнопке изготовить - проверку 5
        // проверить фон у svg
        // вращение по правой кнопке мыши
        // текст
        // не вылезать за границу - выход - маскировать
        // 


        self.show = function () {
            form.show();
        };

        // TODO : place your code here

        model.requery(function () {
            // TODO : place your code here
        });

        form.btnAddTemplate.onActionPerformed = function () {
//            console.log(draw);
//            console.log(object);
        Resource.loadText('resources/templates/bow1.svg', function (aLoaded) {
            var store = draw.svg(aLoaded);
        }, function (e) {
            console.log("bad");
        });


        }

    }
    return module_constructor;
});
