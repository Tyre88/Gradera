using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models
{
    public class UserInformationModel
    {
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Street { get; set; }
        public string Zip { get; set; }
        public string City { get; set; }
        public string Occupation { get; set; }
    }
}