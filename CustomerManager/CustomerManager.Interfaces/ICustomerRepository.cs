using CustomerManager.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CustomerManager.Interfaces
{
    public interface ICustomerRepository
    {
        IEnumerable<Customer> GetAllCustomers();

        Customer GetCustomer(int id);

        void EditCustomer(Customer customer);

        void AddCustomer(Customer customer);

        void DeleteCustomer(Guid id);
    }
}
