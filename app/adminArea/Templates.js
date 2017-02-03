/**
 * 
 * @author jskonst
 * @rolesAllowed admin
 */
define('Templates', ['orm', 'forms', 'ui', 'resource', 'logger', 'security'],
        function (Orm, Forms, Ui, Resource, Logger, Security, ModuleName) {
            function module_constructor() {
                var self = this
                        , model = Orm.loadModel(ModuleName)
                        , form = Forms.loadForm(ModuleName, model);

                Logger.info('Current user: ' + Security.principal.name);

                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute('width', form.pnlPreview.width);
                svg.setAttribute('height', form.pnlPreview.height);
                svg.setAttribute('viewBox', "0 0 " + 185 + " " + 70);
                svg.setAttribute('preserveAspectRatio', "xMinYMin meet");
                form.pnlPreview.element.appendChild(svg);

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

                form.btnAdd.onActionPerformed = function () {
                    var fileFilter = '.svg';
                    Ui.selectFile(function (aFile) {
                        var loading;
                        if (loading == null) {
                            if (aFile != null) {
                                loading = Resource.upload(aFile, aFile.name,
                                        function (aUrl) {
                                            //We have uploaded only one file, but the system
                                            //return's us a array of urls
                                            loading = null;
                                            console.log(aUrl);
                                            model.templates.push({'link': aUrl[0]});
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
                            } else
                                alert("Пожалуйста, укажите файл...");
                        } else
                            alert("Wait please while current upload ends!");
                    }, fileFilter);



                };

                form.btnDelete.onActionPerformed = function () {
                    if (confirm("Удалить?")) {
                        model.templates.remove(form.modelGrid.selected);
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

                form.pnlPreview.onComponentResized = function(evt){
                        svg.setAttribute('width', evt.source.element.offsetWidth);
                        svg.setAttribute('height', evt.source.element.offsetHeight);        
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


            }
            return module_constructor;
        });
