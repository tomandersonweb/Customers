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