/**
 * 
 * @author jskonst
 */
define('TextView', ['forms', 'ui', 'forms/box-pane'],
        function (Forms, Ui, BoxPane, ModuleName) {
            function module_constructor(item) {
                var self = this
                        , form = Forms.loadForm(ModuleName);

                self.show = function () {
                    form.show();
                };
                form.title = item.itmname;

                var viewPanel = new BoxPane(Ui.Orientation.VERTICAL);
                viewPanel.element.innerHTML = item.text;
                form.scrollPane.add(viewPanel);

            }
            return module_constructor;
        });
