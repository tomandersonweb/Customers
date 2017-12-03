using CustomerManager.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerManager.API.ViewModels
{
    public class CustomerViewModel
    {
        public CustomerViewModel()
        {
            FavouriteColours = new List<Colour>();
        }

        public int Id { get; set; }

        public string Name => FirstName + " " + LastName;

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public bool PreviouslyOrdered { get; set; }

        public bool WebCustomer { get; set; }

        [Required]
        public DateTime DateActive { get; set; }

        public bool IsPalindrome => (FirstName + LastName).ToLower().SequenceEqual((FirstName + LastName).ToLower().Reverse());

        public IList<Colour> FavouriteColours { get; set; }
    }
}
