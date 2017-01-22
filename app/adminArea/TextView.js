/**
 * 
 * @author jskonst
 */
define('TextView', ['forms', 'ui', 'forms/border-pane'],
        function (Forms, Ui, BorderPane, ModuleName) {
            function module_constructor(item) {
                var self = this
                        , form = Forms.loadForm(ModuleName);

                self.show = function () {
                    form.show();
                };
                form.title = item.itmname;

                var viewPanel = new BorderPane();
                viewPanel.element.innerHTML = item.text;
                form.scrollPane.add(viewPanel);

            }
            return module_constructor;
        });
