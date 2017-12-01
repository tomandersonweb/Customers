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

        model.showAddCustomer = function () {
            
        };

        model.showEditCustomer = function (editCustomer) {
            model.editCustomer = editCustomer;
        };
    }

}());
(function () {

    var module = angular.module("app");

    module.factory("customersService", ["$http", "$q", function ($http, $q) {

        return {
            getCustomers: getCustomers,
            addCustomer: addCustomer,
            editCustomer: editCustomer,
        };

        function getCustomers() {
            return $http.get(config.baseUri + 'customers')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    return $q.reject("Response status: " + response.status + " (" + response.statusText + ")<br /> " + response.data.message);
                });
        }

        function addCustomer(customer) {
            return $http.post(config.baseUri + 'customers/', customer)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    return $q.reject("Response status: " + response.status + " (" + response.statusText + ")<br /> " + response.data.message);
                });
        }

        function editCustomer(name, customer) {
            return $http.put(config.baseUri + 'customers/' + name, customer)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    return $q.reject("Response status: " + response.status + " (" + response.statusText + ")<br /> " + response.data.message);
                });
        }

    }]);

}());