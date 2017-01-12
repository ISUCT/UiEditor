/**
 * 
 * @author h
 */
define('UserInformation', ['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
    function module_constructor(userInfo) {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);

        self.show = function () {
            form.show();
        };

        var user = {
            email: ''
            , surname: ''
            , name: ''
            , middlename: ''
            , username: ''
            , birthdate: ''
            , address: ''
        };

        function init() {
            form.mdlEmail.value = user.email;
            form.mdlSurname.data = user;
            form.mdlName.data = user;
            form.mdlMiddleName.data = user;
            form.modelDate.data = user;
            form.mdlAddress.data = user;

            form.mdlSurname.field = 'surname';
            form.mdlName.field = 'name';
            form.mdlMiddleName.field = 'middlename';
            form.modelDate.field = 'birthdate';
            form.mdlAddress.field = 'address';
        }

        if (userInfo) {
            user = userInfo;
        }
        init();

        function onParseEmail(event) {
            console.log(form);
            console.log(user);
            var value = event.source.text;
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(value)) {
                event.source.background = null;
                event.source.toolTipText = '';
                return value;
            } else {
                event.source.background = Ui.Color.PINK;
                event.source.toolTipText = "Введите корректный E-mail адрес";
                return null;
            }
        }

        function onFormatEmail(event) {
            return event.source.value !== null ? event.source.value : event.source.text;
        }

        form.mdlEmail.format = '';
        form.mdlEmail.onParse = onParseEmail;
        form.mdlEmail.onFormat = onFormatEmail;

        form.mdlEmail.onValueChange = function () {
            user.email = form.mdlEmail.value;
        };


        function validateProfile() {
            var message = "";
            if (!user.email) {
                message += "Введите корректный E-mail адрес\n";
            }
            if (!user.surname) {
                message += "Фамилия является обязательным полем.\n";
            }
            if (!user.name) {
                message += "Имя является обязательным полем.\n";
            }
            if (!user.birthdate) {
                message += "Введите корректную дату рождения.\n";
            }
            return message;
        }

        self.getUserInfo = function () {
            var msg = validateProfile();
            if (msg){
                return null;
            }else{
                return user;
            }
        };

        self.showOnPanel = function (aPanel) {
            aPanel.add(form.view);
        };

    }
    return module_constructor;
});
