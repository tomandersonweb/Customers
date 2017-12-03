(function () {
    var angular = require('angular');
    var ngToast = require('angular-toastr');
    var uiRouter = require('@uirouter/angularjs');

    var module = angular.module("app", ['toastr', 'ui.router']);

    module.config(function ($locationProvider, $stateProvider, $urlServiceProvider) {

        $locationProvider.html5Mode(false);

        $urlServiceProvider.rules.otherwise({ state: 'customers' });

        $stateProvider.state('customers', {
            url: '/customers',
            component: 'customersComponent'
        });

        $stateProvider.state('customer', {
            url: '/customers/{customerId}',
            component: 'customerDetailComponent',
            resolve: {
                cId: function ($transition$) {
                    return $transition$.params().customerId;
                }
            }
        });

        $stateProvider.state('customerInsert', {
            url: '/customers/insert',
            component: 'customerInsertComponent',
        });

    });

})(window.angular);