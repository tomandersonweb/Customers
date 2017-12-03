using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomerManager.Models
{
    public class Customer
    {
        public Customer ()
        {
            FavouriteColours = new List<Colour>();
        }
        public int Id { get; set; } 

        public string Name => FirstName + " " + LastName;

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool PreviouslyOrdered { get; set; }

        public bool WebCustomer { get; set; }

        public DateTime DateActive { get; set; }

        public bool IsPalindrome => (FirstName + LastName).ToLower().SequenceEqual((FirstName + LastName).ToLower().Reverse());

        public IList<Colour> FavouriteColours { get; set; }
    }
}
