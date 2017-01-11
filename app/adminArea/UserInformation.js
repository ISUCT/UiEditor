/**
 * 
 * @author h
 */
define('UserInformation', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
    function module_constructor() {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);

        self.show = function () {
            form.show();
        };

        var user;

        self.showOnPanel = function (aPanel) {
            aPanel.add(form.view);
        };

        model.requery(function () {
            // TODO : place your code here
        });


        self.init = function () {
            form.edFirstName.data = owner;
            form.edLastName.data = owner;
            form.edAddress.data = owner;
            form.edCity.data = owner;
            form.edPhone.data = owner;
            form.edEmale.data = owner;

            form.showModal();
        };

        function validateProfile() {
            var message = "";
            if (!user.email) {
                message += "\n";
            }
            if (!user.surname) {
                message += "Фамилия является обязательным полем.\n";
            }
            if (!user.name) {
                message += "Имя является обязательным полем.\n";
            }
            return message;
        }



    }
    return module_constructor;
});
