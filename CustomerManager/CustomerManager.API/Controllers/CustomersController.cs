using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CustomerManager.Interfaces;
using CustomerManager.API.ViewModels;
using Omu.ValueInjecter;

namespace CustomerManager.API.Controllers
{
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomersController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet]
        public IList<CustomerViewModel> Get()
        {
            var customers = _customerRepository.GetAllCustomers();
            var viewModel = new List<CustomerViewModel>();
            foreach(var customer in customers)
            {
                var temp = Mapper.Map<CustomerViewModel>(customer);
                viewModel.Add(temp);
            }
            return viewModel;
        }

        [HttpGet("{id}")]
        public CustomerViewModel Get(int id)
        {
            return new CustomerViewModel()
            {
                Id = 1,
                FirstName = "Tom",
                LastName = "Anderson"

            }; ;
        }

        [HttpPost]
        public void Post([FromBody]CustomerViewModel value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]CustomerViewModel value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
