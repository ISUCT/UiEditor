/**
 * 
 * @author jskonst
 */
define('Editor', ['orm', 'forms', 'ui', 'resource', 'invoke', 'forms/box-pane',
    'security', 'forms/border-pane']
        , function (Orm, Forms, Ui, Resource, Invoke,
                BoxPane, Security, BorderPane, ModuleName) {
            function module_constructor() {
                var self = this
                        , model = Orm.loadModel(ModuleName)
                        , form = Forms.loadForm(ModuleName, model);

                Security.principal(function (user) {
                    if (user.hasRole("admin")) {
                        form.btnAdmin.visible = true;
                    }
                });
                form.btnAdmin.onActionPerformed = function () {
                    require('AdminForm', function (AdminForm) {
                        var templ = new AdminForm();
                        templ.show();
                    });
                };

                form.lblAbout.cursor = 'pointer';
                form.lblManual.cursor = 'pointer';


                form.lblAbout.onMousePressed = function () {
                    console.log("About");
                };

                form.lblManual.onMousePressed = function () {
                    console.log("Manual");
                };

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
                        var loadingProgress = document.getElementById('LoadingProgress');
                        loadingProgress.parentNode.removeChild(loadingProgress);
                        form.pnlCanvas.element.innerHTML = '<iframe src="app/editor/svg-editor.html?extensions=ext-xdomain-messaging.js' +
                                //window.location.href.replace(/\?(.*)$/, '&$1') + // Append arguments to this file onto the iframe
                                '" width="' + form.pnlCanvas.element.offsetWidth + 'px" height="'
                                + form.pnlCanvas.element.offsetHeight + 'px" id="svgedit" onload="initEmbed();"></iframe>'
                        frame = document.getElementById('svgedit');
                    });
                };

                var onTemplateClick = function (event) {
                    svgCanvas.setSvgString(event.source.snap.toString());
                };
                var onFormClick = function (event) {
                    svgCanvas.importSvgString(event.source.snap.toString());
                };

                model.requery(function () {
                    var templatesPanel = new BoxPane(Ui.Orientation.VERTICAL);
                    form.scrollTemplate.add(templatesPanel);
                    for (var i in model.getTemplates) {
                        var demoContainer = new BorderPane();
                        demoContainer.height = 60;
                        demoContainer.onMousePressed = onTemplateClick;
                        templatesPanel.add(demoContainer);
                        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svg.setAttribute('width', demoContainer.element.offsetWidth);
                        svg.setAttribute('height', demoContainer.height);
                        svg.setAttribute('viewBox', "0 0 " + 185 + " " + 70);
                        svg.setAttribute('preserveAspectRatio', "xMinYMin meet");
                        demoContainer.element.appendChild(svg);
                        var snap = Snap(svg);
                        demoContainer.snap = snap;
                        Snap.load(model.getTemplates[i].link, function (f) {
                            this.append(f);
                        }, snap);
                    }

                    var formsPanel = new BoxPane(Ui.Orientation.VERTICAL)
                    form.scrollForms.add(formsPanel);
                    for (var i in model.getForms) {
                        var demoForm = new BorderPane();
                        demoForm.height = 60;
                        demoForm.onMousePressed = onFormClick;
                        formsPanel.add(demoForm);
                        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svg.setAttribute('width', demoForm.element.offsetWidth);
                        svg.setAttribute('height', demoForm.height);
                        svg.setAttribute('viewBox', "0 0 " + 185 + " " + 185);
                        svg.setAttribute('preserveAspectRatio', "xMinYMin meet");
                        demoForm.element.appendChild(svg);
                        var snap = Snap(svg);
                        demoForm.snap = snap;
                        Snap.load(model.getForms[i].link, function (f) {
                            this.append(f);
                        }, snap);
                    }
                });

                function handleSvgData(data, error) {
                    if (error) {
                        alert('error ' + error);
                    } else {
                        alert('Congratulations. Your SVG string is back in the host page, do with it what you will\n\n' + data);
                    }
                }

                function saveSvg() {
                    svgCanvas.getSvgString()(handleSvgData);
                }




//                form.btnAddTemplate.onActionPerformed = function () {
////            console.log(draw);
////            console.log(object);
//                    Resource.loadText('resources/templates/bow1.svg', function (aLoaded) {
//                        console.log(aLoaded);
////                var store = draw.svg(aLoaded);
////
////                form.btnBake.element.innerHTML = '<img src="app/resources/uiElements/make.svg" viewBox="0 0 10 10" />';
//                    }, function (e) {
//                        console.log("bad");
//                    });
//                }

//                form.button.onActionPerformed = function () {
//                    Resource.loadText('resources/templates/bow1.svg', function (aLoaded) {
//                        console.log(aLoaded);
////                        svgCanvas.setSvgString(aLoaded);
//                        var svgexample = '<svg width="640" height="480" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><title>Layer 1</title><rect stroke-width="5" stroke="#000000" fill="#FF0000" id="svg_1" height="35" width="51" y="35" x="32"/><ellipse ry="15" rx="24" stroke-width="5" stroke="#000000" fill="#0000ff" id="svg_2" cy="60" cx="66"/></g></svg>';
//
////                var store = draw.svg(aLoaded);
////
////                form.btnBake.element.innerHTML = '<img src="app/resources/uiElements/make.svg" viewBox="0 0 10 10" />';
//                    }, function (e) {
//                        console.log("bad");
//                    });
//                }

            }

            return module_constructor;
        });
