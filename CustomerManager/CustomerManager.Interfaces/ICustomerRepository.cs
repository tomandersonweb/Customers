using CustomerManager.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CustomerManager.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetAllCustomers(int pageNo = 1, int pageSize = 20, string orderByColumn = "DateActive");

        Task<Customer> GetCustomer(int id);

        void EditCustomer(Customer customer);

        void AddCustomer(Customer customer);

        void DeleteCustomer(int id);
    }
}
