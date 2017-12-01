using CustomerManager.Interfaces;
using System;
using CustomerManager.Models;
using System.Collections.Generic;
using Dapper;
using System.Threading.Tasks;
using System.IO;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;

namespace CustomerManager.Persistence
{
    public class CustomerRepository : ICustomerRepository
    {
        public void AddCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }

        public void DeleteCustomer(Guid id)
        {
            throw new NotImplementedException();
        }

        public void EditCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetAllCustomers()
        {
            IEnumerable<Customer> result;

            using (var cnn = new SqlConnection($"Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename={Environment.CurrentDirectory}\\CustomerManager.mdf;Integrated Security=True;Connect Timeout=30"))
            {
                cnn.Open();

                result = cnn.Query<Customer, List<int>, Customer>(@"select c.*, cc.colourid  from customers c inner join customercolours cc on c.Id = cc.customerid "
                    , (cust, cols) => { cust.FavouriteColours = cols; return cust; });

            }

            return result;
        }

        public Customer GetCustomer(int id)
        {
            Customer result;

            using (var cnn = new SqlConnection($"Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename={Environment.CurrentDirectory}\\CustomerManager.mdf;Integrated Security=True;Connect Timeout=30"))
            {
                cnn.Open();
                result = Task.Run(async () => await cnn.QuerySingleOrDefaultAsync<Customer>(@"SELECT * FROM Customers where Id = @Id", new { Id = id })).Result;
            }

            return result;
        }
    }
}
