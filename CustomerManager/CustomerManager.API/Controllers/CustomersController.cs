using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CustomerManager.Interfaces;
using CustomerManager.API.ViewModels;
using Omu.ValueInjecter;
using CustomerManager.Models;

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
        public async Task<IActionResult> Get()
        {
            var customers = await _customerRepository.GetAllCustomers();
            var customerList = new List<CustomerViewModel>();
            foreach(var customer in customers)
            {
                var vm = Mapper.Map<CustomerViewModel>(customer);
                customerList.Add(vm);
            }
            return Ok(customerList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var customer = await _customerRepository.GetCustomer(id);
            if (customer == null)
                return BadRequest();

            var viewModel = Mapper.Map<CustomerViewModel>(customer);
            
            return Ok(viewModel);
        }

        [HttpPost]
        public IActionResult Post([FromBody]CustomerViewModel customerViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var customer = Mapper.Map<Customer>(customerViewModel);

            _customerRepository.AddCustomer(customer);

            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]CustomerViewModel customerViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var customer = Mapper.Map<Customer>(customerViewModel);
            _customerRepository.EditCustomer(customer);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _customerRepository.DeleteCustomer(id);

            return Ok();
        }
    }
}
