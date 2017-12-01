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