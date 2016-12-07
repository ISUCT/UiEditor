/**
 * 
 * @author jskonst
 */
define('EditorExternalUi', ['orm', 'forms', 'ui', 'resource', 'forms/scroll-pane',
    'forms/box-pane', 'forms/button'],
        function (Orm, Forms, Ui, Resource, ScrollPane, BoxPane, Button, ModuleName) {
            function module_constructor() {
                var self = this, model = Orm.loadModel(ModuleName);
                var scrollContainer = new ScrollPane();
                var demoContainer = new BoxPane(Ui.Orientation.VERTICAL);
                demoContainer.showOn(document.getElementById('template'));
//                demoContainer.background = '#85ca81';
                //scrollContainer.showOn(document.getElementById('template'))
//                scrollContainer.add(demoContainer);
//                var comp = new Button('Sample');
//                comp.height = 30;
//                comp.width = 120;
//                demoContainer.add(cegafudziyama159
//                omp);

                // TODO : place constructor code here

                self.execute = function () {
                    // TODO : place application code here
                };
            }
            return module_constructor;
        });
