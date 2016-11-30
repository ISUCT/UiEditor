/**
 * 
 * @author jskonst
 */
define('Editor', ['orm', 'forms', 'ui', 'resource'], function (Orm, Forms, Ui, Resource, ModuleName) {
    function module_constructor() {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('width', form.pnlCanvas.width);
        svg.setAttribute('height', form.pnlCanvas.height);
        svg.setAttribute('viewBox', "0 0" + form.pnlCanvas.width + " " + form.pnlCanvas.height);

        //var draw = SVG(form.pnlCanvas.element).size('100%', '100%');
        //var rect = draw.rect(100, 100).attr({fill: '#f02'});
        //var use = draw.use(rect, 'app/resources/templates/drawing.svg')
        form.pnlCanvas.element.appendChild(svg);
        var s = Snap(svg);
//        Snap.load("app/resources/uiElements/make.svg", function (f) {
        Snap.load("app/resources/templates/bow1.svg", function (f) {
            console.log(svg);
            var g = f.select("g");
            s.append(g);
            g.drag();
        });

//var object = document.createElement("object");
//        object.type = "image/svg+xml";
//        object.data = "app/resources/templates/drawing.svg";

        //form.btnBake.element.innerHtml = '<img src="app/resources/uiElements/make.svg"/>';
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

//                var store = draw.svg(aLoaded);


//
//                form.btnBake.element.innerHTML = '<img src="app/resources/uiElements/make.svg" viewBox="0 0 10 10" />';
            }, function (e) {
                console.log("bad");
            });


        }

    }
    return module_constructor;
});
