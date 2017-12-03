(function () {

    var module = angular.module("app");

    module.component("customersComponent", {
        templateUrl: "/app/components/customers.component.html",
        controllerAs: "model",
        controller: ["customersService", "toastr", controller]
    });

    function controller(customersService, toastr) {

        var model = this;
        model.customers = [];

        model.$onInit = function () {
            model.setup();
        };

        model.setup = function () {
            model.listCustomers();
        };

        model.listCustomers = function () {
            customersService.getCustomers()
                .then(function (response) {
                    model.customers = response;
                })
                .catch(function (error) {
                    toastr.danger(error);
                });
        };

        model.addCustomer = function (newCustomer) {
            customersService.addCustomer(newCustomer)
                .then(function (response) {
                    model.setup();
                })
                .catch(function (error) {
                    toastr.danger(error);
                });
        };

        model.saveCustomer = function () {
            customersService.editCustomer(model.editCustomer)
                .then(function (response) {
                    model.setup();
                })
                .catch(function (error) {
                    toastr.danger(error);
                });
        };

        model.showAddCustomer = function () {
            
        };

        model.showEditCustomer = function (editCustomer) {
            model.editCustomer = editCustomer;
        };
    }

}());