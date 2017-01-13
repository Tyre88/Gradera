using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Techniques
{
    public class TechniqueImageModel
    {
        public int Id { get; set; }
        public int TechniqueId { get; set; }
        public string Image { get; set; }
        public int ImageOrder { get; set; }
    }
}