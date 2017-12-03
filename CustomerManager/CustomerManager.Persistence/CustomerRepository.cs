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
        private string ConnString = $"Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename={Environment.CurrentDirectory}\\CustomerManager.mdf;Integrated Security=True;Connect Timeout=30";

        public void AddCustomer(Customer customer)
        {
            string sql = "INSERT INTO Customers " +
                "([FirstName],[LastName],[PreviouslyOrdered],[WebCustomer],[DateActive],[IsPalindrome]) " +
                "Values (@FirstName,@LastName,@PreviouslyOrdered,@WebCustomer,@DateActive,@IsPalindrome);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            using (var cnn = new SqlConnection(ConnString))
            {
                cnn.Open();

                var id = cnn.Query<int>(sql, customer).Single();

                foreach (var colour in customer.FavouriteColours)
                {
                    sql = @"Insert into CustomerColours (CustomerId, ColourId) values (@CustomerId, @ColourId); ";

                    cnn.Execute(sql, new { CustomerId = id, ColourId = colour.Id });
                }

            }
        }

        public void DeleteCustomer(int id)
        {
            using (var cnn = new SqlConnection(ConnString))
            {
                var sql = @"DELETE from Customers where Id = @CustomerId";

                cnn.Open();

                cnn.Execute(sql, new { CustomerId = id });

                sql = @"DELETE from CustomerColours where CustomerId = @CustomerId";

                cnn.Execute(sql, new { CustomerId = id });
            }
        }

        public void EditCustomer(Customer customer)
        {
            using (var cnn = new SqlConnection(ConnString))
            {
                // update the customer first 
                string sql = "UPDATE Customers " +
                    "SET FirstName = @FirstName, " +
                    "LastName = @LastName, " +
                    "PreviouslyOrdered = @PreviouslyOrdered,  " +
                    "WebCustomer = @WebCustomer, " +
                    "DateActive = @DateActive," +
                    "IsPalindrome = @IsPalindrome " +
                    "WHERE Id = @Id ;";
                cnn.Open();

                cnn.Execute(sql, customer);

                sql = @"DELETE from CustomerColours where CustomerId = @CustomerId";

                cnn.Execute(sql, new { CustomerId = customer.Id });

                foreach (var colour in customer.FavouriteColours)
                {
                    sql = @"Insert into CustomerColours (CustomerId, ColourId) values (@CustomerId, @ColourId); ";

                    cnn.Execute(sql, new { CustomerId = customer.Id, ColourId = colour.Id });
                }

            }
        }

        public async Task<IEnumerable<Customer>> GetAllCustomers(int pageNo = 1, int pageSize = 20, string orderByColumn = "DateActive")
        {
            IEnumerable<Customer> result;
            IEnumerable<Colour> colours;

            using (var cnn = new SqlConnection(ConnString))
            {
                cnn.Open();

                colours = await cnn.QueryAsync<Colour>(@"select * from colours");

                result = await cnn.QueryAsync<Customer, string, Customer>(@"
                    SELECT top (20) c.*,
                    (STUFF((SELECT ',' + CONVERT(varchar(10), cc.colourid )
                                FROM customercolours cc WHERE cc.customerid = c.id
                                FOR XML PATH('')) ,1,1,'') )AS colours
                    FROM customers c
                    ORDER by DateActive desc ; ", 
                    (cust, cols) => {
                        cust.FavouriteColours = string.IsNullOrEmpty(cols) ? new List<Colour>() : colours?.Where(c => cols.Split(',').Select(x => int.Parse(x.ToString())).ToList().Contains(c.Id)).ToList()  ;
                        return cust;
                    }, splitOn:"colours");

            }

            return result;
        }

        public async Task<Customer> GetCustomer(int id)
        {
            Customer result;
            IEnumerable<Colour> colours;

            using (var cnn = new SqlConnection(ConnString))
            {
                cnn.Open();

                colours = await cnn.QueryAsync<Colour>(@"select c.* from colours c inner join CustomerColours cc on c.Id = cc.ColourId where cc.CustomerId = @CustomerId", new { CustomerId = id });

                result = await cnn.QuerySingleOrDefaultAsync<Customer>(@"
                    SELECT c.*
                    FROM customers c 
                    WHERE c.Id = @CustomerId ;"
                    ,
                    new { CustomerId = id });
                result.FavouriteColours = colours.ToList();
            }

            return result;
        }
    }
}
