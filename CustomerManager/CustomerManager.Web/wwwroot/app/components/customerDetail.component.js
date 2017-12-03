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