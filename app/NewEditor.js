/**
 * 
 * @author jskonst
 */
define('NewEditor', ['orm', 'forms', 'ui', 'resource', 'invoke', 'forms/box-pane']
        , function (Orm, Forms, Ui, Resource, Invoke, BoxPane, ModuleName) {
            function module_constructor() {
                var self = this
                        , model = Orm.loadModel(ModuleName)
                        , form = Forms.loadForm(ModuleName, model);
                var templatesType = 148110482119900;
                var formsType = 148110477451500;
                model.templatesByTypes.params.type = templatesType;
                /*
                 var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                 svg.setAttribute('width', form.pnlCanvas.width);
                 svg.setAttribute('height', form.pnlCanvas.height);
                 svg.setAttribute('viewBox', "0 0" + form.pnlCanvas.width * 2 + " " + form.pnlCanvas.height * 2);
                 //form.pnlHtml.element.innerHTML = '<img src="app/resources/uiElements/g3493.png">';
                 //var draw = SVG(form.pnlCanvas.element).size('100%', '100%');
                 //var rect = draw.rect(100, 100).attr({fill: '#f02'});
                 //var use = draw.use(rect, 'app/resources/templates/drawing.svg')
                 form.pnlCanvas.element.appendChild(svg);
                 var s = Snap(svg);
                 Snap.load("app/resources/templates/tmp.svg", function (f) {
                 //        Snap.load("app/resources/templates/bow1.svg", function (f) {
                 console.log(svg);
                 var g = f.select("g");
                 s.append(g);
                 g.drag();
                 });
                 */

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
                    form.view.showOn(document.getElementById('Main'));
                    Invoke.later(function () {
                        form.pnlCanvas.element.innerHTML = '<iframe src="app/editor/svg-editor.html?extensions=ext-xdomain-messaging.js' +
                                //window.location.href.replace(/\?(.*)$/, '&$1') + // Append arguments to this file onto the iframe
                                '" width="' + form.pnlCanvas.element.offsetWidth + 'px" height="'
                                + form.pnlCanvas.element.offsetHeight + 'px" id="svgedit" onload="initEmbed();"></iframe>'
                    });
                };

                model.requery(function () {
                    console.log(model.templatesByTypes);
                    for (var i in model.templatesByTypes) {
                        var demoContainer = new BoxPane(Ui.Orientation.VERTICAL);
                        demoContainer.height = 40;
                        form.panel1.add(demoContainer);
                        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svg.setAttribute('width', demoContainer.element.offsetWidth);
                        svg.setAttribute('height', demoContainer.height);
                        svg.setAttribute('viewBox', "0 0 " + 185 + " " + 70);
                        svg.setAttribute('preserveAspectRatio', "xMinYMin meet");
                        demoContainer.element.appendChild(svg);
                        var snap = Snap(svg);
                        
                        Snap.load(model.templatesByTypes[i].link, function (f) {
                            //console.log(svg);
                            //var g = f.select("g");
                            this.append(f);
                        },snap);
                    }
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