using Gradera_Klubb.Models.Techniques;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Grading
{
    public class GradeCategoryLinkTechniqueModel
    {
        public int Id { get; set; }
        public int TechniqueId { get; set; }
        public List<TechniqueImageModel> TechniqueImages { get; set; }
        public string Name { get; set; }
        public int GradeCategoryLinkId { get; set; }
        public int GradeId { get; set; }

        public GradeCategoryLinkTechniqueModel()
        {
            TechniqueImages = new List<TechniqueImageModel>();
        }
    }
}