using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Grading
{
    public class GradeCategoryLinkModel
    {
        public int Id { get; set; }
        public int GradeCategoryId { get; set; }
        public int GradeId { get; set; }
        public string Text { get; set; }
    }
}