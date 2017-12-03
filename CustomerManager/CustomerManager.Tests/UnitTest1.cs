using CustomerManager.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace CustomerManager.Tests
{
    [TestClass]
    public class CustomerTests
    {
        [TestMethod]
        public void ShouldBePalindrome()
        {
            var customer = new Customer();
            customer.FirstName = "AAA";
            customer.LastName = "AAA";

            Assert.IsTrue(customer.IsPalindrome);
        }

        [TestMethod]
        public void ShouldBePalindromeBoBob()
        {
            var customer = new Customer();
            customer.FirstName = "Bo";
            customer.LastName = "Bob";

            Assert.IsTrue(customer.IsPalindrome);
        }

        [TestMethod]
        public void ShouldNotBePalindrome()
        {
            var customer = new Customer();
            customer.FirstName = "Terry";
            customer.LastName = "Bob";

            Assert.IsFalse(customer.IsPalindrome);
        }
    }
}
