/**
 * 
 * @author jskonst
 */
define('TextEditor', ['forms', 'ui','forms/html-area'], function (Forms, Ui,HtmlArea, ModuleName) {
    function module_constructor(item,save) {
        var self = this
                , form = Forms.loadForm(ModuleName);

        self.show = function () {
            form.show();
        };
        var htmlArea;
        form.title = item.itmname;
        if (item.text){             
           htmlArea = new HtmlArea(item.text);
        }else{
            htmlArea = new HtmlArea();
            htmlArea.value = "";
        }
        form.panel.add(htmlArea);
        // TODO : place your code here
        form.btnSave.onActionPerformed = function () {
            item.text = htmlArea.value;
            save();
            form.close();
        };

    }
    return module_constructor;
});