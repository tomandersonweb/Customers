(function () {

    var module = angular.module("app");

    module.component("customersComponent", {
        templateUrl: "/app/components/customers.component.html",
        controllerAs: "model",
        controller: ["customersService", controller]
    });

    function controller(customersService) {

        var model = this;
        model.customers = [];
        model.newCustomer = {};
        model.editCustomer = {};

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
                    //ngToast.danger(error);
                });
        };

        model.addCustomer = function (newCustomer) {
            customersService.addCustomer(newCustomer)
                .then(function (response) {
                    model.setup();
                })
                .catch(function (error) {
                    //ngToast.danger(error);
                });
        };

        model.saveCustomer = function () {
            customersService.editCustomer(model.editCustomer)
                .then(function (response) {
                    model.setup();
                })
                .catch(function (error) {
                    //ngToast.danger(error);
                });
        };

        model.showAddCustomer = function () {
            
        };

        model.showEditCustomer = function (editCustomer) {
            model.editCustomer = editCustomer;
        };
    }

}());