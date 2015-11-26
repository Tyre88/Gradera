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
        public int GradeCategoryLinkId { get; set; }
        public int GradeId { get; set; }
    }
}