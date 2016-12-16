/**
 * 
 * @author jskonst
 */
define('Editor', ['orm', 'forms', 'ui', 'resource', 'invoke', 'forms/box-pane']
        , function (Orm, Forms, Ui, Resource, Invoke, BoxPane, ModuleName) {
            function module_constructor() {
                var self = this
                        , model = Orm.loadModel(ModuleName)
                        , form = Forms.loadForm(ModuleName, model);
                var templatesType = 148181448228600;
//                var formsType = 148110477451500;
                model.templatesByTypes.params.type = templatesType;

                /**
                 * @rolesAllowed role2
                 */
                showAdmin = function () {
                    form.btnAdmin.visible = true;
                };
                showAdmin();
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


                svgCanvas = null;
                var frame;

                initEmbed = function () {
                    var doc, mainButton;
                    svgCanvas = new EmbeddedSVGEdit(frame);
                    // Hide main button, as we will be controlling new, load, save, etc. from the host document
                    doc = frame.contentDocument || frame.contentWindow.document;
                };

                self.show = function () {
                    form.view.showOn(document.getElementById('Main'));
                    Invoke.later(function () {
                        form.pnlCanvas.element.innerHTML = '<iframe src="app/editor/svg-editor.html?extensions=ext-xdomain-messaging.js' +
                                //window.location.href.replace(/\?(.*)$/, '&$1') + // Append arguments to this file onto the iframe
                                '" width="' + form.pnlCanvas.element.offsetWidth + 'px" height="'
                                + form.pnlCanvas.element.offsetHeight + 'px" id="svgedit" onload="initEmbed();"></iframe>'
                        frame = document.getElementById('svgedit');
                    });
                };

                var onPanelClick = function (event) {
                    svgCanvas.setSvgString(event.source.snap.toString());
                };

                model.requery(function () {
                    console.log(model.templatesByTypes);
                    for (var i in model.templatesByTypes) {
                        var demoContainer = new BoxPane(Ui.Orientation.VERTICAL);
                        demoContainer.height = 60;
                        demoContainer.onMousePressed = onPanelClick;
                        form.panel1.add(demoContainer);
                        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svg.setAttribute('width', demoContainer.element.offsetWidth);
                        svg.setAttribute('height', demoContainer.height);
                        svg.setAttribute('viewBox', "0 0 " + 185 + " " + 70);
                        svg.setAttribute('preserveAspectRatio', "xMinYMin meet");
                        demoContainer.element.appendChild(svg);
                        var snap = Snap(svg);
                        demoContainer.snap = snap;
                        Snap.load(model.templatesByTypes[i].link, function (f) {
                            //console.log(svg);
                            //var g = f.select("g");
                            this.append(f);
                        }, snap);
                    }
                });


                form.btnAddTemplate.onActionPerformed = function () {
//            console.log(draw);
//            console.log(object);
                    Resource.loadText('resources/templates/bow1.svg', function (aLoaded) {
                        console.log(aLoaded);
//                var store = draw.svg(aLoaded);
//
//                form.btnBake.element.innerHTML = '<img src="app/resources/uiElements/make.svg" viewBox="0 0 10 10" />';
                    }, function (e) {
                        console.log("bad");
                    });
                }

                form.button.onActionPerformed = function () {
                    Resource.loadText('resources/templates/bow1.svg', function (aLoaded) {
                        console.log(aLoaded);
//                        svgCanvas.setSvgString(aLoaded);
                        var svgexample = '<svg width="640" height="480" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><title>Layer 1</title><rect stroke-width="5" stroke="#000000" fill="#FF0000" id="svg_1" height="35" width="51" y="35" x="32"/><ellipse ry="15" rx="24" stroke-width="5" stroke="#000000" fill="#0000ff" id="svg_2" cy="60" cx="66"/></g></svg>';

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
