/**
 * 
 * @author jskonst
 */
define('Editor', ['orm', 'forms', 'ui', 'resource', 'invoke', 'forms/box-pane',
    'security', 'forms/border-pane', 'TextView', 'logger']
        , function (Orm, Forms, Ui, Resource, Invoke,
                BoxPane, Security, BorderPane, TextView, Logger, ModuleName) {
            function module_constructor() {
                var self = this
                        , model = Orm.loadModel(ModuleName)
                        , form = Forms.loadForm(ModuleName, model);
                form.btnAdmin.visible = false;

                var templatesPerDay = 5;
                var restTemplates;
                var svgCanvas;
                var userProfile;


                var dateFrom = new Date();
                dateFrom.setHours(0, 0, 0, 0);
                var dateTo = new Date();
                dateTo.setHours(23, 59, 59, 59);
                model.works.params.timeFrom = dateFrom;
                model.works.params.timeTo = dateTo;
                model.works.params.published = true;


                function updateProfile(name, callback) {
                    model.userProfile.params.name = name;
                    model.userProfile.requery(function () {
                        if (model.userProfile.length > 0) {
                            var usrProfile = model.userProfile[0];
                            callback(usrProfile);
                            restTemplates = templatesPerDay - model.works.length;
                            form.lblWorks.text = restTemplates;
                        }
                        callback();
                    });
                }

                Security.principal(function (user) {
                    form.lblName.text = user.name;
                    updateProfile(user.name, function (profile) {
                        if (profile) {
                            userProfile = profile;
                        }
                    });
                    if (user.name == "admin") {
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
                form.lblName.cursor = 'pointer';
                form.lblWorks.cursor = 'pointer';
                form.btnCreate.cursor = 'pointer';

                function loadText(event) {
                    model.texts.params.fldName = event.source.text;
                    model.texts.requery(function () {
                        var txtView = new TextView(model.texts[0]);
                        txtView.show();
                    });
                }

                form.lblAbout.onMousePressed = loadText;
                form.lblManual.onMousePressed = loadText;
                form.lblSamples.onMousePressed = loadText;
                form.lblStore.onMousePressed = loadText;
                form.lblParthners.onMousePressed = loadText;
                form.lblFond.onMousePressed = loadText;

                form.lblName.onMousePressed = function () {
                    require('UserInformation', function (UserInformation) {
                        var user = null;
                        if (model.userProfile.length > 0) {
                            user = model.userProfile[0];
                        }
                        var userInfo = new UserInformation(user);
                        userInfo.show();
                    });
                };

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
                    svgCanvas.zoomChanged(window, 'canvas');
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


                function upload(data) {
                    var loading;
                    if (loading) {
                        alert("Wait please while current upload ends!");
                    } else {
                        //TODO сделать проверку того, что пользователь существует
                        var file = new File([data], (userProfile.username + "_work.svg"));
                        loading = Resource.upload(file, file.name,
                                function (aUrl) {
                                    //We have uploaded only one file, but the system
                                    //return's us a array of urls
                                    loading = null;
                                    console.log(aUrl);
                                    model.works.push({
                                        'profile_id': userProfile.userprofile_id
                                        , 'uploaddate': new Date()
                                        , 'published': true
                                        , 'link': aUrl[0]});
                                    model.save(function () {
                                        alert("Ваша работа успешно сохранена");
                                        restTemplates = templatesPerDay - model.works.length;
                                        form.lblWorks.text = restTemplates;
                                    }, function () {
                                        alert("Не удалось сохранить вашу работу");
                                    })
//                                    UI.Icon.load(aUrl[0], function (uploadedFile) {
//                                        
//                                        demoComponent.cursor = 'url(' + uploadedFile.b + '), auto';
//                                        var fileCursor = {'name': demoComponent.cursor};
//                                        form.mdlCursor.value = fileCursor;
//                                        
//                                    }, function (e) {
//                                        P.Logger.info(e);
//                                    });
                                },
                                function (aEvent) {
                                    Logger.severe(aEvent);
                                },
                                function (aError) {
                                    loading = null;
                                    alert("Загрузка прервана с ошибкой: " + aError);
                                }
                        );
                    }
                }

                function handleSvgData(data, error) {
                    if (error) {
                        alert('error ' + error);
                    } else {
                        upload(data);
                    }
                }

                form.btnCreate.onMouseClicked = function () {
                    if (restTemplates <= 0) {
                        alert('Сегодня Вы больше не можете публиковать работы');
                    } else {
                        svgCanvas.getSvgString()(handleSvgData);
                    }
                };

            }

            return module_constructor;
        });
