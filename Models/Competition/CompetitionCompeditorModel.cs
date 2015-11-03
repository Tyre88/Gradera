using Gradera.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Competition
{
    public class CompetitionCompeditorModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int BirthYear { get; set; }
        public int Grade { get; set; }
        public CompetitionCategoryModel Category { get; set; }
        public bool IsExternal { get; set; }
        public Gender Gender { get; set; }
        public string ClubName { get; set; }
        public string Weight { get; set; }

    }
}