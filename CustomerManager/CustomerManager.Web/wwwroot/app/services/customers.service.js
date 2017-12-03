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