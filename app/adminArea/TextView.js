/**
 * 
 * @author jskonst
 */
define('TextView', ['orm', 'forms', 'ui', 'forms/box-pane'],
        function (Orm, Forms, Ui, BoxPane, ModuleName) {
            function module_constructor(caption,html) {
                var self = this
                        , model = Orm.loadModel(ModuleName)
                        , form = Forms.loadForm(ModuleName, model);

                self.show = function () {
                    form.show();
                };
                form.title = caption;
                
                var viewPanel = new BoxPane(Ui.Orientation.VERTICAL);
                form.scrollPane.add(viewPanel);
                
                viewPanel.element.innerHTML = html;
                // TODO : place your code here

                model.requery(function () {
                    // TODO : place your code here
                });

            }
            return module_constructor;
        });
