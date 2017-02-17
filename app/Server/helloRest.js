/**
 * 
 * @author jskonst
 * @public 
 * @module helloRest
 * @stateless
 */
define(['orm', 'http-context'], function (Orm, HttpContext, ModuleName) {
    return function () {
        var self = this, model = Orm.loadModel(ModuleName);

        /**
         * @get /customers
         * @returns {RESTTest.customers}
         */
        this.getCustomers = function (aUser, aOnSuccess) {
            model.qUserByEMail.params.email = aUser;
            model.requery(function () {
                var user = {"userExist": false};
                if (model.qUserByEMail.length > 0) {
                    user.userExist = true;
                }
                aOnSuccess(user);
            });
        };

        /**
         * @post /createUsers
         * @returns {RESTTest.customers}
         */
        this.createUser = function (param, aOnSuccess) {
            var user = {
                email: ''
                , surname: ''
                , middlename: ''
                , name: ''
                , username: ''
                , birthdate: ''
                , address: ''
                , password: ''
                , gender: ''
            };

            var http = new HttpContext();
            user = JSON.parse(http.request.body);

            model.qUserByName.params.name = user.name;
            model.requery(function () {
                user.userExist = false;
                if (model.qUserByName.length > 0) {
                    user.userExist = true;
                    aOnSuccess(user);
                } else {
                    model.qUserByName.push({usr_name: user.username
                        , usr_passwd: user.password});
                    model.save(function () {
                        model.profiles.push({
                            email: user.email
                            , surname: user.surname
                            , middlename: user.middlename
                            , name: user.name
                            , username: user.username
                            , birthdate: new Date(user.birthdate)
                            , address: user.address
                            , gender: user.gender
                        });
                        model.groups.push({usr_name: user.username
                            , group_name: "users"});
                        model.save(function () {
                            user.created = true;
                            aOnSuccess(user);
                        }, function () {
                            user.created = false;
                            aOnSuccess(user);
                        })
                    }, function () {
                        user.created = false;
                        aOnSuccess(user);
                    });
                }
            });

        };

///**
//         * @post /customers
//         * @returns {RESTTest.customers}
//         */
//        this.createCustomer = function (param, aOnSuccess) {
//            var http = new P.HttpContext();
//            var user = JSON.parse(http.request.body);
//            
//            model.qUserByEMail.params.email = user.email;
//            model.requery(function () {
//                user.userExist =false;
//                if (model.qUserByEMail.length>0){
//                    user.userExist = true;
//                    aOnSuccess(user);
//                }else{
//                    model.qUsers.push(user);
//                    model.save(function(){
//                        user.created = true;
//                        aOnSuccess(user);
//                    }, function(){
//                        user.created = false;
//                        aOnSuccess(user);
//                    });
//                }
//            });
//            
//        };




    };
});