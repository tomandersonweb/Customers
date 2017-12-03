(function () {

    var module = angular.module("app");

    module.component("customerDetailComponent", {
        templateUrl: "/app/components/customerDetail.component.html",
        controllerAs: "model",
        bindings: {
            cId: '<'
        },
        controller: ["customersService", "toastr", "$state", "$filter", controller]
    });

    function controller(customersService, toastr, $state, $filter) {

        var model = this;
        model.customer = {};
        model.action = "Edit";

        model.colours = [{ id: 1, name: "Red" }, { id: 2, name: "Green" }, { id: 3, name: "Blue" }]

        model.$onInit = function () {
            customersService.getCustomer(model.cId)
                .then(function (response) {
                    model.customer = response;
                    model.customer.dateActive = new Date(model.customer.dateActive);
                    model.red = $filter("filter")(model.customer.favouriteColours, { name: "Red" }).length === 1;
                    model.blue = $filter("filter")(model.customer.favouriteColours, { name: "Blue" }).length === 1;
                    model.green = $filter("filter")(model.customer.favouriteColours, { name: "Green" }).length === 1;
                })
                .catch(function (error) {
                    toastr.error(error);
                });
        };

        model.save = function () {
            model.customer.favouriteColours = [];
            if (model.red === true)
                model.customer.favouriteColours.push({ id: 1, name: "Red" });
            if (model.green === true)
                model.customer.favouriteColours.push({ id: 2, name: "Green" });
            if (model.blue === true)
                model.customer.favouriteColours.push({ id: 3, name: "Blue" });

            customersService.editCustomer(model.customer.id, model.customer)
                .then(function (response) {
                    toastr.success("Customer updated");
                    $state.go('customers');
                })
                .catch(function (error) {
                    toastr.error(error);
                });
            
        };

    }

}());
(function () {

    var module = angular.module("app");

    module.component("customerInsertComponent", {
        templateUrl: "/app/components/customerDetail.component.html",
        controllerAs: "model",
        controller: ["customersService", "toastr", "$state", controller]
    });

    function controller(customersService, toastr, $state) {

        var model = this;
        model.customer = {};
        model.action = "Insert";
        model.red = false;
        model.green = false;
        model.blue = false;

        model.$onInit = function () {
            
        };

        model.save = function () {
            model.customer.favouriteColours = [];
            if (model.red === true)
                model.customer.favouriteColours.push({ id: 1, name: "Red" });
            if (model.green === true)
                model.customer.favouriteColours.push({ id: 2, name: "Green" });
            if (model.blue === true)
                model.customer.favouriteColours.push({ id: 3, name: "Blue" });

            customersService.addCustomer(model.customer)
                .then(function (response) {
                    toastr.success("Customer added");
                    $state.go('customers');
                })
                .catch(function (error) {
                    toastr.error(error);
                });
            
        };

    }

}());
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
(function () {

    var module = angular.module("app");

    module.factory("customersService", ["$http", "$q", function ($http, $q) {

        return {
            getCustomers: getCustomers,
            getCustomer: getCustomer,
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

        function getCustomer(customerId) {
            return $http.get(config.baseUri + 'customers/' + customerId)
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

        function editCustomer(id, customer) {
            return $http.put(config.baseUri + 'customers/' + id, customer)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    return $q.reject("Response status: " + response.status + " (" + response.statusText + ")<br /> " + response.data.message);
                });
        }

    }]);

}());