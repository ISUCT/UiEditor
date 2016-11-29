/**
 * Allows to edit the owner, add and edit his/her pets and pets visit to the hotel. 
 * @author vv
 * @name OwnerView
 */
define('OwnerView', ['forms', 'logger'], function (Forms, Logger, ModuleName) {
    function module_constructor(aModel, onClose) {
        var self = this
                , model = aModel
                , form = Forms.loadForm(ModuleName, model);

        form.onWindowClosed = onClose;
        var owner = model.owners.cursor;

        var edited = false;
        self.isEdited = function () {
            return edited;
        };
        
        form.onWindowOpened = function(){
            edited = false;
        };

        self.showModal = function () {
            form.edFirstName.data = owner;
            form.edLastName.data = owner;
            form.edAddress.data = owner;
            form.edCity.data = owner;
            form.edPhone.data = owner;
            form.edEmale.data = owner;

            form.showModal();
        };

        /**
         * Validates owner's properties.
         * @return Validation error message or empty String if form is valid
         */
        function validateOwner() {
            var message = "";
            if (!owner.firstname) {
                message += "First name is required.\n";
            }
            if (!owner.lastname) {
                message += "Last name is required.\n";
            }
            if (!owner.address) {
                message += "Address is required.\n";
            }
            if (!owner.city) {
                message += "City is required.\n";
            }
            if (!owner.telephone) {
                message += "Phone number is required.\n";
            }
            if (!owner.email) {
                message += "E-Mail is required.\n";
            }
            return message;
        }

        /**
         * Validates pets entity.
         * @return Validation error message or empty String if form is valid
         */
        function validatePets() {
            var message = "";
            model.petsQuery.forEach(function (pet) {
                if (!pet.name) {
                    message += "Pet's name is required.\n";
                }
                if (!pet.birthdate) {
                    message += "Pet's birthdate is required.\n";
                }
                if (!pet.type_id) {
                    message += "Pet's type is required.\n";
                }
            });
            return message;
        }

        /**
         * Validates visits entity.
         * @return Validation error message or empty String if form is valid
         */
        function validateVisits() {
            var message = "";
            model.visitsQuery.forEach(function (visit) {
                if (!visit.fromdate) {
                    message += "Visit 'from' date is required.\n";
                }
                if (!visit.todate) {
                    message += "Visit 'to' date is required.\n";
                }
                if (visit.fromdate >= visit.todate) {
                    message += "Visit 'from' date must be before 'to' date.\n";
                }
            });
            return message;
        }

        function validate() {
            var message = validateOwner();
            message += validatePets();
            message += validateVisits();
            return message;
        }

        form.btnAddPet.onActionPerformed = function (event) {
            var pet = {};
            model.petsQuery.push(pet);
            owner.pets.push(pet);
        };

        form.btnDeletePet.onActionPerformed = function (event) {
            if (confirm("Delete selected pets ?")) {
                model.petsQuery.remove(form.grdPets.selected);
            }
        };

        form.btnAddVisit.onActionPerformed = function (event) {
            var visit = {fromdate: new Date()};
            model.visitsQuery.push(visit);
            model.petsQuery.cursor.visits.push(visit);
        };

        form.btnDeleteVisit.onActionPerformed = function (event) {
            if (confirm("Delete selected visits ?")) {
                model.visitsQuery.remove(form.grdVisits.selected);
            }
        };

        form.btnCancel.onActionPerformed = function (event) {
            form.close();
        };

        form.btnSave.onActionPerformed = function (event) {
            if (model.modified) {
                var message = validate();
                if (!message) {
                    owner.fullName = owner.firstname + " " + owner.lastname;
                    model.save(function () {
                        edited = true;
                        form.close();
                    }, function () {
                        Logger.info("Failed to save owner's details.");
                    });
                } else {
                    alert(message);
                }
            } else {
                form.close();
            }
        };

    }
    return module_constructor;
});